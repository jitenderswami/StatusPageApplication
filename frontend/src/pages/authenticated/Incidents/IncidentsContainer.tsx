import React, { useState } from "react";
import IncidentsView from "./IncidentsView";
import Modal from "@/components/Modal";
import IncidentCreator from "./components/IncidentCreator";
import { useQuery } from "react-query";
import { fetchIncidents } from "@/services/incidentService";

const IncidentsContainer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: incidents, isLoading: isLoadingIncidents } = useQuery({
    queryKey: ["incidents"],
    queryFn: fetchIncidents,
  });

  const handleCreateIncident = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <IncidentsView
        incidents={incidents || []}
        isLoading={isLoadingIncidents}
        onCreateIncident={handleCreateIncident}
      />
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <IncidentCreator onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default IncidentsContainer;
