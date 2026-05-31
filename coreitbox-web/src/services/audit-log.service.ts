import api from "@/lib/api";

export class AuditLogService {
  static async getAll() {
    const { data } =
      await api.get(
        "/audit-logs",
      );

    return data;
  }

  static async getByModule(
    module: string,
  ) {
    const { data } =
      await api.get(
        `/audit-logs/module/${module}`,
      );

    return data;
  }
}