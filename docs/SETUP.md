# Setup y ejecución local

## Requisitos previos

- Node.js 18+ instalado.
- pnpm o npm.
- Cuenta en:
  - [Sanity](https://www.sanity.io/)
  - [Vercel](https://vercel.com/) (opcional para deploy)
  - [Clerk](https://clerk.com/) para autenticación.
  - [Stripe](https://stripe.com/) para pagos.

## 1. Instalar dependencias

```bash
pnpm install
# o
npm install
```

## 2. Configurar variables de entorno

Usa `.env.local.example` como base:

```bash
cp .env.local.example .env.local
```

Luego edita `.env.local` y completa al menos:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- (Opcional) `SANITY_API_WRITE_TOKEN` si vas a escribir desde funciones.
- `NEXT_PUBLIC_SANITY_PROJECT_TITLE` (cosmético).
- `NEXT_PUBLIC_CONVEX_URL` (desde el panel de Convex).
- `CLERK_FRONTEND_API_URL` (y otros valores de Clerk según su panel).
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

> Revisa también los archivos:
>
> - `convex/auth.config.ts`
> - `components/ConvexClerkProvider.tsx`
> - `lib/stripe.ts`
> - `app/api/stripe/webhook/route.ts`
>   para ver qué variables concretas usa cada integración.

## 3. Configurar Sanity

1. Inicia sesión en Sanity y crea un proyecto (si no existe).
2. Pon `projectId` y `dataset` en `.env.local`.
3. Ejecuta las herramientas de tipo/esquema si lo necesitas:

```bash
npm run typegen
```

## 4. Ejecutar en desarrollo

```bash
npm run dev
# o
pnpm dev
```

- La web se sirve en `http://localhost:3000`.
- El Studio en `http://localhost:3000/studio`.

## 5. Convex en desarrollo

En otra terminal, desde la carpeta del proyecto:

```bash
npx convex dev
```

Asegúrate de que `NEXT_PUBLIC_CONVEX_URL` coincide con la URL que muestra Convex.

## 6. Pruebas de funciones de Sanity

Para probar Sanity Functions localmente:

```bash
npx sanity functions dev --port 3001
# u otros comandos como
npx sanity functions test change-settings
```

## 7. Stripe: checkout y webhooks

- Configura un producto/precio en el dashboard de Stripe y guarda el `lookup_key` que usas en el formulario de checkout.
- Configura un endpoint de webhook en Stripe apuntando a `/api/stripe/webhook` (o vía `ngrok` en local).

## 8. Deploy (resumen)

1. Sube el repo a GitHub.
2. Crea un proyecto en Vercel conectado a ese repo.
3. Copia las variables de entorno de `.env.local` a Vercel.
4. Haz deploy.
