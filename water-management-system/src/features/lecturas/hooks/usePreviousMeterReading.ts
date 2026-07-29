
import { useMutation } from "@tanstack/react-query";
import { getPreviousMeterReading } from "../api/meterReadingsApi";

type PreviousMeterReadingInput = {
  meterId: number;
  period: string;
};

export function usePreviousMeterReading() {
  return useMutation({
    mutationFn: ({ meterId, period }: PreviousMeterReadingInput) =>
      getPreviousMeterReading(meterId, period),
  });
}