export function playNotificationSound() {
  const audio =
    new Audio(
      "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg",
    );

  audio.volume = 0.4;

  audio.play().catch(
    () => {},
  );
}