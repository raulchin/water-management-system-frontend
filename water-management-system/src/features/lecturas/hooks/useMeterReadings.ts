import { useQuery } from '@tanstack/react-query'
import { getMeterReadings } from '../api/meterReadingsApi'

export function useMeterReadings() {
  return useQuery({
    queryKey: ['meter-readings'],
    queryFn: getMeterReadings,
  })
}