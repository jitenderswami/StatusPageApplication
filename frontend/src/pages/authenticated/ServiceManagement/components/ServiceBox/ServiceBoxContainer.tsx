import React from "react";
import ServiceBoxView from "./ServiceBoxView";
import { Service } from "@/types/ServiceTypes";
import { URLS } from "@/constants/Urls";
import { authenticatedClient } from "@/lib/client";
import { queryClient } from "@/lib/queryClient";
import { toast, useToast } from "@/hooks/use-toast";

interface ServiceBoxContainerProps {
  service: Service;
  onEdit: (data: Service) => void;
}

const ServiceBoxContainer: React.FC<ServiceBoxContainerProps> = ({
  service,
  onEdit,
}) => {
  const { toast } = useToast();
  const handleEdit = () => {
    onEdit(service);
  };
  const handleDelete = async () => {
    await authenticatedClient.delete(
      URLS.CRUD_SERVICE.replace(":id", service.id)
    );
    queryClient.invalidateQueries({ queryKey: ["services"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    toast({
      title: "Service deleted successfully",
    });
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
