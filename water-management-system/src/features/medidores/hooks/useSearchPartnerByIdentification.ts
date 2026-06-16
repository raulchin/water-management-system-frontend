import { useMutation } from '@tanstack/react-query';

import { searchPartnerByIdentification } from '../api/assignmentMeterApi';

export function useSearchPartnerByIdentification() {
  return useMutation({
    mutationFn: searchPartnerByIdentification,
  })
}