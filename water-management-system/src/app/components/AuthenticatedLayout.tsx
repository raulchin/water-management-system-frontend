import {
  BarChart3,
  Bell,
  ClipboardList,
  FileText,
  Gauge,
  HelpCircle,
  Home,
  ReceiptText,
  Users,
} from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import logoSigap from "../../assets/logo_sigap_canva_con_fondo.svg";
import { clearAuthToken } from "../../features/auth/utils/authStorage";

import { useAuthSession } from "../../features/auth/hooks/useAuthSession";

import { useState } from "react";

const menuItems = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Socios", to: "/socios", icon: Users },
  { label: "Medidores", to: "/medidores", icon: Gauge },
  { label: "Lecturas", to: "/lecturas", icon: ClipboardList },
  { label: "Facturacion", to: "/facturacion", icon: ReceiptText },
  { label: "Comunidad", to: "/comunidad", icon: Users },
  { label: "Reportes", to: "/reportes", icon: BarChart3 },
];

function getUserInitials(name?: string, username?: string) {
  const value = name || username || "Usuario";

  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function AuthenticatedLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { user } = useAuthSession();

  const activeItem = menuItems.find(({ to }) => pathname.startsWith(to));
  const breadcrumbLabel =
    pathname === "/socios"
      ? "Registro de nuevos socios"
      : pathname === "/lecturas/nueva"
        ? "Registro de nueva lectura"
        : (activeItem?.label ?? "Dashboard");

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    clearAuthToken();
    navigate("/login", { replace: true });
  };

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900 lg:flex">
      <aside className="border-r border-slate-200 bg-white shadow-xl shadow-slate-200/70 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[270px] lg:flex-col">
        <div className="flex h-[104px] items-center bg-gradient-to-r from-[#372080] via-[#43239a] to-[#3a238f] px-8 shadow-[inset_-18px_0_28px_rgba(0,0,0,0.12)]">
          <img
            src={logoSigap}
            alt="SIGAP"
            className="h-[74px] w-auto object-contain"
          />
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 py-5 lg:flex-1 lg:flex-col lg:gap-3 lg:overflow-visible lg:px-5 lg:py-8">
          {menuItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative flex min-w-max items-center gap-4 rounded-xl px-4 py-4 text-base font-semibold transition lg:min-w-0 ${
                  isActive
                    ? "bg-[#efe9ff] text-[#4b2cb1] shadow-sm before:absolute before:left-0 before:top-2 before:h-[calc(100%-1rem)] before:w-1 before:rounded-r-full before:bg-[#5536d4]"
                    : "text-[#34405f] hover:bg-slate-100 hover:text-[#4b2cb1]"
                }`
              }
            >
              <Icon size={25} strokeWidth={1.9} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="hidden px-5 pb-8 lg:block">
          <div className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <img
                src={logoSigap}
                alt="SIGAP"
                className="h-10 w-10 rounded-full object-cover object-left"
              />
            </div>
            <div>
              <p className="font-bold text-[#28208f]">SIGAP</p>
              <p className="text-sm leading-5 text-[#53607d]">
                Gestion transparente, agua para la comunidad.
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 h-[104px] border-b border-white/20 bg-gradient-to-r from-[#3b238e] via-[#4b2cb1] to-[#5634b8] text-white shadow-md">
          <div className="flex h-full items-center justify-between px-5 sm:px-10">
            <h1 className="text-xl font-bold leading-tight tracking-[-0.02em] sm:text-2xl">
              Sistema Integrado de Gestion de Agua Potable (SIGAP)
            </h1>

            <div className="ml-4 flex items-center gap-5">
              <button
                type="button"
                className="relative rounded-full p-2 transition hover:bg-white/10"
                aria-label="Notificaciones"
              >
                <Bell size={25} strokeWidth={1.8} />
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#8f7cff] text-xs font-bold">
                  3
                </span>
              </button>
              <button
                type="button"
                className="rounded-full p-2 transition hover:bg-white/10"
                aria-label="Ayuda"
              >
                <HelpCircle size={29} strokeWidth={1.8} />
              </button>
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen((value) => !value)}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-bold uppercase text-white shadow-sm transition hover:bg-blue-500"
                    aria-label="Ver informacion del usuario"
                  >
                    {getUserInitials(user.nombres, user.username)}
                  </button>

                  {isUserMenuOpen ? (
                    <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-900 shadow-2xl">
                      <div className="bg-slate-950 px-5 py-4 text-white">
                        <div className="flex items-center gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold uppercase text-white">
                            {getUserInitials(user.nombres, user.username)}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-lg font-bold">
                              {user.nombres}
                            </p>
                            <p className="truncate text-sm text-white/80">
                              {user.email}
                            </p>
                            <p className="text-xs text-blue-300">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 px-5 py-4 text-sm">
                        <p>
                          <span className="font-semibold">Usuario:</span>{" "}
                          {user.username}
                        </p>
                        <p>
                          <span className="font-semibold">Email:</span>{" "}
                          {user.email}
                        </p>
                        <p>
                          <span className="font-semibold">Roles:</span>{" "}
                          {user.roles?.join(", ") || "Sin rol"}
                        </p>
                      </div>

                      <div className="border-t border-slate-200 px-5 py-4">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                          Cerrar sesion
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <div className="border-b border-slate-200 bg-white px-5 py-5 shadow-sm sm:px-10">
          <div className="flex items-center gap-4 text-lg font-semibold text-[#6c748d]">
            <Home size={22} strokeWidth={1.8} />
            <span>/</span>
            <span>{activeItem?.label ?? "Dashboard"}</span>
            <span>/</span>
            <span className="text-[#4b2cb1]">{breadcrumbLabel}</span>
          </div>
        </div>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function ModulePlaceholder({ title }: { title: string }) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="flex max-w-xl items-start gap-4">
        <div className="rounded-2xl bg-[#efe9ff] p-4 text-[#4b2cb1]">
          <FileText size={28} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#4b2cb1]">
            SIGAP
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">{title}</h2>
          <p className="mt-2 text-slate-600">
            Este modulo ya usa el dashboard autenticado y queda listo para
            agregar su contenido.
          </p>
        </div>
      </div>
    </section>
  );
}
