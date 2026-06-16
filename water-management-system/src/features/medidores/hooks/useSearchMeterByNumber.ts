import { useMutation } from '@tanstack/react-query';
import { searchMeterByNumber } from '../api/assignmentMeterApi';

export function useSearchMeterByNumber() {
  return useMutation({
    mutationFn: searchMeterByNumber,
  })
}