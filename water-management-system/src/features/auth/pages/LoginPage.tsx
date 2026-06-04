import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthIllustrationPanel } from '../components/AuthIllustrationPanel';
import { useLogin } from '../hooks/useLogin';
import { loginSchema, type LoginFormData } from '../schemas/loginSchema';

export function LoginPage() {
  const navigate = useNavigate()
  const { mutateAsync, isPending, isError, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async ({ username, password }: LoginFormData) => {
    await mutateAsync({ username, password })
    navigate('/lecturas', { replace: true })
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-200 p-3 sm:p-6">
      <section className="grid min-h-[620px] w-full max-w-7xl overflow-hidden rounded-xl border border-slate-300 bg-white shadow-lg lg:grid-cols-2">
        <AuthIllustrationPanel />

        <article className="flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md space-y-7">
            <header>
              <h1 className="text-4xl font-bold tracking-tight text-indigo-900">Student Sign in</h1>
              <p className="mt-1 text-sm text-slate-500">Ingresa tu usuario y contrasena para iniciar sesion</p>
            </header>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className="h-12 w-full rounded-lg border border-slate-300 bg-slate-100 px-5 text-slate-700 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  {...register('username')}
                />
                {errors.username ? <p className="mt-1 text-xs text-red-600">{errors.username.message}</p> : null}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="h-12 w-full rounded-lg border border-slate-300 bg-slate-100 px-5 pr-12 text-slate-700 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  {...register('password')}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-700"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {isError ? <p className="text-sm text-red-700">{error instanceof Error ? error.message : 'No se pudo iniciar sesion'}</p> : null}

              <button
                type="submit"
                disabled={isPending}
                className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-indigo-800 text-lg font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <LogIn size={20} />
                {isPending ? 'Validando...' : 'Iniciar sesion'}
              </button>
            </form>

            <p className="text-center text-sm text-slate-600">
              No tienes cuenta?{' '}
              <Link to="/register" className="font-semibold text-indigo-700 hover:text-indigo-600">
                Registrate aqui
              </Link>
            </p>
          </div>
        </article>
      </section>
    </main>
  )
}
