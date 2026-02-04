# Learnings / Notas del proyecto

## Integrar muchas piezas sin romper el App Router

- Los Server Components no pueden usar hooks de cliente (por ejemplo, `useSettingsStore`).
- Para compartir datos de Sanity en todo el árbol de React, se usa un patrón de **Server Component + Client Initializer + Zustand**:
  - El `RootLayout` hace la consulta a Sanity.
  - Pasa los datos a un componente client (`SettingsInitializer`).
  - Ese componente inicializa un store global (Zustand), que luego leen componentes como `PremiumModal` y `subscription/page.tsx`.

## Stripe + Next.js App Router

- Las rutas `app/api/stripe/*` son Server Routes modernas.
- `NextResponse.redirect(url, 303)` después de crear la sesión de checkout es la forma recomendada de redirigir a Stripe tras un `POST`.

## Sanity Functions

- El blueprint (`sanity.blueprint.ts`) define **qué eventos** disparan las funciones y **qué campos** se proyectan.
- Dentro de la función (por ejemplo `functions/change-settings`), el valor proyectado se lee desde `event.document`.

## Buenas prácticas observadas

- Separar claramente:
  - UI (Next.js + componentes en `components/`)
  - Contenido (Sanity, en `sanity/`)
  - Lógica de negocio de tareas (Convex, en `convex/`)
  - Pagos (Stripe, en `app/api/stripe/*` y `lib/stripe.ts`).
- Usar TypeScript en todas las capas para minimizar errores al cambiar esquemas o contratos.
