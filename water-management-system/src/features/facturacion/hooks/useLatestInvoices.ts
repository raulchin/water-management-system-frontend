
import { useQuery } from "@tanstack/react-query";
import { getLatestInvoices } from "../api/invoiceApi";

export function useLatestInvoices() {
  return useQuery({
    queryKey: ["invoices", "latest"],
    queryFn: getLatestInvoices,
  });
}