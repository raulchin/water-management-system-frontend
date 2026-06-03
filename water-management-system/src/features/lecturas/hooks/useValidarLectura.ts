import { calcularConsumo } from '../utils/calcularConsumo'

export function useValidarLectura() {
  const esConsumoAtipico = (lecturaActual: number, lecturaAnterior: number) => {
    const consumo = calcularConsumo(lecturaActual, lecturaAnterior)
    return consumo > 100
  }

  return { esConsumoAtipico }
}
