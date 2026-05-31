import api from "@/lib/api";

export class NotificationService {
  static async getAll() {
    const res =
      await api.get(
        "/notifications",
      );

    return res.data;
  }

  static async getUnread() {
    const res =
      await api.get(
        "/notifications/unread",
      );

    return res.data;
  }

  static async markRead(
    id: string,
  ) {
    const res =
      await api.patch(
        `/notifications/${id}/read`,
      );

    return res.data;
  }

  static async markAllRead() {
    const res =
      await api.patch(
        "/notifications/read-all",
      );

    return res.data;
  }
}