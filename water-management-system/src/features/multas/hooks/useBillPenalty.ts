import { useMutation, useQueryClient } from "@tanstack/react-query";
import { billPenalty } from "../api/penaltiesApi";

export function useBillPenalty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: billPenalty,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["penalties"],
      });
    },
  });
}