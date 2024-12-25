import React from "react";
import IncidentUpdaterView from "./IncidentUpdaterView";
import { FormData } from "./IncidentUpdaterView";
import { CreateIncidentUpdateDTO, IncidentStatus } from "@/types/IncidentTypes";

interface IncidentUpdaterContainerProps {
  currentStatus: IncidentStatus;
  onClose: () => void;
}

const IncidentUpdaterContainer: React.FC<IncidentUpdaterContainerProps> = ({
  currentStatus,
  onClose,
}) => {
  const handleSubmit = (data: FormData) => {
    const updateData: CreateIncidentUpdateDTO = {
      message: data.message,
      status: data.status,
    };
    console.log("Creating update:", updateData);
    onClose();
  };

  return (
    <IncidentUpdaterView
      currentStatus={currentStatus}
      onSubmit={handleSubmit}
      onCancel={onClose}
    />
  );
};

export default IncidentUpdaterContainer;
