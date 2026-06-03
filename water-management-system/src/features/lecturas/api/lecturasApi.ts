import type { CrearLecturaInput, Lectura } from '../types/lectura.types'

const mockLecturas: Lectura[] = [
  {
    id: '1',
    socioId: 'SOC-001',
    medidorId: 'MED-1001',
    fecha: '2026-05-01',
    lecturaAnterior: 120,
    lecturaActual: 156,
  },
]

export async function obtenerLecturas() {
  return Promise.resolve(mockLecturas)
}

export async function crearLectura(data: CrearLecturaInput) {
  const nuevaLectura: Lectura = { id: crypto.randomUUID(), ...data }
  mockLecturas.push(nuevaLectura)
  return Promise.resolve(nuevaLectura)
}
