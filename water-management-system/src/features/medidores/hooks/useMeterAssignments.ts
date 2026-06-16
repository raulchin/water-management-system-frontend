import { useQuery } from '@tanstack/react-query'
import { getMeterAssignments } from '../api/assignmentMeterApi'

export function useMeterAssignments() {
  return useQuery({
    queryKey: ['meter-assignments'],
    queryFn: getMeterAssignments,
  })
}