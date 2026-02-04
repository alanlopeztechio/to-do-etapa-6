import { useState } from 'react';
import { Doc } from '@/convex/_generated/dataModel';
import { useTodos } from '@/hooks/useTodos';

const TaskItem: React.FC<Doc<'todos'>> = (props) => {
  const { updateTodo, deleteTodo } = useTodos();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await deleteTodo(props._id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggle = async (checked: boolean) => {
    await updateTodo(props._id, checked);
  };

  return (
    <div className="border border-orange-200 rounded-xl flex flex-1 px-10 py-6 space-x-4 items-center bg-white shadow-md hover:shadow-lg transition-all">
      <div className="flex-1 flex flex-row gap-8 items-center">
        <input
          type="checkbox"
          checked={props.isCompleted}
          onChange={(e) => handleToggle(e.currentTarget.checked)}
          disabled={isDeleting}
          className="w-5 h-5 rounded accent-orange-500 cursor-pointer disabled:opacity-50"
        />
        <p className={props.isCompleted ? 'line-through text-orange-500/80' : 'text-orange-900'}>
          {props.text}
        </p>
      </div>

      <button
        disabled={isDeleting}
        onClick={handleDelete}
        className="text-red-600 hover:text-red-700 font-semibold px-3 py-1 rounded-lg hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isDeleting ? 'Deleting…' : 'Delete'}
      </button>
    </div>
  );
};

export default TaskItem;
