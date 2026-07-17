
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBatchCollection } from "../api/collectionsApi";

export function useCreateBatchCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBatchCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections", "latest"] });
    },
  });
}