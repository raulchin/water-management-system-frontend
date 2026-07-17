
import { useQuery } from "@tanstack/react-query";
import { getLatestCollections } from "../api/collectionsApi";

export function useLatestCollections() {
  return useQuery({
    queryKey: ["collections", "latest"],
    queryFn: getLatestCollections,
  });
}