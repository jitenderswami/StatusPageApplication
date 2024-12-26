import React, { useState } from "react";
import ServiceManagementView from "./ServiceManagementView";
import Modal from "@/components/Modal";
import ServiceEditor from "./components/ServiceEditor";
import {
  CreateServiceDTO,
  Service,
  UpdateServiceDTO,
  parseServices,
} from "@/types/ServiceTypes";
import { authenticatedClient } from "@/lib/client";
import { URLS } from "@/constants/Urls";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "react-query";

const ServiceManagementContainer: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isServiceEditorOpen, setIsServiceEditorOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);

  const { data: services, isLoading: isServicesLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await authenticatedClient.get(URLS.BASE_SERVICES);
      return parseServices(response.data);
    },
  });

  const handleAddService = () => {
    setServiceToEdit(null);
    setIsServiceEditorOpen(true);
  };

  const createService = async (data: CreateServiceDTO) => {
    try {
      await authenticatedClient.post(URLS.BASE_SERVICES, data);
      toast({
        title: "Success",
        description: "Service created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["services"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error creating service",
        variant: "destructive",
      });
    }
    setIsServiceEditorOpen(false);
  };

  const updateService = async (data: UpdateServiceDTO) => {
    try {
      await authenticatedClient.put(
        `${URLS.BASE_SERVICES}/${serviceToEdit?.id}`,
        data
      );
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["services"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error updating service",
        variant: "destructive",
      });
    }
    setIsServiceEditorOpen(false);
    setServiceToEdit(null);
  };

  const handleSubmit = (data: CreateServiceDTO | UpdateServiceDTO) => {
    if (serviceToEdit) {
      updateService(data as UpdateServiceDTO);
    } else {
      createService(data as CreateServiceDTO);
    }
  };

  const handleEditService = (service: Service) => {
    setServiceToEdit(service);
    setIsServiceEditorOpen(true);
  };

  return (
    <>
      <ServiceManagementView
        onAddService={handleAddService}
        onEditService={handleEditService}
        services={services ?? []}
        isLoading={isServicesLoading}
      />
      <Modal
        open={isServiceEditorOpen}
        onClose={() => {
          setIsServiceEditorOpen(false);
          setServiceToEdit(null);
        }}
      >
        <ServiceEditor onSubmit={handleSubmit} initialData={serviceToEdit} />
      </Modal>
    </>
  );
};

export default ServiceManagementContainer;
