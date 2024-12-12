import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UnAuthenticatedLayout from "./layouts/UnAuthenticatedLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import { UNAUTHENTICATED_ROUTES } from "./constants/routes";
import { AUTHENTICATED_ROUTES } from "./constants/routes";
import Dashboard from "./pages/authenticated/Dashboard";
import Login from "./pages/unauthenticated/login";

const App = () => {
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<BrowserRouter>
			<div>{isAuthenticated ? "Logged In" : "Logged Out"}</div>
			<Routes>
				{/* Authenticated Routes */}
				<Route
					path="/app/*"
					element={
						isAuthenticated ? (
							<AuthenticatedLayout />
						) : (
							<Navigate to={UNAUTHENTICATED_ROUTES.login} replace />
						)
					}
				>
					<Route path={AUTHENTICATED_ROUTES.dashboard} element={<Dashboard />} />
					<Route index element={<Navigate to={AUTHENTICATED_ROUTES.dashboard} replace />} />
				</Route>

				{/* Unauthenticated Routes */}
				<Route
					path="/*"
					element={!isAuthenticated ? <UnAuthenticatedLayout /> : <Navigate to="/app/" replace />}
				>
					<Route path={UNAUTHENTICATED_ROUTES.login} element={<Login />} />
					<Route index element={<Navigate to={UNAUTHENTICATED_ROUTES.login} replace />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
