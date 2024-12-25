import { ServiceEditorView } from "./ServiceEditorView";
import { CreateServiceDTO, UpdateServiceDTO } from "@/types/ServiceTypes";

type ServiceEditorContainerProps = {
  onSubmit: (data: CreateServiceDTO | UpdateServiceDTO) => Promise<void>;
  initialData: CreateServiceDTO | UpdateServiceDTO | null;
  isLoading?: boolean;
};

export default function ServiceEditorContainer({
  onSubmit,
  initialData,
  isLoading,
}: ServiceEditorContainerProps) {
  return (
    <ServiceEditorView
      onSubmit={onSubmit}
      initialData={initialData}
      isLoading={isLoading}
    />
  );
}
