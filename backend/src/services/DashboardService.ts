import { IncidentRepository } from "../repositories/IncidentRepository";
import { ServiceRepository } from "../repositories/ServiceRepository";
import { DashboardData } from "../types/DashboardDataType";

export class DashboardService {
  private serviceRepository: ServiceRepository;
  private incidentRepository: IncidentRepository;
  constructor() {
    this.serviceRepository = new ServiceRepository();
    this.incidentRepository = new IncidentRepository();
  }

  async getDashboardData(userId: string): Promise<DashboardData> {
    const services = await this.serviceRepository.findByUserId(userId);
    const incidents = await this.incidentRepository.findByUserId(userId);

    let dashboardData: DashboardData = {
      services: [],
      incidents: [],
    };

    dashboardData.services = await this.serviceRepository.findByUserId(userId);

    for (const incident of incidents) {
      const updates = await this.incidentRepository.getIncidentUpdates(
        incident.id
      );
      dashboardData.incidents.push({ incident, updates });
    }

    return dashboardData;
  }
}
