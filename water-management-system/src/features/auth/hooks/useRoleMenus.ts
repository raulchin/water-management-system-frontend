import { useQuery } from '@tanstack/react-query'
import { getMenusByRole } from '../api/menuApi'

export function useRoleMenus(roleId?: number) {
  return useQuery({
    queryKey: ['role-menus', roleId],
    queryFn: () => getMenusByRole(roleId!),
    enabled: Boolean(roleId),
  })
}