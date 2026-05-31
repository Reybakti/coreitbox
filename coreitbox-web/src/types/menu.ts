import { LucideIcon } from "lucide-react";

import { UserRole }
from "@/constants/roles";

export interface AppMenu {
  title: string;
  href: string;
  icon: LucideIcon;

  roles: UserRole[];
}