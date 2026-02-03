'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export const useTodos = () => {
  const tasks = useQuery(api.tasks.getTaskList);

  const addTaskMutation = useMutation(api.tasks.addTask);
  const updateTaskMutation = useMutation(api.tasks.updateTask);
  const deleteTaskMutation = useMutation(api.tasks.deleteTask);

  const addTodo = async (text: string) => {
    const response = await addTaskMutation({ text });
    return response;
  };

  const updateTodo = async (id: string, isCompleted: boolean) => {
    try {
      await updateTaskMutation({ id: id as any, isCompleted });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteTaskMutation({ id: id as any });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return {
    items: tasks || [],
    addTodo,
    updateTodo,
    deleteTodo,
  };
};
