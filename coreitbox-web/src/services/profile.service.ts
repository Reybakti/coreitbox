import api from "@/lib/api";

export class ProfileService {
  static async me() {
    const { data } =
      await api.get(
        "/auth/me",
      );

    return data;
  }

  static async update(
    payload: {
      fullName: string;
      email: string;
    },
  ) {
    const { data } =
      await api.patch(
        "/auth/me",
        payload,
      );

    return data;
  }

  static async changePassword(
    payload: {
      currentPassword: string;
      newPassword: string;
    },
  ) {
    const { data } =
      await api.patch(
        "/auth/change-password",
        payload,
      );

    return data;
  }
}