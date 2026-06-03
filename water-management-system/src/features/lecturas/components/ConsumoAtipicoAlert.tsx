type Props = {
  visible: boolean
}

export function ConsumoAtipicoAlert({ visible }: Props) {
  if (!visible) return null

  return (
    <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
      Consumo atipico detectado. Verifica la lectura antes de guardar.
    </div>
  )
}
