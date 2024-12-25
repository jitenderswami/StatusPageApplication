import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Service } from "@/types/ServiceTypes";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MultiSelectProps {
  options: Service[];
  selected: string[];
  onChange: (value: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
}) => {
  const handleSelect = (value: string) => {
    if (!selected.includes(value)) {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (serviceId: string) => {
    onChange(selected.filter((id) => id !== serviceId));
  };

  return (
    <div className="flex flex-col gap-2">
      <Select onValueChange={handleSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select services..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options
              .filter((service) => !selected.includes(service.id))
              .map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((serviceId) => {
            const service = options.find((s) => s.id === serviceId);
            return (
              service && (
                <Badge
                  key={service.id}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {service.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => handleRemove(service.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
