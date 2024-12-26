import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Incident, IncidentStatus } from "@/types/IncidentTypes";
import IncidentCard from "./components/IncidentCard";
import CircularLoader from "@/components/CircularLoader";

interface IncidentsViewProps {
  incidents: Incident[];
  isLoading: boolean;
  onCreateIncident?: () => void;
}

const IncidentsView: React.FC<IncidentsViewProps> = ({
  incidents,
  isLoading,
  onCreateIncident,
}) => {
  const activeIncidents = incidents.filter(
    (incident) =>
      incident.status !== IncidentStatus.RESOLVED &&
      incident.status !== IncidentStatus.COMPLETED
  );
  const resolvedIncidents = incidents.filter(
    (incident) =>
      incident.status === IncidentStatus.RESOLVED ||
      incident.status === IncidentStatus.COMPLETED
  );

  return (
    <div className="container py-4 space-y-6">
      <div className="flex items-center justify-between">
        <Button
          onClick={onCreateIncident}
          className="md:ml-auto w-full md:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Incident
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-full pt-[10%]">
          <CircularLoader />
        </div>
      ) : (
        <div className="space-y-6">
          {activeIncidents.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Active Incidents</h2>
              <div className="grid gap-4">
                {activeIncidents.map((incident) => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            </div>
          )}

          {resolvedIncidents.length > 0 && (
            <div className="space-y-4">
              <Separator className="my-6" />
              <h2 className="text-xl font-semibold">Resolved Incidents</h2>
              <div className="grid gap-4">
                {resolvedIncidents.map((incident) => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            </div>
          )}

          {incidents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No incidents found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IncidentsView;
