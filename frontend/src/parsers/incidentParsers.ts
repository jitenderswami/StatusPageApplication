import { Incident, IncidentUpdate } from "../types/IncidentTypes";

/**
 * Parses a date string or undefined into a Date object or undefined
 */
const parseDate = (dateString: string | null | undefined): Date | undefined => {
  if (!dateString) return undefined;
  return new Date(dateString);
};

/**
 * Parses raw incident data from the backend into the frontend Incident type
 */
export const parseIncident = (data: any): Incident => {
  return {
    id: data._id || data.id, // Handle both Mongoose _id and transformed id
    title: data.title,
    type: data.type,
    status: data.status,
    impact: data.impact,
    services: data.services,
    message: data.message,
    userId: data.userId,
    startedAt: parseDate(data.startedAt)!, // Non-null assertion as this is required
    resolvedAt: parseDate(data.resolvedAt),
    scheduledStartTime: parseDate(data.scheduledStartTime),
    scheduledEndTime: parseDate(data.scheduledEndTime),
    createdAt: parseDate(data.createdAt)!, // Non-null assertion as this is required
    updatedAt: parseDate(data.updatedAt)!, // Non-null assertion as this is required
  };
};

/**
 * Parses raw incident update data from the backend into the frontend IncidentUpdate type
 */
export const parseIncidentUpdate = (data: any): IncidentUpdate => {
  return {
    id: data._id || data.id,
    incidentId: data.incidentId,
    message: data.message,
    status: data.status,
    userId: data.userId,
    createdAt: parseDate(data.createdAt)!,
    updatedAt: parseDate(data.updatedAt)!,
  };
};

/**
 * Parse an array of incidents
 */
export const parseIncidents = (data: any[]): Incident[] => {
  return data.map(parseIncident);
};

/**
 * Parse an array of incident updates
 */
export const parseIncidentUpdates = (data: any[]): IncidentUpdate[] => {
  return data.map(parseIncidentUpdate);
};
