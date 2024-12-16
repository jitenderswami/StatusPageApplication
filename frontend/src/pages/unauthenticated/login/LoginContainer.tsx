import React from "react";
import LoginView from "./LoginView";
import { useAuth0 } from "@auth0/auth0-react";

const LoginContainer: React.FC = () => {
	const { loginWithPopup } = useAuth0();

	return <LoginView login={loginWithPopup} />;
};

export default LoginContainer;
