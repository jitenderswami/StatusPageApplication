import React from "react";
import UnAuthenticatedLayoutView from "./UnAuthenticatedLayoutView";
import { useAuth0 } from "@auth0/auth0-react";

const UnAuthenticatedLayoutContainer: React.FC = () => {
	// Add your container logic here
	const { loginWithPopup } = useAuth0();

	return <UnAuthenticatedLayoutView loginWithPopup={loginWithPopup} />;
};

export default UnAuthenticatedLayoutContainer;
