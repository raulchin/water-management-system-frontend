import { useMutation } from "@tanstack/react-query";
import { createInvoice } from "../api/invoiceApi";

export function useCreateInvoice() {
  return useMutation({
    mutationFn: createInvoice,
  });
}