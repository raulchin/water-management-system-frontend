export function AuthIllustrationPanel() {
  return (
    <section className="relative hidden min-h-[620px] overflow-hidden bg-indigo-900 lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(129,140,248,0.30),transparent_60%)]" />
      <div className="relative flex h-full items-center justify-center p-8">
        <img
          src="/auth/login1.png"
          alt="Ilustracion de acceso"
          className="h-auto max-h-[700px] w-full max-w-2xl object-contain"
        />
      </div>
    </section>
  )
}
