import api from "@/lib/api";

export const AssignmentService = {
  async findByTicket(
    ticketId: string,
  ) {
    const response =
      await api.get(
        `/tickets/${ticketId}/assignment-requests`,
      );

    return response.data;
  },

  async request(
    ticketId: string,
    note: string,
  ) {
    const response =
      await api.post(
        `/tickets/${ticketId}/request-assignment`,
        {
          note,
        },
      );

    return response.data;
  },

  async approve(
    ticketId: string,
    requestId: string,
  ) {
    const response =
      await api.post(
        `/tickets/${ticketId}/approve-assignment/${requestId}`,
      );

    return response.data;
  },

  async reject(
    ticketId: string,
    requestId: string,
  ) {
    const response =
      await api.post(
        `/tickets/${ticketId}/reject-assignment/${requestId}`,
      );

    return response.data;
  },
};