import { UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SocioForm } from '../components/SocioForm'
import type { SocioFormData } from '../schemas/socioSchema'

export function SociosPage() {
  const navigate = useNavigate()

  const handleSubmit = (data: SocioFormData) => {
    void data
    // La conexion con API se agrega aqui cuando el backend de socios este disponible.
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 pt-6 sm:px-8">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm">
            <UserPlus size={31} strokeWidth={1.8} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#201a57]">Registro de nuevos socios</h1>
        </div>
        <div className="mt-5 h-px bg-[#b7a4ff]" />
      </div>

      <div className="px-6 py-6 sm:px-8">
        <SocioForm onSubmit={handleSubmit} onCancel={() => navigate('/dashboard')} />
      </div>
    </section>
  )
}
