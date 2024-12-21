import React, { useEffect } from "react";
import AuthenticatedLayoutView from "./AuthenticatedLayoutView";
import { useAuth0 } from "@auth0/auth0-react";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStroage";

const AuthenticatedLayoutContainer: React.FC = () => {
	const { logout, getAccessTokenSilently, isAuthenticated, isLoading: isAuthLoading } = useAuth0();

	useEffect(() => {
		const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
		if (isAuthenticated && !isAuthLoading && !token) {
			getAccessTokenSilently().then((token) => {
				if (token) {
					localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
				}
			});
		}
	}, [isAuthenticated, getAccessTokenSilently, isAuthLoading]);

	return <AuthenticatedLayoutView logout={logout} />;
};

export default AuthenticatedLayoutContainer;
