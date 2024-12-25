import { IncidentStatus } from "@/types/IncidentTypes";

const IncidentStatusBadge: React.FC<{ status: IncidentStatus }> = ({
  status,
}) => {
  const statusStyles = {
    [IncidentStatus.INVESTIGATING]:
      "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
    [IncidentStatus.IDENTIFIED]:
      "bg-blue-500/15 text-blue-700 dark:text-blue-400",
    [IncidentStatus.MONITORING]:
      "bg-purple-500/15 text-purple-700 dark:text-purple-400",
    [IncidentStatus.RESOLVED]:
      "bg-green-500/15 text-green-700 dark:text-green-400",
    [IncidentStatus.SCHEDULED]:
      "bg-gray-500/15 text-gray-700 dark:text-gray-400",
    [IncidentStatus.IN_PROGRESS]:
      "bg-orange-500/15 text-orange-700 dark:text-orange-400",
    [IncidentStatus.COMPLETED]:
      "bg-green-500/15 text-green-700 dark:text-green-400",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}
    >
      {status.replace("_", " ").toLocaleUpperCase()}
    </span>
  );
};

export default IncidentStatusBadge;
