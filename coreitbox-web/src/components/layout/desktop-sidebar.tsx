"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { useMenu } from "@/hooks/use-menu";

import {
  useAppSettings,
} from "@/hooks/use-app-settings";

export function DesktopSidebar() {
  const pathname =
    usePathname();

  const menus =
    useMenu();

    const {
  settings,
} = useAppSettings();

  return (
    <aside
      className="
      hidden
      lg:flex

      w-72
      shrink-0

      border-r
      bg-card

      flex-col
      "
    >
      <div
        className="
        h-16

        px-6

        flex
        items-center

        border-b
        "
      >
        <div>
          <h1
            className="
            text-xl
            font-bold

            text-primary
            "
          >
            {
      settings.company_name ||
      "CoreITBox"
    }
          </h1>

          <p
            className="
            text-xs
            text-muted-foreground
            "
          >
            IT Service Management
          </p>
        </div>
      </div>

      <nav
        className="
        flex-1

        p-4

        space-y-2
        "
      >
        {menus.map(
          (menu) => {
            const active =
              pathname.startsWith(
                menu.href,
              );

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={cn(
                  `
                  flex
                  items-center
                  gap-3

                  rounded-xl

                  px-4
                  py-3

                  transition-all
                  duration-200
                  `,
                  active
                    ? `
                      bg-primary
                      text-primary-foreground
                      shadow-md
                    `
                    : `
                      hover:bg-accent
                    `,
                )}
              >
                <menu.icon
                  size={18}
                />

                <span>
                  {menu.title}
                </span>
              </Link>
            );
          },
        )}
      </nav>
    </aside>
  );
}