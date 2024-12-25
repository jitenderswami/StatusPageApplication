import {
  Incident,
  IncidentType,
  IncidentStatus,
  IncidentImpact,
} from "../../../../types/IncidentTypes";

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: "1",
    title: "Database Performance Degradation",
    type: IncidentType.INCIDENT,
    status: IncidentStatus.INVESTIGATING,
    impact: IncidentImpact.MAJOR,
    services: ["service-1", "service-2"],
    message:
      "We are investigating reports of slow database response times affecting multiple services.",
    userId: "user-1",
    startedAt: new Date("2024-03-15T10:00:00Z"),
    createdAt: new Date("2024-03-15T10:05:00Z"),
    updatedAt: new Date("2024-03-15T10:05:00Z"),
  },
  {
    id: "2",
    title: "Planned System Maintenance",
    type: IncidentType.MAINTENANCE,
    status: IncidentStatus.SCHEDULED,
    impact: IncidentImpact.MINOR,
    services: ["service-3"],
    message: "Scheduled maintenance for system upgrades and security patches.",
    userId: "user-1",
    startedAt: new Date("2024-03-20T02:00:00Z"),
    scheduledStartTime: new Date("2024-03-20T02:00:00Z"),
    scheduledEndTime: new Date("2024-03-20T04:00:00Z"),
    createdAt: new Date("2024-03-13T15:00:00Z"),
    updatedAt: new Date("2024-03-13T15:00:00Z"),
  },
  {
    id: "3",
    title: "API Gateway Outage",
    type: IncidentType.INCIDENT,
    status: IncidentStatus.RESOLVED,
    impact: IncidentImpact.CRITICAL,
    services: ["service-4", "service-5", "service-6"],
    message:
      "API Gateway service experienced complete outage. Issue has been resolved.",
    userId: "user-2",
    startedAt: new Date("2024-03-14T08:30:00Z"),
    resolvedAt: new Date("2024-03-14T09:45:00Z"),
    createdAt: new Date("2024-03-14T08:35:00Z"),
    updatedAt: new Date("2024-03-14T09:45:00Z"),
  },
  {
    id: "4",
    title: "Network Infrastructure Upgrade",
    type: IncidentType.MAINTENANCE,
    status: IncidentStatus.IN_PROGRESS,
    impact: IncidentImpact.MINOR,
    services: ["service-7", "service-8"],
    message:
      "Performing network infrastructure upgrades to improve system reliability.",
    userId: "user-1",
    startedAt: new Date("2024-03-16T01:00:00Z"),
    scheduledStartTime: new Date("2024-03-16T01:00:00Z"),
    scheduledEndTime: new Date("2024-03-16T05:00:00Z"),
    createdAt: new Date("2024-03-10T12:00:00Z"),
    updatedAt: new Date("2024-03-16T01:00:00Z"),
  },
];

export const MOCK_INCIDENT_UPDATES = [
  {
    id: "update-1",
    incidentId: "1",
    message:
      "Engineering team is investigating the root cause of database slowdown.",
    status: IncidentStatus.INVESTIGATING,
    userId: "user-1",
    createdAt: new Date("2024-03-15T10:15:00Z"),
    updatedAt: new Date("2024-03-15T10:15:00Z"),
  },
  {
    id: "update-2",
    incidentId: "3",
    message: "Issue identified as network configuration problem.",
    status: IncidentStatus.IDENTIFIED,
    userId: "user-2",
    createdAt: new Date("2024-03-14T09:00:00Z"),
    updatedAt: new Date("2024-03-14T09:00:00Z"),
  },
  {
    id: "update-3",
    incidentId: "3",
    message:
      "Configuration restored. Services are back online and operating normally.",
    status: IncidentStatus.RESOLVED,
    userId: "user-2",
    createdAt: new Date("2024-03-14T09:45:00Z"),
    updatedAt: new Date("2024-03-14T09:45:00Z"),
  },
];
