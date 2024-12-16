import StatusSphereLogo from "../../../../../assets/StatusSphereLogo";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../../../../components/ui/sidebar";

const SideBarHeader = () => (
	<SidebarMenu>
		<SidebarMenuItem>
			<SidebarMenuButton
				size="lg"
				className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
			>
				<div className="size-8">
					<StatusSphereLogo />
				</div>
				<div className="grid flex-1 text-left text-sm leading-tight">
					<span className="truncate font-semibold">StatusSphere</span>
				</div>
			</SidebarMenuButton>
		</SidebarMenuItem>
	</SidebarMenu>
);

export default SideBarHeader;
