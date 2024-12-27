import DashboardView from "@/pages/authenticated/Dashboard/DashboardView";
import { IncidentUpdate } from "@/types/IncidentTypes";
import { Incident } from "@/types/IncidentTypes";
import { Service } from "@/types/ServiceTypes";
import React from "react";

interface PublicStatusPageViewProps {
  userId: string;
  services: Service[];
  incidents: { incident: Incident; updates: IncidentUpdate[] }[];
  isLoading: boolean;
  // Add your props here
}

const PublicStatusPageView: React.FC<PublicStatusPageViewProps> = ({
  userId,
  services,
  incidents,
  isLoading,
}) => {
  return (
    <div className=" flex flex-col items-center justify-center w-full h-full p-4 md:p-8 gap-8">
      <h1 className="text-2xl font-bold font-mono">{userId}</h1>
      <div className="w-full h-full bg-gray-100 p-8 border border-gray-200 rounded-lg shadow-lg">
        <DashboardView
          services={services}
          incidents={incidents}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default PublicStatusPageView;
