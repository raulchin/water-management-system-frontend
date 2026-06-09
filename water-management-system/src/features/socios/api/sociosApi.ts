
import { partnerApiClient } from '../../../config/apiClient';
import type { Socio } from "../types/socio.types";
import type { SocioFormData } from '../schemas/socioSchema';


type SociosResponse = {
  codResult: string
  message: string
  data: Socio[]
}

export async function obtenerSocios(): Promise<Socio[]> {

    const response = await partnerApiClient.get<SociosResponse>('/partners')
    console.log('JSON response.data socios:', response.data)
    return response.data.data;

}

export async function crearSocio(data: SocioFormData): Promise<Socio> {

    const payload = {
    taxIdentification: data.cedula,
    names: data.nombres,
    lastName: data.apellidos,
    address: data.direccion,
    phone: data.telefono,
    email: data.correo,
    status: data.estado,
  }
  console.log('Payload registrar socio:', payload)
    
  try {
    const response = await partnerApiClient.post<Socio>('/partners', payload)
    console.log('Respuesta registrar socio:', response.data)
    return response.data
  } catch (error: any) {
    console.error('Error registrar socio:', error.response?.data)
    throw error
  }
}


export async function deleteSocio(idPartner: number): Promise<void> {
  await partnerApiClient.delete(`/partners/${idPartner}`)
}

export async function obtenerSocioPorId(idPartner: number): Promise<Socio> {
  const response = await partnerApiClient.get(`/partners/${idPartner}`)
  return response.data.data
}

export async function actualizarSocio(idPartner: number, data: SocioFormData): Promise<Socio> {
  const payload = {
    taxIdentification: data.cedula,
    names: data.nombres,
    lastName: data.apellidos,
    address: data.direccion,
    phone: data.telefono,
    email: data.correo,
    status: data.estado,
  }

  const response = await partnerApiClient.put(`/partners/${idPartner}`, payload)
  return response.data.data
}