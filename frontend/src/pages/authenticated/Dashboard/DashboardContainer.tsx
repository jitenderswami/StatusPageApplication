import React from "react";
import { useQuery } from "react-query";
import DashboardView from "./DashboardView";
import { URLS } from "@/constants/Urls";
import { authenticatedClient } from "@/lib/client";
import { parseDashboardData } from "@/parsers/dashboardParsers";

const DashboardContainer: React.FC = () => {
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await authenticatedClient.get(URLS.BASE_DASHBOARD);
      return parseDashboardData(response.data);
    },
  });

  return (
    <DashboardView
      services={dashboardData?.services || []}
      incidents={dashboardData?.incidents || []}
      isLoading={isDashboardLoading}
    />
  );
};

export default DashboardContainer;
