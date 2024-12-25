import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Option {
  id: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ options, selected, onChange, placeholder = "Select..." }, ref) => {
    const handleSelect = (value: string) => {
      if (!selected.includes(value)) {
        onChange([...selected, value]);
      }
    };

    const handleRemove = (id: string) => {
      onChange(selected.filter((selectedId) => selectedId !== id));
    };

    return (
      <div ref={ref} className="flex flex-col gap-2">
        <Select onValueChange={handleSelect}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options
                .filter((option) => !selected.includes(option.id))
                .map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selected.map((id) => {
              const option = options.find((opt) => opt.id === id);
              return (
                option && (
                  <Badge
                    key={option.id}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {option.label}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => handleRemove(option.id)}
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
  }
);

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
