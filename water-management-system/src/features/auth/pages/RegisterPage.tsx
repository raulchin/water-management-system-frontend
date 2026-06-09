import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Eye, EyeOff, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { z } from "zod";

import { registerApi } from "../api/authApi";

const registerSchema = z
  .object({
    username: z.string().min(1, "El usuario es obligatorio"),
    lastName: z.string().min(1, "Los nombres es obligatorio"),
    email: z
      .string()
      .min(1, "El correo es obligatorio")
      .email("Ingresa un correo valido"),
    password: z
      .string()
      .min(6, "La contrasena debe tener al menos 6 caracteres"),
    rol: z.string().min(1, "Seleccione un rol"),
    acceptTerms: z.boolean(),
  })
  .refine((data) => data.acceptTerms, {
    message: "Debes aceptar los terminos y condiciones",
    path: ["acceptTerms"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const inputClass =
  "h-12 w-full rounded-lg border border-slate-300 bg-white px-4 pr-11 text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]";

export function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      lastName: "",
      email: "",
      password: "",
      rol: "",
      acceptTerms: false,
    },
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    console.log("submit ejecutado", data);
    try {
      setServerError(null);

      const registerPayload = {
        username: data.username,
        password: data.password,
        email: data.email,
        nombres: data.lastName,
        rol: data.rol,
      };
      console.log("Trama enviada a registro:", registerPayload);

      await registerApi(registerPayload);

      navigate("/login", { replace: true });
    } catch (error: any) {
      const backendErrors = error.response?.data?.errors;

      const backendMessage = Array.isArray(backendErrors)
        ? backendErrors.map((item) => item.defaultMessage).join(" ")
        : (error.response?.data?.message ?? "No se pudo registrar el usuario");

      setServerError(backendMessage);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-200 p-3 sm:p-6">
      <section className="mx-auto grid min-h-[620px] max-w-7xl overflow-hidden rounded-xl border border-slate-300 bg-white shadow-lg lg:grid-cols-2">
        <article className="relative hidden items-center justify-center overflow-hidden bg-slate-50 p-8 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.14),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(79,70,229,0.12),transparent_45%)]" />
          <img
            src="/auth/register1.png"
            alt="Ilustracion de registro"
            className="relative h-auto max-h-[700px] w-full max-w-2xl object-contain"
          />
        </article>

        <article className="flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-xl space-y-6">
            <header>
              <h1 className="text-center text-5xl font-bold tracking-tight text-indigo-900">
                Crear Cuenta
              </h1>
            </header>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="Ingrese Usuario"
                    className="h-12 w-full rounded-lg border border-slate-300 bg-slate-100 px-5 text-slate-700 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    {...register("username")}
                  />
                  {errors.username ? (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.username.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Ingrese sus nombres"
                    className="h-12 w-full rounded-lg border border-slate-300 bg-slate-100 px-5 text-slate-700 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    {...register("lastName")}
                  />
                  {errors.lastName ? (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.lastName.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Ingrese correo electronico"
                  className="h-12 w-full rounded-lg border border-slate-300 bg-slate-100 px-5 text-slate-700 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="h-12 w-full rounded-lg border border-slate-300 bg-slate-100 px-5 pr-12 text-slate-700 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    {...register("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-700"
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {errors.password ? (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                ) : null}
              </div>

              <div className="relative">
                <select
                  id="rol"
                  className={`${inputClass} appearance-none`}
                  {...register("rol")}
                >
                  <option value="">Seleccione el tipo de socio</option>
                  <option value="admin">Admin</option>
                  <option value="user">Usuario</option>
                  <option value="socio">Socio</option>
                </select>
                {errors.rol ? (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.rol.message}
                  </p>
                ) : null}
                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={21}
                />
              </div>

              <label className="flex items-center gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-400 text-indigo-700 focus:ring-indigo-400"
                  {...register("acceptTerms")}
                />
                <span>
                  I agree to the <span className="text-indigo-700">Terms</span>{" "}
                  and <span className="text-indigo-700">Privacy Policy</span>.
                </span>
              </label>
              {errors.acceptTerms ? (
                <p className="text-xs text-red-600">
                  {errors.acceptTerms.message}
                </p>
              ) : null}

              <div className="grid gap-4 pt-4 sm:grid-cols-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-indigo-800 text-2xl font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <UserPlus size={22} />
                  {isSubmitting ? "Registrando..." : "Sign Up"}
                </button>

                <Link
                  to="/login"
                  className="flex h-14 items-center justify-center rounded-lg border border-indigo-700 text-2xl font-semibold text-indigo-700 transition hover:bg-indigo-50"
                >
                  Sign In
                </Link>
              </div>

              {serverError ? (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {serverError}
                </p>
              ) : null}
            </form>
          </div>
        </article>
      </section>
    </main>
  );
}
