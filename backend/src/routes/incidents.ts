import { Router, Request, Response } from "express";
import { checkJwt } from "../middleware/auth";
import { IncidentService } from "../services/IncidentService";
import { ValidationError } from "../errors/ValidationError";
import {
  IncidentType,
  IncidentStatus,
  IncidentImpact,
} from "../models/Incident";
import { BadRequestError } from "../errors/BadRequestError";
import { ServiceRepository } from "../repositories/ServiceRepository";

const router = Router();
const incidentService = new IncidentService();
const serviceRepository = new ServiceRepository();

// Apply JWT middleware to all routes
router.use(checkJwt);

// Create a new incident
router.post("/", async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.payload.sub;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Validate required fields
    const {
      title,
      type,
      status,
      impact,
      services,
      message,
      startedAt,
      scheduledStartTime,
      scheduledEndTime,
    } = req.body;

    // Basic field validation
    if (!title?.trim()) {
      throw new BadRequestError("Title is required");
    }

    if (!message?.trim()) {
      throw new BadRequestError("Message is required");
    }

    if (!Array.isArray(services) || services.length === 0) {
      throw new BadRequestError("At least one service must be selected");
    }

    // Validate enum values
    if (!Object.values(IncidentType).includes(type)) {
      throw new BadRequestError("Invalid incident type");
    }

    if (!Object.values(IncidentStatus).includes(status)) {
      throw new BadRequestError("Invalid incident status");
    }

    if (!Object.values(IncidentImpact).includes(impact)) {
      throw new BadRequestError("Invalid incident impact");
    }

    // Validate maintenance-specific fields
    if (type === IncidentType.MAINTENANCE) {
      if (!scheduledStartTime || !scheduledEndTime) {
        throw new BadRequestError(
          "Scheduled start and end times are required for maintenance incidents"
        );
      }

      const startTime = new Date(scheduledStartTime);
      const endTime = new Date(scheduledEndTime);

      if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
        throw new BadRequestError("Invalid scheduled time format");
      }

      if (startTime >= endTime) {
        throw new BadRequestError(
          "Scheduled end time must be after scheduled start time"
        );
      }

      if (startTime < new Date()) {
        throw new BadRequestError("Scheduled start time cannot be in the past");
      }
    }

    // Validate incident-specific fields
    if (type === IncidentType.INCIDENT) {
      if (!startedAt) {
        throw new BadRequestError("Start time is required for incidents");
      }

      const startTime = new Date(startedAt);
      if (isNaN(startTime.getTime())) {
        throw new BadRequestError("Invalid start time format");
      }
    }

    // Validate status based on type
    const validMaintenanceStatuses = [
      IncidentStatus.SCHEDULED,
      IncidentStatus.IN_PROGRESS,
      IncidentStatus.COMPLETED,
    ];

    const validIncidentStatuses = [
      IncidentStatus.INVESTIGATING,
      IncidentStatus.IDENTIFIED,
      IncidentStatus.MONITORING,
      IncidentStatus.RESOLVED,
    ];

    if (
      type === IncidentType.MAINTENANCE &&
      !validMaintenanceStatuses.includes(status)
    ) {
      throw new BadRequestError("Invalid status for maintenance incident");
    }

    if (
      type === IncidentType.INCIDENT &&
      !validIncidentStatuses.includes(status)
    ) {
      throw new BadRequestError("Invalid status for incident");
    }

    // Validate services exist and user has access to them
    const invalidServices = await serviceRepository.validateUserServices(
      services,
      userId
    );

    if (invalidServices.length > 0) {
      throw new BadRequestError(
        `The following services are invalid or unauthorized: ${invalidServices.join(
          ", "
        )}`
      );
    }

    const incident = await incidentService.createIncident(userId, req.body);
    res.status(201).json(incident);
  } catch (error) {
    if (error instanceof ValidationError || error instanceof BadRequestError) {
      res.status(400).json({ message: error.message });
    } else {
      console.error("Error creating incident:", error);
      res.status(500).json({
        message: "An unexpected error occurred while creating the incident",
      });
    }
  }
});

// Get all incidents for the authenticated user
router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.payload.sub;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const incidents = await incidentService.getUserIncidents(userId);
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching incidents", error });
  }
});

// Get incidents for a specific service
router.get("/service/:serviceId", async (req: Request, res: Response) => {
  try {
    const incidents = await incidentService.getServiceIncidents(
      req.params.serviceId
    );
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching incidents", error });
  }
});

// Get a specific incident
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const incident = await incidentService.getIncident(req.params.id);
    if (!incident) {
      res.status(404).json({ message: "Incident not found" });
      return;
    }
    res.json(incident);
  } catch (error) {
    res.status(500).json({ message: "Error fetching incident", error });
  }
});

// Update an incident
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.payload.sub;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Validate services if they're being updated
    if (req.body.services) {
      const invalidServices = await serviceRepository.validateUserServices(
        req.body.services,
        userId
      );

      if (invalidServices.length > 0) {
        throw new BadRequestError(
          `The following services are invalid or unauthorized: ${invalidServices.join(
            ", "
          )}`
        );
      }
    }

    const incident = await incidentService.updateIncident(
      req.params.id,
      userId,
      req.body
    );
    if (!incident) {
      res.status(404).json({ message: "Incident not found or unauthorized" });
      return;
    }
    res.json(incident);
  } catch (error) {
    if (error instanceof ValidationError || error instanceof BadRequestError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error updating incident", error });
    }
  }
});

// Delete an incident
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.payload.sub;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const success = await incidentService.deleteIncident(req.params.id, userId);
    if (!success) {
      res.status(404).json({ message: "Incident not found or unauthorized" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting incident", error });
  }
});

// Add an update to an incident
router.post("/:id/updates", async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.payload.sub;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { message, status } = req.body;
    const result = await incidentService.addIncidentUpdate(
      req.params.id,
      userId,
      message,
      status
    );
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error adding incident update", error });
    }
  }
});

// Get all updates for an incident
router.get("/:id/updates", async (req: Request, res: Response) => {
  try {
    const updates = await incidentService.getIncidentUpdates(req.params.id);
    res.json(updates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching incident updates", error });
  }
});

export default router;
