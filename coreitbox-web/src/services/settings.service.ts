import api from "@/lib/api";

export class SettingsService {
  static async getAll() {
    const { data } =
      await api.get("/settings");

    return data;
  }

  static async getCompany() {
    return this.getAll();
  }

  static async getSystem() {
    return this.getAll();
  }

  static async getUi() {
    return this.getAll();
  }

  static async create(
    payload: any,
  ) {
    const { data } =
      await api.post(
        "/settings",
        payload,
      );

    return data;
  }

  static async update(
    id: string,
    payload: any,
  ) {
    const { data } =
      await api.patch(
        `/settings/${id}`,
        payload,
      );

    return data;
  }

  static async delete(
    id: string,
  ) {
    const { data } =
      await api.delete(
        `/settings/${id}`,
      );

    return data;
  }
}