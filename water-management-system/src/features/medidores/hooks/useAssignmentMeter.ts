import { useMutation } from '@tanstack/react-query';
import { assignmentMeter } from '../api/assignmentMeterApi';

export function useAssignmentMeter() {
  return useMutation({
    mutationFn: assignmentMeter,
  })
}