'use client'

import {SettingsQueryResult} from '@/sanity.types'
import {useSettingsStore} from '@/stores/SettingsStore'
import {CheckCircle2, XCircle} from 'lucide-react'
import {PortableText, PortableTextReactComponents} from 'next-sanity'
import Link from 'next/link'
import {useEffect, useState} from 'react'

const SubscriptionPage = () => {
  const dataClient = useSettingsStore((state) => state.dataClient)

  const myComponents: Partial<PortableTextReactComponents> = {
    block: {
      h1: ({children}) => (
        <h1 className="text-5xl tracking-tight font-bold text-foreground sm:text-6xl lg:text-6xl text-balance leading-[1.4] sm:leading-[1.3] lg:leading-[1.5] mb-4">
          {children}
        </h1>
      ),
      h2: ({children}) => <h2 className="text-3xl font-semibold text-black">{children}</h2>,
      h3: ({children}) => <h3 className="text-2xl font-semibold text-black">{children}</h3>,
      h4: ({children}) => <h4 className="text-xl font-semibold text-black">{children}</h4>,
      h5: ({children}) => <h5 className="text-xl font-semibold text-black">{children}</h5>,
      h6: ({children}) => <h6 className="text-xl font-semibold text-black">{children}</h6>,
      normal: ({children}) => <p className="max-w-2xl mx-auto text-black">{children}</p>,
    },
    marks: {
      text_primary: ({children}) => (
        <span className="text-transparent  bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
          {children}
        </span>
      ),
      text_secondary: ({children}) => (
        <span className="font-light mx-auto max-w-2xl text-md text-muted-foreground text-pretty text-orange-700 ">
          {children}
        </span>
      ),
    },
  }

  const [success, setSuccess] = useState<boolean | null>(null)
  const [message, setMessage] = useState<NonNullable<SettingsQueryResult>['successMessage'] | null>(
    null,
  )

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)

    if (query.get('success')) {
      setSuccess(true)
      setMessage(dataClient?.successMessage || null)
      return
    }

    if (query.get('canceled')) {
      setSuccess(false)
      return
    }

    setSuccess(null)
    setMessage(null)
  }, [dataClient])

  const statusIcon =
    success === true ? (
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
        <CheckCircle2 size={28} />
      </div>
    ) : success === false ? (
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
        <XCircle size={28} />
      </div>
    ) : null

  const statusTitle =
    success === true
      ? '¡Gracias por suscribirte!'
      : success === false
        ? 'Pago cancelado'
        : 'Suscripción'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-sans p-4 md:p-6 lg:p-8">
      <main className="w-full max-w-xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl px-6 py-8 sm:px-8 sm:py-10 text-orange-900">
        <div className="flex flex-col items-center gap-4 text-center">
          {statusIcon}
          {success === true && message && (
            <PortableText value={message?.titulo!} components={myComponents} />
          )}
          {success === false && (
            <p className="text-sm sm:text-base text-orange-700">
              Si lo deseas, puedes volver a intentarlo más tarde.
            </p>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-5 py-2.5 text-sm sm:text-base font-semibold text-white shadow-md transition hover:from-orange-600 hover:to-yellow-600 hover:shadow-lg"
            >
              Ir a tu dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SubscriptionPage
