import {SettingsQueryResult} from '@/sanity.types'
import {create} from 'zustand'

type DataClient = {
  limitMessage: NonNullable<SettingsQueryResult>['limitMessage'] | null
  successMessage: NonNullable<SettingsQueryResult>['successMessage'] | null
} | null

interface InfoSettingsState {
  dataClient: DataClient
  setDataClient: (data: DataClient) => void
}

export const useSettingsStore = create<InfoSettingsState>((set) => ({
  dataClient: null,
  setDataClient: (data) => set({dataClient: data}),
}))
