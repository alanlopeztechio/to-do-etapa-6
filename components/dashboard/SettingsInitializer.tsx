// por ejemplo: components/SettingsInitializer.tsx
'use client'

import type {SettingsQueryResult} from '@/sanity.types'
import {useSettingsStore} from '@/stores/SettingsStore'
import {useEffect} from 'react'

type LimitMessage = NonNullable<SettingsQueryResult> | null

export function SettingsInitializer({limitMessage}: {limitMessage: LimitMessage}) {
  const setDataClient = useSettingsStore((s) => s.setDataClient)

  useEffect(() => {
    setDataClient({
      limitMessage: limitMessage?.limitMessage || null,
      successMessage: limitMessage?.successMessage || null,
    })
  }, [limitMessage, setDataClient])

  return null
}
