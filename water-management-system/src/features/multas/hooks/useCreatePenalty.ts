import { useMutation } from "@tanstack/react-query";
import { createPenalty } from "../api/penaltiesApi";

export function useCreatePenalty() {
  return useMutation({
    mutationFn: createPenalty,
  });
}