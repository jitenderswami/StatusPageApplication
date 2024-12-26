export enum ServiceStatus {
  OPERATIONAL = "operational",
  DEGRADED = "degraded",
  PARTIAL_OUTAGE = "partial_outage",
  MAJOR_OUTAGE = "major_outage",
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  status: ServiceStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Type for creating a new service
export interface CreateServiceDTO {
  name: string;
  description?: string;
  status?: ServiceStatus;
}

// Type for updating an existing service
export interface UpdateServiceDTO {
  name?: string;
  description?: string;
  status?: ServiceStatus;
}

export const parseService = (rawService: any): Service => {
  return {
    ...rawService,
    createdAt: new Date(rawService.createdAt),
    updatedAt: new Date(rawService.updatedAt),
  };
};

export const parseServices = (rawServices: any[]): Service[] => {
  return rawServices.map(parseService);
};
