import{Bell, ChevronDown, HelpCircle, LogOut, UserCircle} from 'lucide-react'

import { Link, useNavigate } from 'react-router-dom'
import logoSigap from '../../assets/logo_sigap_canva_con_fondo.svg'
import { useAuthSession } from '../../features/auth/hooks/useAuthSession'
import { clearAuthToken } from '../../features/auth/utils/authStorage'

export function AppNavbar() {

  const navigate = useNavigate()
  const { isAuthenticated } = useAuthSession()

  const handleLogout = () => {
    clearAuthToken()
    navigate('/login', { replace: true })
  }
  return(

    <header className="sticky top-0 z-50 h-20 w-full bg-gradient-to-r from-[#2f1b78] via-[#43239a] to-[#4f2bb2] text-white shadow-md">
      <nav className="flex h-full w-full items-center">
        {/* Logo */}
        <Link
          to={isAuthenticated ? '/lecturas' : '/login'}
          className="flex h-full w-[210px] items-center bg-[#2d1a73] px-6 transition hover:bg-[#352083]"
        >
          <img
            src={logoSigap}
            alt="SIGAP"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Título */}
        <div className="flex h-full flex-1 items-center justify-between px-6">
          <h1 className="hidden text-sm font-semibold tracking-wide text-white md:block">
            Sistema Integrado de Gestión de Agua Potable (SIGAP)
          </h1>

          {/* Acciones derecha */}
          <div className="ml-auto flex items-center gap-5">
            {/* Notificaciones */}
            <button
              type="button"
              className="relative rounded-full p-2 transition hover:bg-white/10"
              aria-label="Notificaciones"
            >
              <Bell size={20} strokeWidth={1.8} />

              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#8f7cff] text-[10px] font-bold text-white">
                3
              </span>
            </button>
            {/* Ayuda */}
            <button
              type="button"
              className="rounded-full p-2 transition hover:bg-white/10"
              aria-label="Ayuda"
            >
              <HelpCircle size={20} strokeWidth={1.8} />
            </button>

            {/* Usuario */}

            <div className="flex items-center gap-2">
              <UserCircle size={32} fill="white" className="text-white" />

              <span className="hidden text-sm font-medium sm:inline">
                Administrador
              </span>

              <ChevronDown size={16} strokeWidth={2} />
            </div>
            {/* Cerrar sesión */}
             <button
              type="button"
              onClick={handleLogout}
              disabled={!isAuthenticated}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut size={18} />
              <span className="hidden lg:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>

      </nav>
    </header>

  )

}
