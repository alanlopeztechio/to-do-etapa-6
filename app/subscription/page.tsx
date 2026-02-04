'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const SubscriptionPage = () => {
  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setMessage('Tu suscripción se ha completado correctamente.');
      return;
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        'El proceso de pago fue cancelado. Puedes intentarlo de nuevo cuando quieras.',
      );
      return;
    }

    // Sin parámetros: mostrar un mensaje neutro
    setSuccess(null);
    setMessage('Estado dFe suscripción.');
  }, []);

  const statusIcon = success === true ? (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
      <CheckCircle2 size={28} />
    </div>
  ) : success === false ? (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
      <XCircle size={28} />
    </div>
  ) : null;

  const statusTitle =
    success === true
      ? '¡Gracias por suscribirte!'
      : success === false
        ? 'Pago cancelado'
        : 'Suscripción';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-sans p-4 md:p-6 lg:p-8">
      <main className="w-full max-w-xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl px-6 py-8 sm:px-8 sm:py-10 text-orange-900">
        <div className="flex flex-col items-center gap-4 text-center">
          {statusIcon}

          <h1 className="text-2xl sm:text-3xl font-bold">{statusTitle}</h1>
          <p className="text-sm sm:text-base text-orange-700 max-w-md">{message}</p>

          {success === true && (
            <p className="text-sm sm:text-base text-orange-700">
              Ya puedes disfrutar de las funciones premium en tu panel.
            </p>
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
  );
};

export default SubscriptionPage;

