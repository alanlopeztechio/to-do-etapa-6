// por ejemplo: components/SettingsInitializer.tsx
'use client'

import type {SettingsQueryResult} from '@/sanity.types'
import {useSettingsStore} from '@/stores/SettingsStore'
import {useEffect} from 'react'

type LimitMessage = NonNullable<SettingsQueryResult>['limitMessage'] | null

export function SettingsInitializer({limitMessage}: {limitMessage: LimitMessage}) {
  const setLimitMessage = useSettingsStore((s) => s.setLimitMessage)

  useEffect(() => {
    setLimitMessage(limitMessage)
  }, [limitMessage, setLimitMessage])

  return null
}
