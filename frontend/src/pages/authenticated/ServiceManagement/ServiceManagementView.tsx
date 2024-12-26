import { Button } from "@/components/ui/button";
import React from "react";
import { MOCK_SERVICES } from "./constants/MockServices";
import ServiceBox from "./components/ServiceBox";
import { Service } from "@/types/ServiceTypes";
import CircularLoader from "@/components/CircularLoader";
import { PlusIcon } from "lucide-react";

interface ServiceManagementViewProps {
  services: Service[];
  isLoading: boolean;
  onAddService: () => void;
  onEditService: (data: Service) => void;
}

const ServiceManagementView: React.FC<ServiceManagementViewProps> = ({
  services,
  isLoading,
  onAddService,
  onEditService,
}) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Button className="w-full md:w-[200px] ml-auto" onClick={onAddService}>
        <PlusIcon className="w-4 h-4 mr-2" />
        Add Service
      </Button>
      <div className="flex flex-col w-full h-full pt-4 gap-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <CircularLoader />
          </div>
        ) : services?.length > 0 ? (
          services?.map((service) => (
            <ServiceBox
              key={service.id}
              service={service}
              onEdit={onEditService}
            />
          ))
        ) : (
          <div className="flex flex-col justify-start items-center h-full gap-2 mt-[100px]">
            <h2 className="text-gray-500 text-lg font-bold">
              No services found
            </h2>
            <p className="text-gray-400 text-sm font-medium">
              Add a service to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceManagementView;
