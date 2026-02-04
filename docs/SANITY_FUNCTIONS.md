# Sanity Functions

Este proyecto usa **Sanity Functions** para reaccionar a cambios en documentos de Sanity.

## Blueprint

Las funciones se configuran en `sanity.blueprint.ts`, por ejemplo:

```ts
export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      type: 'sanity.function.document',
      name: 'change-settings',
      src: './functions/change-settings',
      memory: 1,
      event: {
        on: ['create', 'update'],
        filter: "_type == 'settings'",
        projection: '{ limit }',
      },
    }),
  ],
})
```

Puntos clave:

- `on`: lista de eventos de documento que disparan la función (`create`, `update`, `publish`, etc.).
- `filter`: expresión que define para qué documentos se ejecuta.
- `projection`: qué campos se incluyen en `event.document` dentro de la función.

## Estructura de una función

Ejemplo en `functions/change-settings/index.ts`:

```ts
import {documentEventHandler} from '@sanity/functions'

export const handler = documentEventHandler(async ({context, event}) => {
  const time = new Date().toLocaleTimeString()
  console.log(`Function change-settings llamada a las ${time}`)

  const doc = event.document
  const limit = doc?.limit

  console.log('Nuevo límite en settings:', limit)

  // Aquí podrías:
  // - Enviar este valor a otro servicio
  // - Guardar logs adicionales
  // - Aplicar validaciones personalizadas
})
```

## Logs y desarrollo

- Ver logs en local o remoto:

```bash
npx sanity functions logs change-settings
```

- Probar funciones en local:

```bash
npx sanity functions dev --port 3001
# o
npx sanity functions test change-settings
```
