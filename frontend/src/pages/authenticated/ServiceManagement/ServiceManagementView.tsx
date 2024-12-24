import { Button } from "@/components/ui/button";
import React from "react";
import { MOCK_SERVICES } from "./constants/MockServices";
import ServiceBox from "./components/ServiceBox";
import { Service } from "@/types/Services";

interface ServiceManagementViewProps {
  onAddService: () => void;
  onEditService: (data: Service) => void;
}

const ServiceManagementView: React.FC<ServiceManagementViewProps> = ({
  onAddService,
  onEditService,
}) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Button className="w-full md:w-[300px] ml-auto" onClick={onAddService}>
        Add Service
      </Button>
      <div className="flex flex-col w-full h-full pt-4 gap-4">
        {MOCK_SERVICES.map((service) => (
          <ServiceBox
            key={service.id}
            service={service}
            onEdit={onEditService}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceManagementView;
