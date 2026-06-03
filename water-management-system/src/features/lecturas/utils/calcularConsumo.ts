export function calcularConsumo(lecturaActual: number, lecturaAnterior: number) {
  return Math.max(lecturaActual - lecturaAnterior, 0)
}
