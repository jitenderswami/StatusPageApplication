import React, { useState } from "react";
import ServiceManagementView from "./ServiceManagementView";
import Modal from "@/components/Modal";
import ServiceEditor from "./components/ServiceEditor";
import {
  CreateServiceDTO,
  Service,
  UpdateServiceDTO,
} from "@/types/ServiceTypes";

const ServiceManagementContainer: React.FC = () => {
  const [isServiceEditorOpen, setIsServiceEditorOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
  const handleAddService = () => {
    setIsServiceEditorOpen(true);
  };

  const createUpdateService = async (
    data: CreateServiceDTO | UpdateServiceDTO
  ) => {
    console.log(data);
    setIsServiceEditorOpen(false);
  };

  const handleEditService = (data: Service) => {
    setServiceToEdit(data);
    setIsServiceEditorOpen(true);
  };

  return (
    <>
      <ServiceManagementView
        onAddService={handleAddService}
        onEditService={handleEditService}
      />
      <Modal
        open={isServiceEditorOpen}
        onClose={() => {
          setIsServiceEditorOpen(false);
          setServiceToEdit(null);
        }}
      >
        <ServiceEditor
          onSubmit={createUpdateService}
          initialData={serviceToEdit}
        />
      </Modal>
    </>
  );
};

export default ServiceManagementContainer;
