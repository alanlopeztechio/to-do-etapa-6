import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Filter } from '@/types/types';

interface TodoUiState {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export const useTodoStore = create<TodoUiState>()(
  persist(
    (set) => ({
      filter: 'all',
      setFilter: (filter: Filter) => set({ filter }),
    }),
    {
      name: 'todo-store',
    },
  ),
);
