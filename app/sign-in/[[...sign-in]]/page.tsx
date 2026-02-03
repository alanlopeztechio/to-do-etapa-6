import {SignIn} from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50 flex items-center justify-center px-4 py-16">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative z-10 p-10 lg:p-12 flex flex-col gap-4 justify-center bg-gradient-to-br from-white/10 to-white/5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-200">Bienvenido de nuevo</p>
            <h1 className="text-3xl font-semibold leading-tight text-white">
              Ingresa para continuar
            </h1>
            <p className="text-sm text-slate-200/80">
              Accede a tu panel para gestionar tareas, progresos y equipo.
            </p>
            <ul className="space-y-2 text-slate-200/80 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Progreso en tiempo real
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Colaboración con tu equipo
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                Estadísticas y reportes claros
              </li>
            </ul>
          </div>

          <div className="relative z-10 bg-white/95 backdrop-blur flex items-center justify-center p-8 lg:p-10">
            <SignIn
              appearance={{
                layout: {
                  socialButtonsPlacement: 'top',
                  socialButtonsVariant: 'blockButton',
                },
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none border border-slate-200 rounded-2xl p-6',
                  headerTitle: 'text-slate-900 text-xl',
                  headerSubtitle: 'text-slate-500 text-sm',
                  socialButtons: 'space-y-2',
                  socialButtonsBlockButton:
                    'border border-slate-200 hover:border-slate-300 text-slate-700',
                  formButtonPrimary:
                    'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md transition-all',
                  formFieldLabel: 'text-slate-600 font-medium',
                  formFieldInput:
                    'border-slate-200 focus:border-emerald-500 focus:ring-emerald-200',
                  footerAction__signIn: 'text-slate-600',
                  footerActionLink: 'text-emerald-700 hover:text-emerald-800 font-semibold',
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
