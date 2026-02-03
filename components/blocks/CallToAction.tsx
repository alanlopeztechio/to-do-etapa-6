import Link from 'next/link'

interface CallToActionProps {
  titulo: string
  subtitulo: string
  beneficios: BenefitItem[]
}

interface BenefitItem {
  beneficio: string
}

export default function CallToAction({titulo, subtitulo, beneficios}: CallToActionProps) {
  return (
    <section className="relative overflow-hidden py-24 w-screen -mx-4 md:-mx-16 lg:-mx-32 px-4 md:px-16 lg:px-32">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, var(--card-glow) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-40"
        style={{background: 'var(--btn-primary)'}}
      />
      <div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{background: 'var(--btn-primary-hover)'}}
      />

      <div className="container relative mx-auto px-4 text-center">
        <div
          className="inline-block mb-6 px-4 py-2 rounded-full text-sm font-medium"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            color: 'var(--btn-primary)',
          }}
        >
          ✨ Comienza tu viaje hoy
        </div>

        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{color: 'var(--foreground)'}}
        >
          {titulo}
        </h2>

        <p
          className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed opacity-80"
          style={{color: 'var(--foreground)'}}
        >
          {subtitulo}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Link
            href="/sign-in"
            className="group relative px-10 py-4 text-xl font-semibold rounded-[16px] overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, var(--btn-primary), var(--btn-primary-hover))',
              color: 'var(--btn-text)',
              boxShadow: '0 10px 40px var(--card-shadow-hover)',
            }}
          >
            {/* Efecto de brillo */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center gap-2">
              Comenzar Ahora - Es Gratis
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Link>

          <Link
            href="#features"
            className="px-10 py-4 text-xl font-semibold rounded-[16px] transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'transparent',
              color: 'var(--foreground)',
              border: '2px solid var(--card-border-hover)',
            }}
          >
            Saber más
          </Link>
        </div>

        {/* Trust badges */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm opacity-60"
          style={{color: 'var(--foreground)'}}
        >
          {beneficios?.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {item.beneficio}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
