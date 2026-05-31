import {
  LayoutDashboard,
  Ticket,
  Users,
  Bell,
  Settings,
  BarChart3,
  ClipboardList,
  User,
} from "lucide-react";

import { AppMenu }
from "@/types/menu";

import { ROLES }
from "./roles";

export const APP_MENUS: AppMenu[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: [
      ROLES.SYSADMIN,
      ROLES.ADMIN,
      ROLES.TEKNISI,
    ],
  },

  {
    title: "Tickets",
    href: "/tickets",
    icon: Ticket,
    roles: [
      ROLES.SYSADMIN,
      ROLES.ADMIN,
      ROLES.TEKNISI,
    ],
  },

  {
    title: "Users",
    href: "/users",
    icon: Users,
    roles: [
      ROLES.SYSADMIN,
      ROLES.ADMIN,
    ],
  },

  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    roles: [
      ROLES.SYSADMIN,
      ROLES.ADMIN,
    ],
  },

  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
    roles: [
      ROLES.SYSADMIN,
      ROLES.ADMIN,
      ROLES.TEKNISI,
    ],
  },

  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    roles: [
      ROLES.SYSADMIN,
      ROLES.ADMIN,
    ],
  },

  {
    title: "Audit Logs",
    href: "/audit-logs",
    icon: ClipboardList,
    roles: [
      ROLES.SYSADMIN,
    ],
  },

  {
    title: "Profile",
    href: "/profile",
    icon: User,
    roles: [
      ROLES.SYSADMIN,
      ROLES.ADMIN,
      ROLES.TEKNISI,
    ],
  },
];