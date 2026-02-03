import {LinkExternal, LinkInternal} from '@/sanity.types'
import type {PortableTextBlock} from 'next-sanity'
import type {Image} from 'sanity'
import * as z from 'zod'

export interface MilestoneItem {
  _key: string
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _id: string
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

export interface ButtonItem {
  _key: string
  linkType: 'internal' | 'external'
  linkInternal?: LinkInternal
  linkExternal?: LinkExternal
  is_primary: boolean
}

export interface MenuItem {
  _key: string
  _type: 'home' | 'page' | 'project'
  slug: string | null
  title: string | null
}

export interface TodoItem {
  id: string
  text: string
  isCompleted: boolean
}

export type Filter = 'all' | 'completed' | 'pending'

export interface ToDoProviderProps {
  children: React.ReactNode
}

export type TodoState = TodoItem[]

export interface TodoContextType {
  items: TodoItem[]
  addTodoItem: (item: string) => void
  onUpdate: (id: string, isCompleted: boolean) => void
  onDelete: (id: string) => void
}

export type TodoAction =
  | {type: 'ADD_TODO'; payload: string}
  | {type: 'TOGGLE_TODO'; payload: string}
  | {type: 'DELETE_TODO'; payload: string}
  | {type: 'UPDATE_TODO'; payload: {id: string; isCompleted: boolean}}
  | {type: 'LOAD_TODOS'; payload: TodoItem[]}

export const TodoFormSchema = z.object({
  text: z.string().min(10, 'La tarea debe de tener mínimo 10 caracteres'),
})

export type TodoFormData = z.infer<typeof TodoFormSchema>
