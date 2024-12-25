import React from "react";
import { Service, ServiceStatus } from "@/types/ServiceTypes";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { getStatusStyle } from "./utils/StatusStyle";

interface ServiceBoxViewProps {
  service: Service;
  onEdit: () => void;
  onDelete: () => void;
}

const ServiceBoxView: React.FC<ServiceBoxViewProps> = ({
  service,
  onEdit,
  onDelete,
}) => {
  const statusStyle = getStatusStyle(service.status);

  return (
    <div className="flex flex-col w-full h-full p-4 bg-gray-100 rounded-md shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col sm:flex-row w-full h-full gap-4 sm:gap-0 sm:justify-between sm:items-center">
        <div className="flex flex-col w-full">
          <h3 className="text-lg font-bold">{service.name}</h3>
          <p className="text-sm text-gray-500">{service.description}</p>
        </div>
        <div className="flex items-center gap-2 md:w-full">
          <div
            className="flex flex-col w-[10px] h-[10px] rounded-full"
            style={{ backgroundColor: statusStyle.color }}
          />
          <p
            className="text-sm font-medium capitalize"
            style={{ color: statusStyle.color }}
          >
            {statusStyle.label}
          </p>
        </div>
        <div className="flex flex-row justify-between md:justify-end md:w-full gap-2">
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceBoxView;
