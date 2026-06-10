import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMeter } from '../api/metersApi'

export function useCreateMeter() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMeter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medidores'] })
    },
  })
  
}