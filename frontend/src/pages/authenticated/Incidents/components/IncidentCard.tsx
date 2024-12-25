import React from "react";
import { useNavigate } from "react-router-dom";
import { Incident } from "@/types/IncidentTypes";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import IncidentStatusBadge from "./IncidentStatusBadge";
import { AUTHENTICATED_ROUTES } from "@/constants/routes";

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
  const navigate = useNavigate();

  const handleNavigateToDetails = () => {
    navigate(
      `/app/${AUTHENTICATED_ROUTES.INCIDENT_DETAILS.replace(
        ":id",
        incident.id
      )}`
    );
  };

  return (
    <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{incident.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {incident.message}
          </p>
        </div>
        <IncidentStatusBadge status={incident.status} />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            Started: {new Date(incident.startedAt).toLocaleDateString()}
          </span>
          {incident.resolvedAt && (
            <span>
              Resolved: {new Date(incident.resolvedAt).toLocaleDateString()}
            </span>
          )}
          <span className="capitalize">Type: {incident.type}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="flex gap-2 items-center justify-center"
          onClick={handleNavigateToDetails}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Updates
        </Button>
      </div>
    </div>
  );
};

export default IncidentCard;
