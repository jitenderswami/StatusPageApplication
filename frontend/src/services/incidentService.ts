import { authenticatedClient } from "@/lib/client";
import {
  parseIncident,
  parseIncidents,
  parseIncidentUpdate,
  parseIncidentUpdates,
} from "../parsers/incidentParsers";
import {
  Incident,
  IncidentUpdate,
  CreateIncidentDTO,
  UpdateIncidentDTO,
  CreateIncidentUpdateDTO,
} from "../types/IncidentTypes";
import { URLS } from "@/constants/Urls";

export const fetchIncidents = async (): Promise<Incident[]> => {
  const response = await authenticatedClient.get(URLS.BASE_INCIDENTS);
  const data = response?.data;
  return parseIncidents(data);
};

export const createIncident = async (
  incident: CreateIncidentDTO
): Promise<Incident> => {
  const response = await authenticatedClient.post(
    URLS.BASE_INCIDENTS,
    incident
  );
  const data = response?.data;
  return parseIncident(data);
};

export const fetchIncident = async (incidentId: string): Promise<Incident> => {
  const response = await authenticatedClient.get(
    URLS.FETCH_INCIDENT.replace("%ID%", incidentId)
  );
  const data = response?.data;
  return parseIncident(data);
};

export const fetchIncidentUpdates = async (
  incidentId: string
): Promise<IncidentUpdate[]> => {
  const response = await authenticatedClient.get(
    URLS.BASE_INCIDENT_UPDATES.replace("%ID%", incidentId)
  );
  const data = response?.data;
  return parseIncidentUpdates(data);
};

export const createIncidentUpdate = async (
  incidentId: string,
  update: CreateIncidentUpdateDTO
): Promise<IncidentUpdate> => {
  const response = await authenticatedClient.post(
    URLS.BASE_INCIDENT_UPDATES.replace("%ID%", incidentId),
    update
  );
  const data = response?.data;
  return parseIncidentUpdate(data);
};
