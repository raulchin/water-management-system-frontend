import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { lecturaSchema, type LecturaFormData } from '../schemas/lecturaSchema'
import { useValidarLectura } from '../hooks/useValidarLectura'

type Props = {
  onSubmit: (data: LecturaFormData) => void
}

export function LecturaForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LecturaFormData>({
    resolver: zodResolver(lecturaSchema),
    defaultValues: {
      socioId: '',
      medidorId: '',
      fecha: '',
      lecturaActual: 0,
      lecturaAnterior: 0,
    },
  })

  const { esConsumoAtipico } = useValidarLectura()
  const lecturaActual = watch('lecturaActual')
  const lecturaAnterior = watch('lecturaAnterior')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded-lg border border-slate-200 p-4">
      <input className="w-full rounded border p-2" placeholder="Socio" {...register('socioId')} />
      <input className="w-full rounded border p-2" placeholder="Medidor" {...register('medidorId')} />
      <input className="w-full rounded border p-2" type="date" {...register('fecha')} />
      <input
        className="w-full rounded border p-2"
        type="number"
        placeholder="Lectura anterior"
        {...register('lecturaAnterior', { valueAsNumber: true })}
      />
      <input
        className="w-full rounded border p-2"
        type="number"
        placeholder="Lectura actual"
        {...register('lecturaActual', { valueAsNumber: true })}
      />
      {errors.lecturaActual && <p className="text-sm text-red-600">{errors.lecturaActual.message}</p>}
      {esConsumoAtipico(Number(lecturaActual), Number(lecturaAnterior)) && (
        <p className="text-sm text-amber-700">Atencion: consumo atipico.</p>
      )}
      <button className="rounded bg-sky-700 px-4 py-2 text-white" type="submit">
        Guardar lectura
      </button>
    </form>
  )
}
