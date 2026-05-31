import api from "@/lib/api";

export const MaterialsService = {
  async findAll(
    ticketId: string,
  ) {
    const response =
      await api.get(
        `/tickets/${ticketId}/materials`,
      );

    return response.data;
  },

  async create(
    ticketId: string,
    payload: {
      materialName: string;
      quantity: number;
      unit: string;
      note?: string;
    },
  ) {
    const response =
      await api.post(
        `/tickets/${ticketId}/materials`,
        payload,
      );

    return response.data;
  },

  async remove(id: string) {
    await api.delete(
      `/tickets/materials/${id}`,
    );
  },
};