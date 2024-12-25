import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import IncidentUpdateView from "./IncidentUpdateView";
import Modal from "@/components/Modal";
import { MOCK_INCIDENTS } from "../Incidents/constants/MockIncidents";
import { MOCK_INCIDENT_UPDATES } from "../Incidents/constants/MockIncidents";
import IncidentUpdater from "./components/IncidentUpdater";

const IncidentUpdateContainer: React.FC = () => {
  const { id: incidentId } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const incident = MOCK_INCIDENTS.find((inc) => inc.id === incidentId);
  const updates = MOCK_INCIDENT_UPDATES.filter(
    (update) => update.incidentId === incidentId
  );

  if (!incident) {
    return <Navigate to="/incidents" replace />;
  }

  const handleAddUpdate = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <IncidentUpdateView
        incident={incident}
        updates={updates}
        onAddUpdate={handleAddUpdate}
      />
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <IncidentUpdater
          currentStatus={incident.status}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default IncidentUpdateContainer;
