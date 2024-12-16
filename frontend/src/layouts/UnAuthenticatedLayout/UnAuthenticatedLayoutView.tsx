import React from "react";
import { Outlet } from "react-router-dom";

interface UnAuthenticatedLayoutViewProps {}

const UnAuthenticatedLayoutView: React.FC<UnAuthenticatedLayoutViewProps> = ({}) => {
	return (
		<div className="unauthenticated-layout w-screen h-screen overflow-hidden">
			<Outlet />
		</div>
	);
};

export default UnAuthenticatedLayoutView;
