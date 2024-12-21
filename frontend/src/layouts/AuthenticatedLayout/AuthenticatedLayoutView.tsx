import React from "react";
import { Outlet } from "react-router-dom";
import { authenticatedClient } from "../../lib/client";
import { URLS } from "../../constants/Urls";
import { AppSidebar } from "./components/SideBar/AppSideBar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { LogOutIcon } from "lucide-react";

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
		<SidebarProvider>
			<div className="authenticated-layout flex w-full">
				<AppSidebar />
				<div className="w-full">
					<div className="flex items-center justify-between bg-sidebar border-b border-sidebar-border p-2 gap-2">
						<SidebarTrigger size="icon" className="size-6" />
						<LogOutIcon className="cursor-pointer" onClick={logout} />
					</div>

					<Outlet />
				</div>

				{/* <SidebarInset> */}
				{/* <div className="">
					Authenticated Layout
					<button onClick={logout}>Logout</button>
					<button onClick={getDashboardData}>Get Dashboard Data</button>
				</div> */}
				{/* <Outlet /> */}
				{/* </SidebarInset> */}
			</div>
		</SidebarProvider>
	);
};

export default AuthenticatedLayoutView;
