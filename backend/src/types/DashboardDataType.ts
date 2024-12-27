import { Service } from "../models/Service";
import { Incident } from "../models/Incident";
import { IncidentUpdate } from "../models/IncidentUpdate";

export interface DashboardData {
  services: Partial<Service>[];
  incidents: {
    incident: Partial<Incident>;
    updates: Partial<IncidentUpdate>[];
  }[];
}
