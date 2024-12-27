import React from "react";
import IncidentUpdaterView from "./IncidentUpdaterView";
import { FormData } from "./IncidentUpdaterView";
import { CreateIncidentUpdateDTO, Incident } from "@/types/IncidentTypes";
import { createIncidentUpdate } from "@/services/incidentService";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

interface IncidentUpdaterContainerProps {
  incident: Incident;
  onClose: () => void;
}

const IncidentUpdaterContainer: React.FC<IncidentUpdaterContainerProps> = ({
  incident,
  onClose,
}) => {
  const { toast } = useToast();
  const handleSubmit = async (data: FormData) => {
    const updateData: CreateIncidentUpdateDTO = {
      message: data.message,
      status: data.status,
    };
    try {
      await createIncidentUpdate(incident.id, updateData);
      toast({
        title: "Incident update created",
        description: "The incident update has been created successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["updates", incident.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["incident", incident.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["incidents"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error creating incident update",
        description:
          error?.response?.data?.message ||
          "An error occurred while creating the incident update",
        variant: "destructive",
      });
    }
  };

  return (
    <IncidentUpdaterView
      currentStatus={incident.status}
      onSubmit={handleSubmit}
      onCancel={onClose}
    />
  );
};

export default IncidentUpdaterContainer;
