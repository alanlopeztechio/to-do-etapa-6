'use client';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Crown, CheckCircle2, Sparkles } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface PremiumModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PremiumModal({ open, onClose }: PremiumModalProps) {
  const user = useQuery(api.users.getUserByClerkId);

  const premiumFeatures = [
    'Tareas ilimitadas sin restricciones',
    'Prioridad en el soporte técnico',
    'Acceso a funciones avanzadas',
    'Sincronización en múltiples dispositivos',
    'Temas personalizados',
    'Reportes y estadísticas detalladas',
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="max-w-xl border border-orange-200 bg-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-orange-300 bg-gradient-to-r from-orange-500 to-yellow-500 p-2 text-white">
              <Crown size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-orange-600/80">
                ¡Actualiza tu plan!
              </p>
              <DialogTitle className="text-2xl font-bold text-orange-900">
                Desbloquea Premium
              </DialogTitle>
            </div>
          </div>
          <DialogDescription asChild>
            <div className="rounded-xl bg-orange-50 border border-orange-200 p-4 mt-4">
              <p className="text-orange-900 text-sm">
                <span className="font-semibold">
                  Has alcanzado el límite de tareas
                </span>
                <br />
                Actualiza a Premium para disfrutar de tareas ilimitadas y mucho
                más.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <h3 className="text-lg font-semibold text-orange-900 flex items-center gap-2">
            <Sparkles size={20} className="text-orange-500" />
            Funciones Premium
          </h3>
          <ul className="space-y-2">
            {premiumFeatures.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-orange-800"
              >
                <CheckCircle2
                  size={20}
                  className="text-green-500 flex-shrink-0 mt-0.5"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-orange-300 bg-white px-4 py-2 text-sm font-semibold text-orange-900 transition hover:bg-orange-50"
          >
            Cancelar
          </button>
          <form action="/api/stripe/checkout" method="POST">
            <input type="hidden" name="lookup_key" value="Sporifay-a34d140" />
            <input
              type="hidden"
              name="customer_id"
              value={user?.stripeCustomerId}
            />
            <button
              id="checkout-and-portal-button"
              type="submit"
              className="rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-orange-600 hover:to-yellow-600"
            >
              Checkout
            </button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
