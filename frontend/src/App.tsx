import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import {
  UNAUTHENTICATED_ROUTES,
  AUTHENTICATED_ROUTES,
} from "./constants/routes";
import Dashboard from "./pages/authenticated/Dashboard";
import Login from "./pages/unauthenticated/login";
import ServiceManagement from "./pages/authenticated/ServiceManagement";
import Incidents from "./pages/authenticated/Incidents";
import IncidentUpdate from "./pages/authenticated/IncidentUpdate";
import PublicStatusPage from "./pages/unauthenticated/PublicStatusPage";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "./lib/queryClient";
import CircularLoader from "./components/CircularLoader";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full pt-[20%]">
        <CircularLoader />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Root redirect */}
          <Route
            path="/"
            element={
              <Navigate
                to={isAuthenticated ? "/app" : UNAUTHENTICATED_ROUTES.LOGIN}
                replace
              />
            }
          />

          {/* Authenticated Routes */}
          <Route
            path="/app"
            element={
              isAuthenticated ? (
                <AuthenticatedLayout />
              ) : (
                <Navigate to={UNAUTHENTICATED_ROUTES.LOGIN} replace />
              )
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path={AUTHENTICATED_ROUTES.DASHBOARD}
              element={<Dashboard />}
            />
            <Route
              path={AUTHENTICATED_ROUTES.SERVICE_MANAGEMENT}
              element={<ServiceManagement />}
            />
            <Route
              path={AUTHENTICATED_ROUTES.INCIDENTS}
              element={<Incidents />}
            />
            <Route
              path={AUTHENTICATED_ROUTES.INCIDENT_DETAILS}
              element={<IncidentUpdate />}
            />
          </Route>

          {/* Login Route */}
          <Route
            path={UNAUTHENTICATED_ROUTES.LOGIN}
            element={
              !isAuthenticated ? <Login /> : <Navigate to="/app" replace />
            }
          />

          {/* Public Status Page */}
          <Route
            path={UNAUTHENTICATED_ROUTES.PUBLIC_STATUS_PAGE}
            element={<PublicStatusPage />}
          />

          {/* Catch all route */}
          <Route
            path="*"
            element={
              <Navigate
                to={isAuthenticated ? "/app" : UNAUTHENTICATED_ROUTES.LOGIN}
                replace
              />
            }
          />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
