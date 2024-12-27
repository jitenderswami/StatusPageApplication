import { parseServices } from "@/types/ServiceTypes";
import { parseIncident } from "./incidentParsers";
import { parseIncidentUpdates } from "./incidentParsers";

export const parseDashboardData = (data: any) => {
  return {
    services: parseServices(data.services),
    incidents: data.incidents.map((data: any) => ({
      incident: parseIncident(data.incident),
      updates: parseIncidentUpdates(data.updates),
    })),
  };
};
