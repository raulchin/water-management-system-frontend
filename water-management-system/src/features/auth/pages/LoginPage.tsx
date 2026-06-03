import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { AuthIllustrationPanel } from '../components/AuthIllustrationPanel'
import { useLogin } from '../hooks/useLogin'
import { loginSchema, type LoginFormData } from '../schemas/loginSchema'

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

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="h-12 w-full rounded-lg border border-slate-300 bg-slate-100 px-5 text-slate-700 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  {...register('password')}
                />
                {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password.message}</p> : null}
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
