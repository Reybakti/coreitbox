import api from "@/lib/api";

import { Ticket } from "@/types/ticket";

export const TicketsService = {
  async getAll(): Promise<Ticket[]> {
    const response =
      await api.get(
        "/tickets",
      );

    return response.data;
  },

  async create(
    payload: {
      title: string;
      description: string;
      priority: string;
      categoryId: string;
    },
  ) {
    const response =
      await api.post(
        "/tickets",
        payload,
      );

    return response.data;
  },
  async getById(id: string) {
  const response =
    await api.get(
      `/tickets/${id}`,
    );

  return response.data;
}
};