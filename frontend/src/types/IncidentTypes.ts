// Import service types since incidents are related to services
import { Service } from "./ServiceTypes";

export enum IncidentType {
  INCIDENT = "incident",
  MAINTENANCE = "maintenance",
}

export enum IncidentStatus {
  INVESTIGATING = "investigating",
  IDENTIFIED = "identified",
  MONITORING = "monitoring",
  RESOLVED = "resolved",
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export enum IncidentImpact {
  NONE = "none",
  MINOR = "minor",
  MAJOR = "major",
  CRITICAL = "critical",
}

// Main incident interface
export interface Incident {
  id: string;
  title: string;
  type: IncidentType;
  status: IncidentStatus;
  impact: IncidentImpact;
  services: string[];
  message: string;
  userId: string;
  startedAt: Date;
  resolvedAt?: Date;
  scheduledStartTime?: Date;
  scheduledEndTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for incident updates
export interface IncidentUpdate {
  id: string;
  incidentId: string;
  message: string;
  status: IncidentStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// DTO for creating a new incident
export interface CreateIncidentDTO {
  title: string;
  type: IncidentType;
  status: IncidentStatus;
  impact: IncidentImpact;
  services: string[];
  message: string;
  startedAt?: Date;
  scheduledStartTime?: Date;
  scheduledEndTime?: Date;
}

// DTO for updating an existing incident
export interface UpdateIncidentDTO {
  title?: string;
  status?: IncidentStatus;
  impact?: IncidentImpact;
  services?: string[];
  message?: string;
  resolvedAt?: Date;
  scheduledStartTime?: Date;
  scheduledEndTime?: Date;
}

// DTO for creating an incident update
export interface CreateIncidentUpdateDTO {
  message: string;
  status: IncidentStatus;
}
