import { ServiceStatus } from "@/types/Services";

export const getStatusStyle = (status: ServiceStatus) => {
  switch (status) {
    case ServiceStatus.OPERATIONAL:
      return {
        color: "#2D8A39",
        backgroundColor: "#DCFCE7",
        label: "Operational",
      };
    case ServiceStatus.DEGRADED:
      return {
        color: "#CA8A04",
        backgroundColor: "#FEF9C3",
        label: "Degraded",
      };
    case ServiceStatus.PARTIAL_OUTAGE:
      return {
        color: "#DC6803",
        backgroundColor: "#FFEDD5",
        label: "Partial Outage",
      };
    case ServiceStatus.MAJOR_OUTAGE:
      return {
        color: "#DC2626",
        backgroundColor: "#FEE2E2",
        label: "Major Outage",
      };
  }
};
