
import { Gauge } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MeterForm } from '../components/MeterForm';
import { useCreateMeter } from '../hooks/useCreateMeter';
import { MeterFormData } from '../schemas/meterSchema';

export function NewMeterPage(){

    const navigate = useNavigate()
  const { mutateAsync, isPending } = useCreateMeter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (data: MeterFormData) => {
    try {
      setServerError(null)
      setSuccessMessage(null)

      await mutateAsync({
        numeroMedidor: data.numeroMedidor,
        marca: data.marca || undefined,
        modelo: data.modelo || undefined,
        ubicacion: data.ubicacion || undefined,
        direccionReferencia: data.direccionReferencia || undefined,
        fechaInstalacion: data.fechaInstalacion || undefined,
        estado: data.estado,
        observacion: data.observacion || undefined,
      })

      setSuccessMessage('Medidor registrado correctamente.')
    } catch (error: any) {
      const backendMessage =
        error.response?.data?.errors?.[0]?.defaultMessage ??
        error.response?.data?.message ??
        'No se pudo registrar el medidor'

      setServerError(backendMessage)
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 pt-6 sm:px-8">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm">
            <Gauge size={31} strokeWidth={1.8} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#201a57]">
            Registro de nuevo medidor
          </h1>
        </div>
        <div className="mt-5 h-px bg-[#b7a4ff]" />
      </div>

      <div className="px-6 py-6 sm:px-8">
        {isPending ? <p className="mb-4 text-sm font-semibold text-[#5b35d5]">Registrando medidor...</p> : null}

        <MeterForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/medidores')}
          serverError={serverError}
          successMessage={successMessage}
          onClearMessages={() => {
            setServerError(null)
            setSuccessMessage(null)
          }}
        />
      </div>
    </section>
  )

}