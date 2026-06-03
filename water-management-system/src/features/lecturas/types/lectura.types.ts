export type Lectura = {
  id: string
  socioId: string
  medidorId: string
  fecha: string
  lecturaActual: number
  lecturaAnterior: number
}

export type CrearLecturaInput = Omit<Lectura, 'id'>
