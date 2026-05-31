import api from "@/lib/api";

export const DocumentationsService = {
  async findAll(
    ticketId: string,
  ) {
    const response =
      await api.get(
        `/tickets/${ticketId}/documentations`,
      );

    return response.data;
  },

  async create(
    ticketId: string,
    description: string,
  ) {
    const response =
      await api.post(
        `/tickets/${ticketId}/documentations`,
        {
          description,
        },
      );

    return response.data;
  },

  async remove(id: string) {
    await api.delete(
      `/tickets/documentations/${id}`,
    );
  },
};