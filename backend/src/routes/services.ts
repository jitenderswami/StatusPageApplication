import { Router, Request, Response, NextFunction } from "express";
import { checkJwt } from "../middleware/auth";
import { ServiceService } from "../services/ServiceService";
import { ServiceStatus } from "../models/Service";

const router = Router();
const serviceService = new ServiceService();

// Apply JWT middleware to all routes
router.use(checkJwt);

// Create a new service
router.post("/", async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.payload.sub;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Validate required fields
    const { name, status } = req.body;
    if (!name) {
      res.status(400).json({ message: "Service name is required" });
      return;
    }

    // Validate status if provided
    if (status && !Object.values(ServiceStatus).includes(status)) {
      res.status(400).json({
        message: "Invalid status value",
        allowedValues: Object.values(ServiceStatus),
      });
      return;
    }

    const service = await serviceService.createService(userId, req.body);
    res.status(201).json(service);
  } catch (error) {
    console.error("Service creation error:", error);
    res.status(500).json({
      message: "Error creating service",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Get all services for the authenticated user
router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.payload.sub;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const services = await serviceService.getUserServices(userId as string);
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
});

// Get a specific service
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const service = await serviceService.getService(req.params.id);
    if (!service) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service", error });
  }
});

// Update a service
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.payload.sub;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const service = await serviceService.updateService(
      req.params.id,
      userId,
      req.body
    );
    if (!service) {
      res.status(404).json({ message: "Service not found or unauthorized" });
      return;
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error });
  }
});

// Delete a service
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.payload.sub;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const success = await serviceService.deleteService(req.params.id, userId);
    if (!success) {
      res.status(404).json({ message: "Service not found or unauthorized" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error });
  }
});

export default router;
