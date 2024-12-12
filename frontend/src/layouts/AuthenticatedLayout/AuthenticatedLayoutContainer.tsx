import React, { useEffect } from "react";
import AuthenticatedLayoutView from "./AuthenticatedLayoutView";
import { useAuth0 } from "@auth0/auth0-react";
import { setAuthToken } from "../../libs/client";

const AuthenticatedLayoutContainer: React.FC = () => {
	const { logout, getAccessTokenSilently, isAuthenticated, isLoading: isAuthLoading } = useAuth0();

	useEffect(() => {
		if (isAuthenticated && !isAuthLoading) {
			const setupAuthToken = async () => {
				try {
					const token = await getAccessTokenSilently();
					setAuthToken(token);
				} catch (error) {
					console.error("Failed to set auth token:", error);
				}
			};

			setupAuthToken();
		}
	}, [isAuthenticated, getAccessTokenSilently, isAuthLoading]);

	return <AuthenticatedLayoutView logout={logout} />;
};

export default AuthenticatedLayoutContainer;
