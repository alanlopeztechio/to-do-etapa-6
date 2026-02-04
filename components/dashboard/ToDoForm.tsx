'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Loader2 } from 'lucide-react';
import { useMutation } from 'convex/react';
import { ConvexError } from 'convex/values';
import { TodoFormData, TodoFormSchema } from '@/types/index';
import { api } from '@/convex/_generated/api';
import PremiumModal from '@/components/dashboard/PremiumModal';

const ToDoForm: React.FC = () => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormData>({
    resolver: zodResolver(TodoFormSchema),
    defaultValues: {
      task: ""
    }
  });

  const addTask = useMutation(api.tasks.addTask);

  const onSubmit = async (data: TodoFormData) => {
    try {
    await new Promise(res => setTimeout(res, 1000));
    await addTask({ text: data.task });
  } catch (error) {
    if (error instanceof ConvexError) {
      const message =
        typeof error.data === 'object' &&
        error.data !== null &&
        'message' in error.data
          ? String(error.data.message)
          : error.message;

      if (message.includes('Límite de tareas')) {
        setShowPremiumModal(true);
        
      }
    }

    setError('task', {
      type: 'manual',
      message: 'No se pudo agregar la tarea',
    });
    } finally {
      reset();
  }
};

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex gap-3 items-start"
      >
        <div className="flex-1">
          <input
            type="text"
            placeholder="Nueva tarea..."
            disabled={isSubmitting}
            className="w-full rounded-xl border border-orange-300 bg-white px-4 py-3 text-orange-900 placeholder:text-orange-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200/40 outline-none transition disabled:opacity-60"
            {...register('task')}
          />

          {errors.task && (
            <p className="mt-1 text-sm text-red-600">
              {errors.task.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 p-3 text-white shadow-md transition hover:from-orange-600 hover:to-yellow-600 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Plus size={20} />
          )}
        </button>
      </form>
      {
        showPremiumModal && (
            <PremiumModal onClose={() => setShowPremiumModal(false)} open={showPremiumModal} />
        )
      }
    </>
  );
};

export default ToDoForm;
