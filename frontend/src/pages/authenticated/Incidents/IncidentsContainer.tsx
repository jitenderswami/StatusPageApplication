import React, { useState } from "react";
import IncidentsView from "./IncidentsView";
import { MOCK_INCIDENTS } from "./constants/MockIncidents";
import Modal from "@/components/Modal";
import IncidentCreator from "./components/IncidentCreator";

const IncidentsContainer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateIncident = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <IncidentsView
        incidents={MOCK_INCIDENTS}
        onCreateIncident={handleCreateIncident}
      />
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <IncidentCreator onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default IncidentsContainer;
