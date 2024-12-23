import { ValidationError } from '../errors/ValidationError';
import { Incident, IncidentType, IncidentStatus, IncidentImpact } from '../models/Incident';
import { IncidentUpdate } from '../models/IncidentUpdate';
import { IncidentRepository } from '../repositories/IncidentRepository';
import { ServiceRepository } from '../repositories/ServiceRepository';

export class IncidentService {
    private incidentRepository: IncidentRepository;
    private serviceRepository: ServiceRepository;

    constructor() {
        this.incidentRepository = new IncidentRepository();
        this.serviceRepository = new ServiceRepository();
    }

    private async createIncidentUpdate(
        incidentId: string,
        userId: string,
        status: IncidentStatus,
        message: string
    ): Promise<IncidentUpdate> {
        return this.incidentRepository.addUpdate({
            incidentId,
            userId,
            status,
            message
        });
    }

    private validateIncidentCreation(data: {
        title: string;
        type: IncidentType;
        status: IncidentStatus;
        impact: IncidentImpact;
        services: string[];
        message: string;
        startedAt?: Date;
        scheduledStartTime?: Date;
        scheduledEndTime?: Date;
    }) {
        // Check required fields
        if (!data.title?.trim()) {
            throw new ValidationError('Incident title is required');
        }

        if (!data.message?.trim()) {
            throw new ValidationError('Incident message is required');
        }

        if (!data.services?.length) {
            throw new ValidationError('At least one service must be selected');
        }

        // Validate status based on incident type
        if (data.type === IncidentType.MAINTENANCE) {
            if (!data.scheduledStartTime) {
                throw new ValidationError('Scheduled start time is required for maintenance');
            }

            if (!data.scheduledEndTime) {
                throw new ValidationError('Scheduled end time is required for maintenance');
            }

            if (data.scheduledEndTime <= data.scheduledStartTime) {
                throw new ValidationError('Scheduled end time must be after start time');
            }

            // Validate maintenance status
            const validMaintenanceStatuses = [
                IncidentStatus.SCHEDULED,
                IncidentStatus.IN_PROGRESS,
                IncidentStatus.COMPLETED
            ];
            if (!validMaintenanceStatuses.includes(data.status)) {
                throw new ValidationError(
                    `Invalid maintenance status. Must be one of: ${validMaintenanceStatuses.join(', ')}`
                );
            }
        } else {
            // Validate incident status
            const validIncidentStatuses = [
                IncidentStatus.INVESTIGATING,
                IncidentStatus.IDENTIFIED,
                IncidentStatus.MONITORING,
                IncidentStatus.RESOLVED
            ];
            if (!validIncidentStatuses.includes(data.status)) {
                throw new ValidationError(
                    `Invalid incident status. Must be one of: ${validIncidentStatuses.join(', ')}`
                );
            }
        }

        // Validate dates
        if (data.startedAt && data.startedAt > new Date()) {
            throw new ValidationError('Start date cannot be in the future');
        }

        // For scheduled maintenance, validate against current time
        if (data.type === IncidentType.MAINTENANCE && data.scheduledStartTime) {
            const now = new Date();
            if (data.scheduledStartTime < now) {
                throw new ValidationError('Scheduled start time must be in the future');
            }
        }
    }

    async createIncident(userId: string, data: {
        title: string;
        type: IncidentType;
        status: IncidentStatus;
        impact: IncidentImpact;
        services: string[];
        message: string;
        startedAt?: Date;
        scheduledStartTime?: Date;
        scheduledEndTime?: Date;
    }): Promise<Incident> {
        // Validate the incident data
        this.validateIncidentCreation(data);

        // Verify all services exist and belong to the user
        for (const serviceId of data.services) {
            const service = await this.serviceRepository.findById(serviceId);
            if (!service) {
                throw new ValidationError(`Service not found: ${serviceId}`);
            }
            if (service.userId !== userId) {
                throw new ValidationError(`Unauthorized access to service: ${serviceId}`);
            }
        }

        const incident = await this.incidentRepository.create({
            ...data,
            userId,
            startedAt: data.startedAt || new Date()
        });

        // Create initial incident update
        await this.createIncidentUpdate(
            incident.id,
            userId,
            data.status,
            data.type === IncidentType.MAINTENANCE
                ? `Scheduled maintenance created: ${data.message}`
                : `Incident created: ${data.message}`
        );

        return incident;
    }

    async getIncident(id: string): Promise<Incident | null> {
        return this.incidentRepository.findById(id);
    }

    async getUserIncidents(userId: string): Promise<Incident[]> {
        return this.incidentRepository.findByUserId(userId);
    }

    async getServiceIncidents(serviceId: string): Promise<Incident[]> {
        return this.incidentRepository.findByService(serviceId);
    }

    async updateIncident(
        id: string, 
        userId: string, 
        update: Partial<Incident>
    ): Promise<Incident | null> {
        const incident = await this.incidentRepository.findById(id);
        if (!incident || incident.userId !== userId) {
            return null;
        }

        // If status is changing, create an update
        if (update.status && update.status !== incident.status) {
            await this.createIncidentUpdate(
                id,
                userId,
                update.status,
                this.getDefaultStatusMessage(update.status, incident.type)
            );
        }

        return this.incidentRepository.update(id, update);
    }

    private getDefaultStatusMessage(status: IncidentStatus, type: IncidentType): string {
        if (type === IncidentType.MAINTENANCE) {
            switch (status) {
                case IncidentStatus.SCHEDULED:
                    return 'Maintenance has been scheduled';
                case IncidentStatus.IN_PROGRESS:
                    return 'Maintenance work has started';
                case IncidentStatus.COMPLETED:
                    return 'Maintenance has been completed';
                default:
                    return `Maintenance status updated to ${status}`;
            }
        } else {
            switch (status) {
                case IncidentStatus.INVESTIGATING:
                    return 'We are investigating the issue';
                case IncidentStatus.IDENTIFIED:
                    return 'The root cause has been identified';
                case IncidentStatus.MONITORING:
                    return 'Fix has been implemented, monitoring the situation';
                case IncidentStatus.RESOLVED:
                    return 'The incident has been resolved';
                default:
                    return `Incident status updated to ${status}`;
            }
        }
    }

    async deleteIncident(id: string, userId: string): Promise<boolean> {
        const incident = await this.incidentRepository.findById(id);
        if (!incident || incident.userId !== userId) {
            return false;
        }

        return this.incidentRepository.delete(id);
    }

    private validateIncidentUpdate(
        incident: Incident,
        status?: IncidentStatus,
        message?: string
    ) {
        if (!message?.trim()) {
            throw new ValidationError('Update message is required');
        }

        if (status) {
            if (incident.type === IncidentType.MAINTENANCE) {
                const validMaintenanceStatuses = [
                    IncidentStatus.SCHEDULED,
                    IncidentStatus.IN_PROGRESS,
                    IncidentStatus.COMPLETED
                ];
                if (!validMaintenanceStatuses.includes(status)) {
                    throw new ValidationError(
                        `Invalid maintenance status. Must be one of: ${validMaintenanceStatuses.join(', ')}`
                    );
                }
            } else {
                const validIncidentStatuses = [
                    IncidentStatus.INVESTIGATING,
                    IncidentStatus.IDENTIFIED,
                    IncidentStatus.MONITORING,
                    IncidentStatus.RESOLVED
                ];
                if (!validIncidentStatuses.includes(status)) {
                    throw new ValidationError(
                        `Invalid incident status. Must be one of: ${validIncidentStatuses.join(', ')}`
                    );
                }
            }
        }
    }

    async addIncidentUpdate(
        incidentId: string,
        userId: string,
        message: string,
        status?: IncidentStatus
    ): Promise<{ update: IncidentUpdate; incident: Incident | null }> {
        const incident = await this.incidentRepository.findById(incidentId);
        if (!incident || incident.userId !== userId) {
            throw new ValidationError('Incident not found or unauthorized');
        }

        // Validate the update
        this.validateIncidentUpdate(incident, status, message);

        const newStatus = status || incident.status;
        const update = await this.createIncidentUpdate(
            incidentId,
            userId,
            newStatus,
            message
        );

        // Update incident status if it changed
        let updatedIncident = incident;
        if (status && status !== incident.status) {
            updatedIncident = await this.incidentRepository.update(incidentId, { status }) || incident;
        }

        return { update, incident: updatedIncident };
    }

    async getIncidentUpdates(incidentId: string): Promise<IncidentUpdate[]> {
        return this.incidentRepository.getIncidentUpdates(incidentId);
    }
} 
