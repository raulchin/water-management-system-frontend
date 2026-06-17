export type BackendMenu = {
  menuId: number
  name: string
  description: string
  path: string
  icon: string
  code: string
  parentId: number | null
  displayOrder: number
  active: boolean
  children: BackendMenu[]
}

export type MenusByRoleResponse = {
  codResult: string
  message: string
  data: BackendMenu[]
}