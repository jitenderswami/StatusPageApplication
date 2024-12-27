import React from "react";
import PublicStatusPageView from "./PublicStatusPageView";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { URLS } from "@/constants/Urls";
import { unauthenticatedClient } from "@/lib/client";
import { parseDashboardData } from "@/parsers/dashboardParsers";

const PublicStatusPageContainer: React.FC = () => {
  const { userId } = useParams();

  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await unauthenticatedClient.get(
        URLS.PUBLIC_STATUS_PAGE.replace(":userId", userId as string)
      );
      return parseDashboardData(response.data);
    },
    enabled: !!userId,
  });

  // Add your container logic here
  return (
    <>
      <PublicStatusPageView
        userId={userId || ""}
        services={dashboardData?.services || []}
        incidents={dashboardData?.incidents || []}
        isLoading={isDashboardLoading}
      />
    </>
  );
};

export default PublicStatusPageContainer;
