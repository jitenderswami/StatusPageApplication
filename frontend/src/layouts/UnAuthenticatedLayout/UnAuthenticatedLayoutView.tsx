import React from "react";
import { Outlet } from "react-router-dom";
import { unauthenticatedClient } from "../../libs/client";
import { URLS } from "../../constants/Urls";

interface UnAuthenticatedLayoutViewProps {
	// Add your props here
	loginWithPopup: () => void;
}

const UnAuthenticatedLayoutView: React.FC<UnAuthenticatedLayoutViewProps> = ({ loginWithPopup }) => {
	const getPublicData = async () => {
		const response = await unauthenticatedClient.get(URLS.PUBLIC_DATA);
		console.log(response?.data);
	};
	return (
		<div className="unauthenticated-layout">
			Unauthenticated layout
			<button onClick={loginWithPopup}>Log In</button>
			<button onClick={getPublicData}>Get Public Data</button>
			<Outlet />
		</div>
	);
};

export default UnAuthenticatedLayoutView;
