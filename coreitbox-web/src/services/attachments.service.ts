import api from "@/lib/api";

export const AttachmentsService = {
  async findAll(ticketId: string) {
    const response =
      await api.get(
        `/tickets/${ticketId}/attachments`,
      );

    return response.data;
  },

  async upload(
    ticketId: string,
    file: File,
  ) {
    const formData =
      new FormData();

    formData.append(
      "file",
      file,
    );

    const response =
      await api.post(
        `/tickets/${ticketId}/attachments`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        },
      );

    return response.data;
  },

  async getUrl(id: string) {
    const response =
      await api.get(
        `/attachments/${id}/url`,
      );

    return response.data;
  },

  async remove(id: string) {
    await api.delete(
      `/attachments/${id}`,
    );
  },
};