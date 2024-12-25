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
import { Button } from "@/components/ui/button";
import { IncidentStatus } from "@/types/IncidentTypes";

export const formSchema = z.object({
  message: z.string().min(1, "Update message is required"),
  status: z.nativeEnum(IncidentStatus),
});

export type FormData = z.infer<typeof formSchema>;

interface IncidentUpdaterViewProps {
  currentStatus: IncidentStatus;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const IncidentUpdaterView: React.FC<IncidentUpdaterViewProps> = ({
  currentStatus,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: currentStatus,
    },
  });

  const handleSubmit = (values: FormData) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Add Update</h2>
          <p className="text-sm text-muted-foreground">
            Provide an update message and optionally change the incident status.
          </p>
        </div>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Update Message</FormLabel>
                <FormControl>
                  <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe the update..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(IncidentStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() +
                          status.slice(1).toLowerCase().replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Update</Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default IncidentUpdaterView;
