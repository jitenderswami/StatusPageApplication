import { Service, ServiceStatus } from '../models/Service';
import { ServiceRepository } from '../repositories/ServiceRepository';

export class ServiceService {
    private serviceRepository: ServiceRepository;

    constructor() {
        this.serviceRepository = new ServiceRepository();
    }

    async createService(userId: string, data: {
        name: string;
        description?: string;
        status?: ServiceStatus;
    }): Promise<Service> {
        const service = await this.serviceRepository.create({
            ...data,
            userId,
            status: data.status || ServiceStatus.OPERATIONAL
        });
        return service;
    }

    async getUserServices(userId: string): Promise<Service[]> {
        return this.serviceRepository.findByUserId(userId);
    }

    async getService(id: string): Promise<Service | null> {
        return this.serviceRepository.findById(id);
    }

    async updateService(id: string, userId: string, update: Partial<Service>): Promise<Service | null> {
        // First verify the service belongs to the user
        const service = await this.serviceRepository.findById(id);
        if (!service || service.userId !== userId) {
            return null;
        }

        return this.serviceRepository.update(id, update);
    }

    async deleteService(id: string, userId: string): Promise<boolean> {
        // First verify the service belongs to the user
        const service = await this.serviceRepository.findById(id);
        if (!service || service.userId !== userId) {
            return false;
        }

        return this.serviceRepository.delete(id);
    }
} 