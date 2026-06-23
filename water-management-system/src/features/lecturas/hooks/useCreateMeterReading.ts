
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMeterReading } from '../api/meterReadingsApi'

export function useCreateMeterReading() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMeterReading,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meter-readings'] })
    },
  })
}