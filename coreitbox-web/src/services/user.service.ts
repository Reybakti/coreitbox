import api from "@/lib/api";

export const UserService = {
  async getAll() {
    const { data } =
      await api.get("/users");

    return data;
  },

  async getById(id: string) {
    const { data } =
      await api.get(`/users/${id}`);

    return data;
  },

  async create(payload: any) {
    const { data } =
      await api.post(
        "/users",
        payload,
      );

    return data;
  },

  async update(
    id: string,
    payload: any,
  ) {
    const { data } =
      await api.patch(
        `/users/${id}`,
        payload,
      );

    return data;
  },

  async activate(id: string) {
    const { data } =
      await api.patch(
        `/users/${id}/activate`,
      );

    return data;
  },

  async deactivate(id: string) {
    const { data } =
      await api.patch(
        `/users/${id}/deactivate`,
      );

    return data;
  },

  async resetPassword(
    id: string,
  ) {
    const { data } =
      await api.patch(
        `/users/${id}/reset-password`,
      );

    return data;
  },

  async delete(id: string) {
    const { data } =
      await api.delete(
        `/users/${id}`,
      );

    return data;
  },
};