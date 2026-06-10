import { useQuery } from '@tanstack/react-query'
import { obtenerMedidores } from '../api/metersApi'

export function useMedidores() {
  return useQuery({
    queryKey: ['medidores'],
    queryFn: obtenerMedidores,
  })
}