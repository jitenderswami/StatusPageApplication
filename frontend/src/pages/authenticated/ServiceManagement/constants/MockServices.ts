import { Service, ServiceStatus } from "@/types/Services";

export const MOCK_SERVICES: Service[] = [
  {
    id: "1",
    name: "Service 1",
    description: "Description 1",
    status: ServiceStatus.OPERATIONAL,
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Service 2",
    description: "Description 2",
    status: ServiceStatus.DEGRADED,
    userId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Service 3",
    description: "Description 3",
    status: ServiceStatus.PARTIAL_OUTAGE,
    userId: "3",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Service 4",
    description: "Description 4",
    status: ServiceStatus.MAJOR_OUTAGE,
    userId: "4",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Service 5",
    description: "Description 5",
    status: ServiceStatus.OPERATIONAL,
    userId: "5",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
