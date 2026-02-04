'use client'

import {SettingsQueryResult} from '@/sanity.types'
import {useSettingsStore} from '@/stores/SettingsStore'
import {useEffect} from 'react'

type DataClient = {
  limitMessage: NonNullable<SettingsQueryResult>['limitMessage'] | null
  successMessage: NonNullable<SettingsQueryResult>['successMessage'] | null
} | null

interface SettingsInitializerProps {
  dataClient: DataClient
}

export function SettingsInitializer({dataClient}: SettingsInitializerProps) {
  const setDataClient = useSettingsStore((state) => state.setDataClient)
  useEffect(() => {
    setDataClient(dataClient)
  }, [dataClient, setDataClient])

  return null
}
