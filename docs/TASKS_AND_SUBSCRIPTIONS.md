# Tareas (Convex) y Suscripciones (Stripe)

## Tareas con Convex

- El módulo de tareas vive principalmente en:
  - `convex/schema.ts`, `convex/tasks.ts`, `convex/users.ts`.
  - Componentes de UI en `components/dashboard/*`.
- `ConvexClerkProvider` (en `components/ConvexClerkProvider.tsx`) conecta React con Convex y Clerk.

Flujo típico:

1. Usuario inicia sesión con Clerk.
2. El dashboard llama funciones de Convex (vía `useQuery` / `useMutation`) para leer/escribir tareas.
3. Convex garantiza sincronización en tiempo real entre clientes.

## Límite de tareas y mensajes

- El documento `settings` en Sanity tiene campos como `limitMessage` y `successMessage`.
- Estos se cargan una vez en el `RootLayout` y se guardan en un store global (Zustand) mediante `SettingsInitializer`.
- Componentes de cliente como `PremiumModal` usan `useSettingsStore()` para mostrar mensajes personalizados cuando el usuario alcanza el límite.

## Suscripciones con Stripe

### Checkout

1. El usuario hace clic en un botón que envía un `POST` a `/api/stripe/checkout` con:
   - `lookup_key`: clave del precio de Stripe.
   - `customer_id`: id del cliente de Stripe asociado al usuario.
2. El API route (`app/api/stripe/checkout/route.ts`):
   - Valida que el usuario está autenticado (Clerk).
   - Obtiene el precio desde Stripe usando `lookup_key`.
   - Crea una sesión de Checkout y hace `NextResponse.redirect(session.url, 303)`.

### Webhook

- `app/api/stripe/webhook/route.ts` procesa eventos entrantes de Stripe:
  - Valida la firma con `STRIPE_WEBHOOK_SECRET`.
  - Según el tipo de evento, actualiza el estado de suscripción del usuario (normalmente vía Convex o Sanity).

### Página de estado de suscripción

- La ruta `app/subscription/page.tsx`:
  - Lee `success` / `canceled` desde el query string.
  - Usa `useSettingsStore()` para obtener `successMessage` desde Sanity.
  - Renderiza un mensaje de confirmación o cancelación para el usuario.

Este documento sirve como guía rápida de cómo se relacionan tareas, límites y suscripciones dentro del proyecto.
