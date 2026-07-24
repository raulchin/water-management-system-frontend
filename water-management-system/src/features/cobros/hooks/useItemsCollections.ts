
import { useQuery } from "@tanstack/react-query";
import { getItemsCollections } from "../api/collectionsApi";

export function useItemsCollections() {
  return useQuery({
    queryKey: ["collections", "items"],
    queryFn: getItemsCollections,
  });
}