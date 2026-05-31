"use client";

import { useRouter }
from "next/navigation";

import {
  LogOut,
  Settings,
  User,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth }
from "@/hooks/use-auth";

export function UserMenu() {
  const router =
    useRouter();

  const {
    user,
    logout,
  } = useAuth();

  const initials =
    user?.username
      ?.slice(0, 2)
      ?.toUpperCase() ??
    "CI";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="
        flex
        items-center
        gap-3
        outline-none
        "
      >
        <div
          className="
          hidden
          md:block
          text-right
          "
        >
          <p
            className="
            text-sm
            font-medium
            "
          >
            {user?.username}
          </p>

          <p
            className="
            text-xs
            text-muted-foreground
            "
          >
            {user?.role}
          </p>
        </div>

        <Avatar>
          <AvatarFallback>
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
        w-56
        "
      >
        <div
          className="
          px-3
          py-2
          "
        >
          <p
            className="
            text-sm
            font-medium
            "
          >
            {user?.username}
          </p>

          <p
            className="
            text-xs
            text-muted-foreground
            "
          >
            {user?.role}
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() =>
            router.push(
              "/profile",
            )
          }
          className="
          cursor-pointer
          "
        >
          <User
            size={16}
            className="
            mr-2
            "
          />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            router.push(
              "/settings",
            )
          }
          className="
          cursor-pointer
          "
        >
          <Settings
            size={16}
            className="
            mr-2
            "
          />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="
          cursor-pointer
          text-red-500
          "
        >
          <LogOut
            size={16}
            className="
            mr-2
            "
          />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}