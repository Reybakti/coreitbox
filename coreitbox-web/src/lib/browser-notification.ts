export async function requestNotificationPermission() {
  if (
    typeof window ===
      "undefined" ||
    !(
      "Notification" in
      window
    )
  ) {
    return false;
  }

  if (
    Notification.permission ===
    "granted"
  ) {
    return true;
  }

  const permission =
    await Notification.requestPermission();

  return (
    permission ===
    "granted"
  );
}

export function showBrowserNotification(
  title: string,
  body: string,
) {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  if (
    !(
      "Notification" in
      window
    )
  ) {
    console.log(
      "Notification API not supported",
    );

    return;
  }

  console.log(
    "Notification Permission:",
    Notification.permission,
  );

  if (
    Notification.permission !==
    "granted"
  ) {
    return;
  }

  try {
    const notification =
      new Notification(
        title,
        {
          body,

          icon:
            "/icons/icon.svg",

          badge:
            "/icons/icon.svg",

          tag: `coreitbox-${Date.now()}`,

          requireInteraction:
            true,

          silent: false,
        },
      );

    notification.onclick =
      () => {
        window.focus();

        window.location.href =
          "/notifications";

        notification.close();
      };

    notification.onerror =
      (error) => {
        console.error(
          "Notification Error",
          error,
        );
      };
  } catch (error) {
    console.error(
      "Browser notification error",
      error,
    );
  }
}