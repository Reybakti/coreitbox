import api from "@/lib/api";

export const TicketsService = {
  async findAll() {
    const res =
      await api.get(
        "/tickets",
      );

    return res.data;
  },

  async findOne(
    id: string,
  ) {
    const res =
      await api.get(
        `/tickets/${id}`,
      );

    return res.data;
  },

  async create(
    data: {
      title: string;
      description: string;
      priority: string;
      categoryId: string;
    },
  ) {
    const res =
      await api.post(
        "/tickets",
        data,
      );

    return res.data;
  },
};