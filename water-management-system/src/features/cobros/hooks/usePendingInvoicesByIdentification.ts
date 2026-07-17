
import { useMutation } from "@tanstack/react-query";
import { getPendingInvoicesByIdentification } from "../api/collectionsApi";

export function usePendingInvoicesByIdentification() {
  return useMutation({
    mutationFn: getPendingInvoicesByIdentification,
  });
}