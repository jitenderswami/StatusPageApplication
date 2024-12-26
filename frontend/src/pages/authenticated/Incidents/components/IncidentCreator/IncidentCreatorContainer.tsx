import React from "react";
import IncidentCreatorView from "./IncidentCreatorView";
import { FormData } from "./IncidentCreatorView";
import { CreateIncidentDTO } from "@/types/IncidentTypes";
import { useQuery } from "react-query";
import { parseServices } from "@/types/ServiceTypes";
import { authenticatedClient } from "@/lib/client";
import { URLS } from "@/constants/Urls";
import { useToast } from "@/hooks/use-toast";
import { createIncident } from "@/services/incidentService";
import { queryClient } from "@/lib/queryClient";

interface IncidentCreatorContainerProps {
  onClose: () => void;
}

const IncidentCreatorContainer: React.FC<IncidentCreatorContainerProps> = ({
  onClose,
}) => {
  const { toast } = useToast();
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await authenticatedClient.get(URLS.BASE_SERVICES);
      return parseServices(response.data);
    },
  });
  const handleSubmit = async (data: FormData) => {
    const formattedData: CreateIncidentDTO = {
      ...data,
      startedAt: data.startedAt ? new Date(data.startedAt) : undefined,
      scheduledStartTime: data.scheduledStartTime
        ? new Date(data.scheduledStartTime)
        : undefined,
      scheduledEndTime: data.scheduledEndTime
        ? new Date(data.scheduledEndTime)
        : undefined,
    };
    try {
      await createIncident(formattedData);
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      toast({
        title: "Success",
        description: "Incident created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create incident",
      });
    }
    onClose();
  };

  return (
    <IncidentCreatorView
      onSubmit={handleSubmit}
      onCancel={onClose}
      services={services || []}
    />
  );
};

export default IncidentCreatorContainer;
