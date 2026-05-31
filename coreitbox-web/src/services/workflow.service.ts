import api from "@/lib/api";

export const WorkflowService = {
  requestAssignment(
    ticketId: string,
    note: string,
  ) {
    return api.post(
      `/tickets/${ticketId}/request-assignment`,
      { note },
    );
  },

  approveAssignment(
    ticketId: string,
    requestId: string,
  ) {
    return api.post(
      `/tickets/${ticketId}/approve-assignment/${requestId}`,
    );
  },

  rejectAssignment(
    ticketId: string,
    requestId: string,
  ) {
    return api.post(
      `/tickets/${ticketId}/reject-assignment/${requestId}`,
    );
  },

  start(
    ticketId: string,
  ) {
    return api.post(
      `/tickets/${ticketId}/start`,
    );
  },

  resolve(
    ticketId: string,
  ) {
    return api.post(
      `/tickets/${ticketId}/resolve`,
    );
  },

  close(
    ticketId: string,
  ) {
    return api.post(
      `/tickets/${ticketId}/close`,
    );
  },
};