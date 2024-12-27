import React, { useState } from "react";
import { useParams } from "react-router-dom";
import IncidentUpdateView from "./IncidentUpdateView";
import Modal from "@/components/Modal";
import IncidentUpdater from "./components/IncidentUpdater";
import { useQuery } from "react-query";
import {
  fetchIncident,
  fetchIncidentUpdates,
} from "@/services/incidentService";
import { Incident } from "@/types/IncidentTypes";

const IncidentUpdateContainer: React.FC = () => {
  const { id: incidentId } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: incident, isLoading: isLoadingIncident } = useQuery({
    queryKey: ["incident", incidentId],
    queryFn: () => fetchIncident(incidentId as string),
    enabled: !!incidentId,
  });

  const { data: updates, isLoading: isLoadingUpdates } = useQuery({
    queryKey: ["updates", incidentId],
    queryFn: () => fetchIncidentUpdates(incidentId as string),
    enabled: !!incidentId,
  });

  // if (!incident) {
  //   return <Navigate to="/incidents" replace />;
  // }

  const handleAddUpdate = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <IncidentUpdateView
        incident={incident || ({} as Incident)}
        isLoading={isLoadingIncident || isLoadingUpdates}
        updates={updates || []}
        onAddUpdate={handleAddUpdate}
      />
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <IncidentUpdater
          incident={incident || ({} as Incident)}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default IncidentUpdateContainer;
