import React, { useState } from "react";
import { Service } from "@/types/ServiceTypes";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Activity,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import CircularLoader from "@/components/CircularLoader";
import { formatDistanceToNow } from "date-fns";
import {
  Incident,
  IncidentStatus,
  IncidentUpdate,
} from "@/types/IncidentTypes";
import { getStatusStyle } from "@/pages/authenticated/ServiceManagement/components/ServiceBox/utils/StatusStyle";
import IncidentStatusBadge from "@/pages/authenticated/Incidents/components/IncidentStatusBadge";

interface DashboardViewProps {
  services: Service[];
  incidents: { incident: Incident; updates: IncidentUpdate[] }[];
  isLoading: boolean;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  services,
  incidents,
  isLoading,
}) => {
  const [expandedIncidents, setExpandedIncidents] = useState<string[]>([]);

  const toggleIncident = (incidentId: string) => {
    setExpandedIncidents((prev) =>
      prev.includes(incidentId)
        ? prev.filter((id) => id !== incidentId)
        : [...prev, incidentId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "operational":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "degraded":
        return <Activity className="h-4 w-4 text-yellow-600" />;
      case "partial_outage":
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case "major_outage":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <CircularLoader />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Services Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Service Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => {
            const statusStyle = getStatusStyle(service.status);
            return (
              <div
                key={service.id}
                className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(service.status)}
                    <h3 className="font-semibold">{service.name}</h3>
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: statusStyle.backgroundColor,
                      color: statusStyle.color,
                    }}
                  >
                    {statusStyle.label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {service?.description && service?.description?.length > 50
                    ? `${service.description?.slice(0, 50)}...`
                    : service?.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Incidents Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Recent Incidents</h2>
        <div className="space-y-4">
          {incidents.map((data) => {
            const { incident, updates } = data;
            return (
              <div
                key={incident.id}
                className="border rounded-lg shadow-sm bg-card overflow-hidden"
              >
                <Button
                  variant="ghost"
                  className="w-full flex justify-between items-center px-6 py-4 h-auto hover:bg-accent/50"
                  onClick={() => toggleIncident(incident.id)}
                >
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="font-semibold text-left">
                      {incident.title}
                    </h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {incident.createdAt &&
                        formatDistanceToNow(new Date(incident.createdAt), {
                          addSuffix: true,
                        })}
                    </span>
                  </div>
                  {expandedIncidents.includes(incident.id) ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>

                {expandedIncidents.includes(incident.id) &&
                  updates.length > 0 && (
                    <div className="border-t bg-muted/30">
                      <div className="max-h-[300px] overflow-y-auto divide-y">
                        {updates.map((update) => (
                          <div
                            key={update.id}
                            className="p-4 hover:bg-background/80 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDistanceToNow(
                                  new Date(update.createdAt),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </span>
                              <IncidentStatusBadge
                                status={update.status as IncidentStatus}
                              />
                            </div>
                            <p className="text-sm">{update.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DashboardView;
