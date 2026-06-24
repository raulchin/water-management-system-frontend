
import { useMutation } from '@tanstack/react-query';
import { searchAssignmentsByPartnerIdentification } from '../api/assignmentMeterApi';

export function useSearchAssignmentsByPartnerIdentification() {
    
  return useMutation({
    mutationFn: searchAssignmentsByPartnerIdentification,
  });

}