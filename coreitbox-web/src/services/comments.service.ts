import api from "@/lib/api";

export const CommentsService = {
  async findAll(ticketId: string) {
    const response =
      await api.get(
        `/tickets/${ticketId}/comments`,
      );

    return response.data;
  },

  async create(
    ticketId: string,
    message: string,
  ) {
    const response =
      await api.post(
        `/tickets/${ticketId}/comments`,
        {
          message,
        },
      );

    return response.data;
  },

  async remove(id: string) {
    await api.delete(
      `/tickets/comments/${id}`,
    );
  },
};