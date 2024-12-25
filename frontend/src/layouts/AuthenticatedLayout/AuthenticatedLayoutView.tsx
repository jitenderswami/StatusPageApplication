import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./components/SideBar/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import UserProfileMenu from "@/components/UserProfileMenu";
import { AUTHENTICATED_ROUTES } from "@/constants/routes";

interface AuthenticatedLayoutViewProps {
  // Add your props here
}

const getPageTitle = (pathname: string): string => {
  // Use authenticated routes for mapping
  const routes: Record<string, string> = {
    [AUTHENTICATED_ROUTES.SERVICE_MANAGEMENT]: "Service Management",
    [AUTHENTICATED_ROUTES.DASHBOARD]: "Dashboard",
    [AUTHENTICATED_ROUTES.INCIDENTS]: "Incidents",
    // Add more mappings here as needed
  };

  // Find the matching route
  const matchingRoute = Object.keys(routes).find((route) =>
    pathname.includes(route)
  );

  return matchingRoute ? routes[matchingRoute] : "";
};

const AuthenticatedLayoutView: React.FC<AuthenticatedLayoutViewProps> = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <SidebarProvider>
      <div className="authenticated-layout flex w-full flex-col md:flex-row">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {isMobile && (
            <div className="w-full">
              <div className="flex items-center justify-between bg-sidebar border-b border-sidebar-border p-2 gap-2">
                <SidebarTrigger size="icon" className="size-6" />
                <div className="ml-auto">
                  <UserProfileMenu />
                </div>
              </div>
            </div>
          )}
          <div className="p-6 border-b">
            <h1 className="text-3xl font-bold tracking-tight text-foreground/90">
              {pageTitle}
            </h1>
          </div>
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AuthenticatedLayoutView;
