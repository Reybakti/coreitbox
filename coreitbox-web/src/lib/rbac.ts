import { APP_MENUS }
from "@/constants/menus";

export function canAccessRoute(
  role: string,
  pathname: string,
) {
  const menu =
    APP_MENUS.find(
      (item) =>
        pathname.startsWith(
          item.href,
        ),
    );

  if (!menu) {
    return true;
  }

  return menu.roles.includes(
    role as never,
  );
}