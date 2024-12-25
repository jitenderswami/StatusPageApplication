import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ServerCogIcon,
  AlertCircle,
} from "lucide-react";
import UserProfileMenu from "@/components/UserProfileMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import SideBarHeader from "./components/SideBarHeader";
import { AUTHENTICATED_ROUTES } from "@/constants/routes";
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: `/app/${AUTHENTICATED_ROUTES.DASHBOARD}`,
    icon: Home,
  },
  {
    title: "Services Management",
    url: `/app/${AUTHENTICATED_ROUTES.SERVICE_MANAGEMENT}`,
    icon: ServerCogIcon,
  },
  {
    title: "Incidents",
    url: `/app/${AUTHENTICATED_ROUTES.INCIDENTS}`,
    icon: AlertCircle,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SideBarHeader />
      </SidebarHeader>
      {!isMobile && (
        <div className="w-[20px] h-[20px] rounded-full text-muted-foreground flex items-center justify-center absolute top-[10%] right-[-10px] z-[1000] p-3 bg-sidebar border-sidebar-border border-[2px]">
          <SidebarTrigger
            icon={
              state === "expanded" ? (
                <ArrowLeft size={16} />
              ) : (
                <ArrowRight size={16} />
              )
            }
          />
        </div>
      )}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="w-full">
                    <UserProfileMenu showUserName />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
