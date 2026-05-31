import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  CategoryService,
} from "@/services/category.service";

export function useUpdateCategory() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) =>
      CategoryService.update(
        id,
        data,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "categories",
        ],
      });
    },
  });
}