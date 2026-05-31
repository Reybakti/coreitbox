"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMenu } from "@/hooks/use-menu";

export function MobileBottomNav() {
  const pathname = usePathname();
  const menus = useMenu();
  const bottomMenus = menus.slice(0, 4);

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "lg:hidden",
        "fixed bottom-0 left-0 right-0 z-50",
        "h-[72px]",
        "flex items-center justify-around",
        "px-2 pb-2",
        // Glassmorphism
        "bg-background/70 backdrop-blur-2xl",
        "border-t border-white/10",
        "supports-[backdrop-filter]:bg-background/60",
      )}
    >
      {bottomMenus.map((menu) => {
        const active = pathname.startsWith(menu.href);

        return (
          <Link
            key={menu.href}
            href={menu.href}
            className={cn(
              "relative flex flex-col items-center justify-center gap-1",
              "flex-1 py-2 px-1 rounded-xl",
              "transition-colors duration-150 active:bg-white/5",
              "select-none",
            )}
          >
            {/* Icon wrapper with active pill bg */}
            <div className="relative flex h-7 w-9 items-center justify-center">
              {/* Active background pill */}
              <span
                className={cn(
                  "absolute inset-0 rounded-[14px] transition-opacity duration-300",
                  "bg-primary/15",
                  active ? "opacity-100" : "opacity-0",
                )}
              />

              <menu.icon
                size={20}
                className={cn(
                  "relative z-10 transition-all duration-300",
                  active
                    ? "text-primary scale-110 -translate-y-px"
                    : "text-muted-foreground/50",
                )}
                strokeWidth={active ? 2.2 : 1.8}
              />
            </div>

            {/* Label */}
            <span
              className={cn(
                "text-[10px] font-medium tracking-wide transition-colors duration-300",
                active ? "text-primary" : "text-muted-foreground/40",
              )}
            >
              {menu.title}
            </span>

            {/* Active dot indicator */}
            <span
              className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2",
                "h-1 w-1 rounded-full bg-primary",
                "transition-opacity duration-300",
                active ? "opacity-100" : "opacity-0",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}