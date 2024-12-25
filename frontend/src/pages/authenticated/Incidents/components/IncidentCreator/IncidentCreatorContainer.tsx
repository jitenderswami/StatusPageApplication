import React from "react";
import IncidentCreatorView from "./IncidentCreatorView";
import { FormData } from "./IncidentCreatorView";
import { CreateIncidentDTO } from "@/types/IncidentTypes";

interface IncidentCreatorContainerProps {
  onClose: () => void;
}

const IncidentCreatorContainer: React.FC<IncidentCreatorContainerProps> = ({
  onClose,
}) => {
  const handleSubmit = (data: FormData) => {
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
    console.log(formattedData);
    onClose();
  };

  return <IncidentCreatorView onSubmit={handleSubmit} onCancel={onClose} />;
};

export default IncidentCreatorContainer;
