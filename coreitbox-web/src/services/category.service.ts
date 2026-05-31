import api from "@/lib/api";

export const CategoryService = {
  getAll: async () => {
    const res =
      await api.get(
        "/ticket-categories",
      );

    return res.data;
  },

  create: async (
    data: any,
  ) => {
    const res =
      await api.post(
        "/ticket-categories",
        data,
      );

    return res.data;
  },

  update: async (
    id: string,
    data: any,
  ) => {
    const res =
      await api.patch(
        `/ticket-categories/${id}`,
        data,
      );

    return res.data;
  },

  delete: async (
    id: string,
  ) => {
    const res =
      await api.delete(
        `/ticket-categories/${id}`,
      );

    return res.data;
  },
};