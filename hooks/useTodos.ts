'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {type  Id } from '@/convex/_generated/dataModel';

export const useTodos = () => {
  const tasks = useQuery(api.tasks.getTaskList);

  const addTaskMutation = useMutation(api.tasks.addTask);
  const updateTaskMutation = useMutation(api.tasks.updateTask);
  const deleteTaskMutation = useMutation(api.tasks.deleteTask);

  const addTodo = async (text: string) => {
    const response = await addTaskMutation({ text });
    return response;
  };

  const updateTodo = async (id: Id<"todos">, isCompleted: boolean) => {
    try {
      await updateTaskMutation({ id , isCompleted });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTodo = async (id: Id<"todos">) => {
    try {
      await deleteTaskMutation({ id });
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
