import { Router, Request, Response } from 'express';
import { checkJwt } from '../middleware/auth';
import { IncidentService } from '../services/IncidentService';
import { ValidationError } from '../errors/ValidationError';

const router = Router();
const incidentService = new IncidentService();

// Apply JWT middleware to all routes
router.use(checkJwt);

// Create a new incident
router.post('/', async (req: Request, res: Response) => {
    try {
        const userId = req.auth?.payload.sub;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const incident = await incidentService.createIncident(userId, req.body);
        res.status(201).json(incident);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error creating incident', error });
        }
    }
});

// Get all incidents for the authenticated user
router.get('/', async (req: Request, res: Response) => {
    try {
        const userId = req.auth?.payload.sub;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const incidents = await incidentService.getUserIncidents(userId);
        res.json(incidents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching incidents', error });
    }
});

// Get incidents for a specific service
router.get('/service/:serviceId', async (req: Request, res: Response) => {
    try {
        const incidents = await incidentService.getServiceIncidents(req.params.serviceId);
        res.json(incidents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching incidents', error });
    }
});

// Get a specific incident
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const incident = await incidentService.getIncident(req.params.id);
        if (!incident) {
            res.status(404).json({ message: 'Incident not found' });
            return;
        }
        res.json(incident);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching incident', error });
    }
});

// Update an incident
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.auth?.payload.sub;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const incident = await incidentService.updateIncident(req.params.id, userId, req.body);
        if (!incident) {
            res.status(404).json({ message: 'Incident not found or unauthorized' });
            return;
        }
        res.json(incident);
    } catch (error) {
        res.status(500).json({ message: 'Error updating incident', error });
    }
});

// Delete an incident
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.auth?.payload.sub;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const success = await incidentService.deleteIncident(req.params.id, userId);
        if (!success) {
            res.status(404).json({ message: 'Incident not found or unauthorized' });
            return;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting incident', error });
    }
});

// Add an update to an incident
router.post('/:id/updates', async (req: Request, res: Response) => {
    try {
        const userId = req.auth?.payload.sub;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
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
            res.status(500).json({ message: 'Error adding incident update', error });
        }
    }
});

// Get all updates for an incident
router.get('/:id/updates', async (req: Request, res: Response) => {
    try {
        const updates = await incidentService.getIncidentUpdates(req.params.id);
        res.json(updates);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching incident updates', error });
    }
});

export default router; 