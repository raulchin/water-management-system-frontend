import { useQuery } from '@tanstack/react-query';

import { obtenerSocios } from '../api/sociosApi';

export function useSocios() {
  return useQuery({
    queryKey: ['socios'],
    queryFn: obtenerSocios,
  });
}