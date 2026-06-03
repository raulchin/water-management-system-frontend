import { useNavigate } from 'react-router-dom'
import { ConsumoAtipicoAlert } from '../components/ConsumoAtipicoAlert'
import { LecturaForm } from '../components/LecturaForm'
import { useCrearLectura } from '../hooks/useCrearLectura'
import { useValidarLectura } from '../hooks/useValidarLectura'
import type { LecturaFormData } from '../schemas/lecturaSchema'

export function NuevaLecturaPage() {
  const navigate = useNavigate()
  const crearLectura = useCrearLectura()
  const { esConsumoAtipico } = useValidarLectura()

  const handleSubmit = async (data: LecturaFormData) => {
    await crearLectura.mutateAsync(data)
    navigate('/lecturas')
  }

  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-[#4b2cb1]">Lecturas</p>
        <h1 className="text-2xl font-bold text-slate-900">Registrar nueva lectura</h1>
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <ConsumoAtipicoAlert visible={esConsumoAtipico(120, 0)} />
        <LecturaForm onSubmit={handleSubmit} />
      </div>
    </section>
  )
}
