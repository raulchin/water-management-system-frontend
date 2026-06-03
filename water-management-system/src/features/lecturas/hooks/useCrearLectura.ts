import { useMutation, useQueryClient } from '@tanstack/react-query'
import { crearLectura } from '../api/lecturasApi'

export function useCrearLectura() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: crearLectura,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lecturas'] })
    },
  })
}
