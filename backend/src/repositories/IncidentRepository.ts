import { Incident, IncidentModel, IIncident } from '../models/Incident';
import { IncidentUpdate, IncidentUpdateModel, IIncidentUpdate } from '../models/IncidentUpdate';

export class IncidentRepository {
    private documentToIncident(doc: IIncident): Incident {
        const { _id, ...rest } = doc.toObject();
        return {
            id: _id.toString(),
            ...rest
        };
    }

    private documentToIncidentUpdate(doc: IIncidentUpdate): IncidentUpdate {
        const { _id, ...rest } = doc.toObject();
        return {
            id: _id.toString(),
            ...rest
        };
    }

    async create(incident: Partial<Incident>): Promise<Incident> {
        const newIncident = new IncidentModel(incident);
        const saved = await newIncident.save();
        return this.documentToIncident(saved);
    }

    async findById(id: string): Promise<Incident | null> {
        const incident = await IncidentModel.findById(id);
        return incident ? this.documentToIncident(incident) : null;
    }

    async findByUserId(userId: string): Promise<Incident[]> {
        const incidents = await IncidentModel.find({ userId });
        return incidents.map(incident => this.documentToIncident(incident));
    }

    async findByService(serviceId: string): Promise<Incident[]> {
        const incidents = await IncidentModel.find({ services: serviceId });
        return incidents.map(incident => this.documentToIncident(incident));
    }

    async update(id: string, update: Partial<Incident>): Promise<Incident | null> {
        const updated = await IncidentModel.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        );
        return updated ? this.documentToIncident(updated) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await IncidentModel.findByIdAndDelete(id);
        return result !== null;
    }

    // Incident Updates
    async addUpdate(update: Partial<IncidentUpdate>): Promise<IncidentUpdate> {
        const newUpdate = new IncidentUpdateModel(update);
        const saved = await newUpdate.save();
        return this.documentToIncidentUpdate(saved);
    }

    async getIncidentUpdates(incidentId: string): Promise<IncidentUpdate[]> {
        const updates = await IncidentUpdateModel.find({ incidentId })
            .sort({ createdAt: -1 });
        return updates.map(update => this.documentToIncidentUpdate(update));
    }
} 