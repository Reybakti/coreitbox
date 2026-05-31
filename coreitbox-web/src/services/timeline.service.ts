import api from "@/lib/api";

export const TimelineService = {
  async findAll(
    ticketId: string,
  ) {
    const response =
      await api.get(
        `/tickets/${ticketId}/timeline`,
      );

    return response.data;
  },
};