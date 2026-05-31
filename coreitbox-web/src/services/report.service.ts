import api from "@/lib/api";

export class ReportService {
  static async getSummary() {
    const { data } =
      await api.get(
        "/reports/tickets/summary",
      );

    return data;
  }

  static async getPriority() {
    const { data } =
      await api.get(
        "/reports/tickets/priority",
      );

    return data;
  }

  static async getCategory() {
    const { data } =
      await api.get(
        "/reports/tickets/category",
      );

    return data;
  }

  static async getTechnicians() {
    const { data } =
      await api.get(
        "/reports/technicians",
      );

    return data;
  }

  static async getAuditSummary() {
    const { data } =
      await api.get(
        "/reports/audit-summary",
      );

    return data;
  }
}