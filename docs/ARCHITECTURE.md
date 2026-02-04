# Arquitectura

## Visión general

La aplicación está organizada en tres grandes piezas:

1. **Frontend web (Next.js)**: UI de landing, dashboard de tareas y flujo de suscripción.
2. **CMS (Sanity)**: gestiona contenido de la web personal (home, projects, settings, mensajes de límite, etc.).
3. **Servicios externos**:
   - **Convex** para lógica de tareas / to‑dos.
   - **Clerk** para autenticación de usuarios.
   - **Stripe** para pagos y suscripciones.

## Estructura de carpetas

- `app/`
  - Rutas de la App Router de Next.js.
  - Subcarpetas clave:
    - `(personal)/`: páginas de la web personal (home, projects) conectadas a Sanity.
    - `dashboard/`: UI de tareas vinculada a Convex y Clerk.
    - `subscription/`: página de estado de suscripción (success/canceled) consumiendo datos de Sanity vía store.
    - `studio/`: embed del Sanity Studio.
    - `api/stripe/*`: rutas serverless para checkout y webhooks de Stripe.
- `components/`
  - Componentes UI reutilizables (bloques de la landing, dashboard, modales, etc.).
  - `components/dashboard/PremiumModal.tsx`: modal que muestra `limitMessage` obtenido desde el store.
- `sanity/`
  - `schemas/`: definición de tipos de contenido (home, settings, projects, etc.).
  - `lib/`: cliente y helpers para consultas GROQ.
- `convex/`
  - Esquema, funciones y configuración de autenticación para las tareas.
- `functions/`
  - Sanity Functions (por ejemplo `log-event`, `change-settings`) para reaccionar a eventos de documentos.

## Flujo de datos principal

### Contenido de Sanity → Frontend

1. El `RootLayout` (`app/layout.tsx`) hace `sanityFetch(settingsQuery)` al cargar.
2. Esos datos se pasan a un componente client `SettingsInitializer`, que guarda en un store de Zustand (`SettingsStore`) campos como `limitMessage` y `successMessage`.
3. Cualquier componente client (por ejemplo `PremiumModal` o `subscription/page.tsx`) puede leer esos valores con `useSettingsStore()` sin tener que volver a hacer la consulta.

### Tareas (Convex) y autenticación (Clerk)

1. `ConvexClerkProvider` envuelve la app con los providers de Convex y Clerk.
2. Las páginas del dashboard usan hooks de Convex para leer/escribir tareas, siempre vinculadas al usuario autenticado vía Clerk.

### Suscripción (Stripe)

1. El usuario abre un modal/página que muestra el `limitMessage` cuando llega al límite de tareas.
2. Desde el botón de `Checkout` se envía un `POST` a `/api/stripe/checkout` con `lookup_key` y `customer_id`.
3. El API route crea una sesión de Checkout en Stripe y hace un redirect 303 a la URL de Stripe.
4. Stripe redirige de vuelta a `/subscription?success=true` o `?canceled=true`, y esta página usa el store para mostrar mensajes de éxito personalizados (`successMessage`).

### Sanity Functions

- `functions/change-settings` se dispara cuando se crean/actualizan documentos `settings`.
- El blueprint (`sanity.blueprint.ts`) proyecta campos como `limit` para que estén disponibles en `event.document`.
