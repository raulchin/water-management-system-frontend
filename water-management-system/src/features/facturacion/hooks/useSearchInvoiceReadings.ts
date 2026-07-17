
import { useMutation } from "@tanstack/react-query";
import { searchReadingsByPeriodAndMeterNumber } from "../api/invoiceApi";

type SearchInvoiceReadingsInput = {
  period: string;
  meterNumber: string;
};

export function useSearchInvoiceReadings() {
  return useMutation({
    mutationFn: ({ period, meterNumber }: SearchInvoiceReadingsInput) =>
      searchReadingsByPeriodAndMeterNumber(period, meterNumber),
  });
}