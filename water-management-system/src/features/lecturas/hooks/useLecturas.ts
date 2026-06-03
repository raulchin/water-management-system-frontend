import { useQuery } from '@tanstack/react-query'
import { obtenerLecturas } from '../api/lecturasApi'

export function useLecturas() {
  return useQuery({ queryKey: ['lecturas'], queryFn: obtenerLecturas })
}
