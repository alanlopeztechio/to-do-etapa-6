'use client'

import {Doc} from '@/convex/_generated/dataModel'
import {useTodos} from '@/hooks/useTodos'

const TaskItem: React.FC<Doc<'todos'>> = (props: Doc<'todos'>) => {
  const {updateTodo, deleteTodo} = useTodos()
  return (
    <div className="border border-orange-200 rounded-xl flex flex-1 px-10 py-6 space-x-4 items-center bg-white shadow-md hover:shadow-lg transition-all">
      <div className="flex-1 flex flex-row gap-8 items-center">
        <input
          type="checkbox"
          checked={props.isCompleted}
          onChange={async (event) => await updateTodo(props._id, event.currentTarget.checked)}
          className="w-5 h-5 rounded accent-orange-500 cursor-pointer"
        />
        <p className={props.isCompleted ? 'line-through text-orange-500/80' : 'text-orange-900'}>
          {props.text}
        </p>
      </div>
      <button
        className="text-red-600 hover:text-red-700 font-semibold px-3 py-1 rounded-lg hover:bg-red-50 transition-all"
        onClick={async () => await deleteTodo(props._id)}
      >
        Delete
      </button>
    </div>
  )
}

export default TaskItem
