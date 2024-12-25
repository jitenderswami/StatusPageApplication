import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UnAuthenticatedLayout from "./layouts/UnAuthenticatedLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import { UNAUTHENTICATED_ROUTES } from "./constants/routes";
import { AUTHENTICATED_ROUTES } from "./constants/routes";
import Dashboard from "./pages/authenticated/Dashboard";
import Login from "./pages/unauthenticated/login";
import ServiceManagement from "./pages/authenticated/ServiceManagement";
import { useAuthStatus } from "./hooks/useAuthStatus";
import Incidents from "./pages/authenticated/Incidents";
import IncidentUpdate from "./pages/authenticated/IncidentUpdate";

const App = () => {
  const { isAuthenticated, isLoading } = useAuthStatus();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Authenticated Routes */}
        <Route
          path="/app/*"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout />
            ) : (
              <Navigate to={UNAUTHENTICATED_ROUTES.LOGIN} replace />
            )
          }
        >
          <Route
            index
            element={<Navigate to={AUTHENTICATED_ROUTES.DASHBOARD} replace />}
          />
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

        {/* Unauthenticated Routes */}
        <Route
          path="/*"
          element={
            !isAuthenticated ? (
              <UnAuthenticatedLayout />
            ) : (
              <Navigate to="/app/" replace />
            )
          }
        >
          <Route path={UNAUTHENTICATED_ROUTES.LOGIN} element={<Login />} />
          <Route
            index
            element={<Navigate to={UNAUTHENTICATED_ROUTES.LOGIN} replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
