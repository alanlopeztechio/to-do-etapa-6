'use client'

import {useTodos} from '@/hooks/useTodos'
import {useTodoStore} from '@/stores/ToDoStore'
import {Filter} from '@/types'
import TaskItem from './TaskItem'

const Tasks = () => {
  const {items} = useTodos()
  const {filter, setFilter} = useTodoStore()

  const filteredTodos = items.filter((item) => {
    if (filter === 'all') return true
    if (filter === 'completed') return item.isCompleted
    if (filter === 'pending') return !item.isCompleted
    return true
  })

  return (
    <div className="w-full space-y-6 text-orange-900">
      <div className="flex-1 flex flex-row justify-between items-center gap-10">
        <div className="flex flex-row justify-between flex-1">
          <h2 className="font-bold text-orange-900 text-lg inline-block">Today's Tasks</h2>
          <p className="text-orange-800 inline-block font-bold">
            <span className="text-orange-600">
              {items.filter((item) => !item.isCompleted).length}
            </span>{' '}
            of {items.length}
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Filter)}
          className="border border-orange-300 bg-white text-orange-900 rounded-xl px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200/40 outline-none transition"
        >
          <option value="all" className="bg-orange-50 text-orange-900">
            All
          </option>
          <option value="completed" className="bg-orange-50 text-orange-900">
            Completed
          </option>
          <option value="pending" className="bg-orange-50 text-orange-900">
            Pending
          </option>
        </select>
      </div>
      <div className="flex flex-col gap-4">
        {filteredTodos.map((item) => (
          <TaskItem key={item._id.toString()} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Tasks
