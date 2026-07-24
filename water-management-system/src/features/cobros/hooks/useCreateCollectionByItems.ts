import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCollectionByItems } from "../api/collectionsApi";

export function useCreateCollectionByItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollectionByItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections", "latest"] });
    },
  });
}