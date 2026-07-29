import { useQuery } from '@tanstack/react-query';
import { getMeterReadings } from '../api/meterReadingsApi';

type UseMeterReadingsParams = {
  page: number;
  size: number;
};


export function useMeterReadings( { page, size}:  UseMeterReadingsParams ) {
  return useQuery({
    queryKey: ['meter-readings', page, size],
    queryFn: () => getMeterReadings(page, size),
    placeholderData: (previousData) => previousData,
  })
}