import { useQuery } from "@tanstack/react-query";
import { getPenalties } from "../api/penaltiesApi";

type UsePenaltiesParams = {
  page: number;
  size: number;
};

export function usePenalties({ page, size }: UsePenaltiesParams) {
  return useQuery({
    queryKey: ["penalties", page, size],
    queryFn: () => getPenalties(page, size),
    placeholderData: (previousData) => previousData,
  });
}