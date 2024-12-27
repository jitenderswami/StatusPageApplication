import { ServiceStatus } from "./ServiceTypes";
import { IncidentStatus } from "./IncidentTypes";

export interface DashboardService {
  id: string;
  name: string;
  status: ServiceStatus;
  description: string;
}

export interface DashboardIncident {
  id: string;
  title: string;
  status: IncidentStatus;
  createdAt: string;
  serviceIds: string[];
  updates: DashboardIncidentUpdate[];
}

export interface DashboardIncidentUpdate {
  id: string;
  message: string;
  createdAt: string;
  status: IncidentStatus;
}
