import React from "react";
import { Outlet } from "react-router-dom";
import { authenticatedClient } from "../../libs/client";
import { URLS } from "../../constants/Urls";

interface AuthenticatedLayoutViewProps {
	// Add your props here
	logout: () => void;
}

const AuthenticatedLayoutView: React.FC<AuthenticatedLayoutViewProps> = ({ logout }) => {
	const getDashboardData = async () => {
		const response = await authenticatedClient.get(URLS.DASHBOARD_DATA);
		console.log(response?.data);
	};
	return (
		<div className="authenticated-layout">
			<div>
				Authenticated Layout
				<button onClick={logout}>Logout</button>
				<button onClick={getDashboardData}>Get Dashboard Data</button>
			</div>
			<Outlet />
		</div>
	);
};

export default AuthenticatedLayoutView;
