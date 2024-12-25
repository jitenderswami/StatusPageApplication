import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CreateIncidentDTO,
  IncidentType,
  IncidentStatus,
  IncidentImpact,
} from "@/types/IncidentTypes";
import { Service } from "@/types/ServiceTypes";
import { MOCK_SERVICES } from "../../../ServiceManagement/constants/MockServices";
import { MultiSelect } from "@/components/ui/multi-select";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.nativeEnum(IncidentType),
  status: z.nativeEnum(IncidentStatus),
  impact: z.nativeEnum(IncidentImpact),
  services: z.array(z.string()).min(1, "At least one service must be selected"),
  message: z.string().min(1, "Message is required"),
  startedAt: z.string().optional(),
  scheduledStartTime: z.string().optional(),
  scheduledEndTime: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

interface IncidentCreatorViewProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const IncidentCreatorView: React.FC<IncidentCreatorViewProps> = ({
  onSubmit,
  onCancel,
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: IncidentType.INCIDENT,
      status: IncidentStatus.INVESTIGATING,
      impact: IncidentImpact.MINOR,
      services: [],
    },
  });

  const handleSubmit = (values: FormData) => {
    onSubmit(values);
  };

  const selectedType = form.watch("type");

  const serviceOptions = React.useMemo(
    () =>
      MOCK_SERVICES.map((service) => ({
        id: service.id,
        label: service.name,
      })),
    []
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Incident title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(IncidentType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="impact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Impact</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select impact" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(IncidentImpact).map((impact) => (
                      <SelectItem key={impact} value={impact}>
                        {impact.charAt(0).toUpperCase() + impact.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="services"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Affected Services</FormLabel>
              <FormControl>
                <MultiSelect
                  options={serviceOptions}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Select services..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describe the incident..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startedAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedType === IncidentType.MAINTENANCE && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="scheduledStartTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scheduled Start</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scheduledEndTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scheduled End</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Incident</Button>
        </div>
      </form>
    </Form>
  );
};

export default IncidentCreatorView;
