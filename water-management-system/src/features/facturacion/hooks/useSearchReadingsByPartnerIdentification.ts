import { useMutation } from "@tanstack/react-query";
import { searchReadingsByPartnerIdentification } from "../api/invoiceApi";

export function useSearchReadingsByPartnerIdentification() {
  return useMutation({
    mutationFn: searchReadingsByPartnerIdentification,
  });
}