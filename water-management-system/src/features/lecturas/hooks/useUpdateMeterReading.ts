
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeterReading } from "../api/meterReadingsApi";
import type { UpdateMeterReadingInput } from "../types/meterReading.types";

type UpdateMeterReadingParams = {
  readingId: number;
  data: UpdateMeterReadingInput;
};

export function useUpdateMeterReading() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ readingId, data }: UpdateMeterReadingParams) =>
      updateMeterReading(readingId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meter-readings"] });
    },
  });
  
}