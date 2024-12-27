export const AUTHENTICATED_ROUTES = {
  DASHBOARD: "dashboard",
  SERVICE_MANAGEMENT: "service-management",
  INCIDENTS: "incidents",
  INCIDENT_DETAILS: "incidents/:id",
} as const;

export const UNAUTHENTICATED_ROUTES = {
  LOGIN: "/login",
  PUBLIC_STATUS_PAGE: "/status/:userId",
} as const;
