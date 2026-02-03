'use client'

import {api} from '@/convex/_generated/api'
import {TodoFormData, TodoFormSchema} from '@/types/index'
import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation} from 'convex/react'
import {ConvexError} from 'convex/values'
import {Plus} from 'lucide-react'
import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import PremiumModal from './PremiumModal'

const ToDoForm: React.FC = () => {
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: {errors},
  } = useForm<TodoFormData>({
    resolver: zodResolver(TodoFormSchema),
  })

  const addTaskMutation = useMutation(api.tasks.addTask)

  const onSubmit = async (data: TodoFormData) => {
    try {
      await addTaskMutation(data)
      reset()
    } catch (error: any) {
      console.log('Error capturado:', error)

      if (error instanceof ConvexError) {
        const errorData = error.data
        const message =
          typeof errorData === 'object' && errorData !== null && 'message' in errorData
            ? errorData.message
            : error.message

        console.log('Mensaje del error:', message)

        if (message && message.includes('Límite de tareas alcanzado')) {
          setShowPremiumModal(true)
        } else {
          setError('text', {
            type: 'server',
            message: message || 'Ocurrió un error',
          })
        }
      }
    }
  }

  return (
    <>
      <div className="w-full flex flex-col rounded-2xl gap-2 text-orange-900">
        <form className="w-full flex gap-4 items-start" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1 flex flex-col">
            <input
              type="text"
              placeholder="Nueva tarea..."
              className="w-full rounded-xl border border-orange-300 bg-white px-4 py-3 text-orange-900 placeholder:text-orange-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200/40 outline-none transition"
              {...register('text')}
            />

            {errors.text && <p className="text-red-600 text-sm mt-1">{errors.text.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 rounded-xl p-3 shadow-md hover:shadow-lg transition-all text-white"
          >
            <Plus color="white" size={20} />
          </button>
        </form>
      </div>

      <PremiumModal open={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </>
  )
}

export default ToDoForm
