import { Link } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarFooter,
  SidebarHeader,
  SidebarGroupLabel,

} from "@/components/ui/sidebar"
import {
  Gauge,
  Users,
  BarChart4,
  GalleryVerticalEnd,
  ListChecks,
  UsersRound,
  UserCheck,
  Network,
  Vote
} from "lucide-react"

import { NavUser } from "@/components/nav-user"


const data = {
    user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}
const navItems = [

  {
    title: "Dashboard",
    path: "",
    icon: Gauge,
  },
  {
    title: "Election Setup",
    path: "election-setup",
    icon: ListChecks,
  },
  {
    title: "Voters",
    path: "voters",
    icon: UserCheck,
  },
  {
    title: "Results",
    path: "results",
    icon: BarChart4,
  },
]

export function ElectionDetailsSidebar({ electionId }) {
  return (
    <Sidebar collapsible="icon">
      
      <SidebarHeader>
        <SidebarMenu>
          
          <SidebarMenuItem>
            
            <SidebarMenuButton size="lg" asChild>
              
              <Link to={`/admin/`}>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Election View</span>
                  <span className="">{electionId}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>

        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={`/admin/election/${electionId}/${item.path}`} className="pl-6 flex items-center gap-3">
                  
                    <item.icon className="size-4" />
                    {item.title}
                  
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
