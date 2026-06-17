import { apiClient } from "../../../config/apiClient";
import type { BackendMenu, MenusByRoleResponse } from "../types/menu.types";

export async function getMenusByRole(roleId: number): Promise<BackendMenu[]> {
  console.log("RoleId enviado para consultar menus:", roleId);
  console.log("Endpoint menus:", `/roles/${roleId}/menus`);

  const response = await apiClient.get<MenusByRoleResponse>(
    `/roles/${roleId}/menus`,
  );
  console.log("Respuesta completa menus:", response);
  //console.log("JSON response.data menus:", response.data);
  //console.log("Array menus:", response.data.data);
  return response.data.data;
}
