export const AUTHENTICATED_ROUTES = {
  DASHBOARD: "dashboard",
  SERVICE_MANAGEMENT: "service-management",
  INCIDENTS: "incidents",
  INCIDENT_DETAILS: "incidents/:id",
  // other authenticated routes...
} as const;
export const UNAUTHENTICATED_ROUTES = {
  LOGIN: "login",
};
