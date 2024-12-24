import React from "react";
import ServiceBoxView from "./ServiceBoxView";
import { Service } from "@/types/Services";

interface ServiceBoxContainerProps {
  service: Service;
  onEdit: (data: Service) => void;
}

const ServiceBoxContainer: React.FC<ServiceBoxContainerProps> = ({
  service,
  onEdit,
}) => {
  const handleEdit = () => {
    console.log("Edit");
    onEdit(service);
  };
  const handleDelete = () => {
    console.log("Delete");
  };
  return (
    <ServiceBoxView
      service={service}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default ServiceBoxContainer;
