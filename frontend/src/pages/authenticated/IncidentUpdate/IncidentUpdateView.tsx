import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoveLeftIcon, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { IncidentUpdate, Incident } from "@/types/IncidentTypes";
import { formatDistanceToNow } from "date-fns";
import { AUTHENTICATED_ROUTES } from "@/constants/routes";
import { useIsMobile } from "@/hooks/use-mobile";
import CircularLoader from "@/components/CircularLoader";

interface IncidentUpdateViewProps {
  incident: Incident;
  updates: IncidentUpdate[];
  onAddUpdate?: () => void;
  isLoading: boolean;
}

const UpdateCard: React.FC<{ update: IncidentUpdate }> = ({ update }) => {
  return (
    <div className="p-4 rounded-lg border bg-card">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-card-foreground">{update.message}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>
              {formatDistanceToNow(new Date(update.createdAt), {
                addSuffix: true,
              })}
            </span>
            <span>•</span>
            <span className="capitalize">Status: {update.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const IncidentUpdateView: React.FC<IncidentUpdateViewProps> = ({
  incident,
  updates,
  onAddUpdate,
  isLoading,
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="container md:py-4 space-y-4 md:space-y-6 ">
      <Link
        to={`/app/${AUTHENTICATED_ROUTES.INCIDENTS}`}
        className="text-semibold text-lg flex items-center gap-2"
      >
        <MoveLeftIcon className="w-6 h-6" />
        Back to Incidents
      </Link>

      {isLoading ? (
        <div className="flex justify-center items-center h-full pt-[20%]">
          <CircularLoader />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">
                {incident.title}
              </h1>
              {!isMobile ? (
                <Button onClick={onAddUpdate} className="md:ml-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Update
                </Button>
              ) : null}
            </div>
            <p className="text-muted-foreground">{incident.message}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            {isMobile ? (
              <Button onClick={onAddUpdate} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Update
              </Button>
            ) : null}
            <h2 className="text-xl font-semibold">Updates</h2>
            {updates.length > 0 ? (
              <div className="grid gap-4">
                {updates.map((update) => (
                  <UpdateCard key={update.id} update={update} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No updates yet</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default IncidentUpdateView;
