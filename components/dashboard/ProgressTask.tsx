'use client'

import {useTodos} from '@/hooks/useTodos'
import {ArrowRightCircle, ChevronRightIcon} from 'lucide-react'

const ProgressTask = () => {
  const {items} = useTodos()

  const completedTasks = items.filter((item) => item.isCompleted).length
  const totalTasks = items.length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const radius = 46
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (circumference * progressPercentage) / 100

  return (
    <div className="rounded-2xl border border-orange-200 bg-orange-50/80 backdrop-blur flex flex-row items-center gap-4 px-10 py-6 w-full justify-between shadow-lg">
      <div className="relative flex items-center justify-center w-[20vw] h-[20vw] max-w-[176px] max-h-[176px] min-w-[20px] min-h-[20px]">
        <svg
          width="w-full"
          height="w-full"
          viewBox="0 0 100 100"
          className="transform rotate-[-90deg]"
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="rgba(234, 179, 8, 0.25)"
            strokeWidth={8}
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="#f97316"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{transition: 'stroke-dashoffset 0.5s ease'}}
          />
        </svg>
        <p className="text-orange-700 text-2xl absolute font-semibold">
          {Math.round(progressPercentage)}%
        </p>
      </div>
      <div className="flex flex-col justify-between h-full py-2 gap-8">
        <div className="flex flex-row items-center gap-4">
          <p className="font-bold text-orange-900 text-lg">Weekly Tasks</p>
          <ChevronRightIcon className="text-orange-500" />
        </div>
        <div className="flex flex-row flex-1 items-center gap-8 text-orange-800">
          <p className="flex-1 text-orange-600 font-bold">{`${completedTasks} / ${totalTasks}`}</p>
          <p className="flex-1 text-orange-800 font-bold">{`${totalTasks - completedTasks} / ${totalTasks}`}</p>
        </div>
      </div>
    </div>
  )
}

export default ProgressTask
