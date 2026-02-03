'use client'

import ProgressTask from '@/components/dashboard/ProgressTask'
import RoleGate from '@/components/dashboard/RoleGate'
import Tasks from '@/components/dashboard/Tasks'
import ToDoForm from '@/components/dashboard/ToDoForm'
import {SignOutButton, UserButton} from '@clerk/nextjs'
import {Authenticated} from 'convex/react'
import {LogOut} from 'lucide-react'

const DashboardPage = () => {
  return (
    <Authenticated>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-sans p-4 md:p-6 lg:p-8">
        <main className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10 py-8 px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl text-orange-900">
          {/* Sección izquierda - Formulario y controles */}
          <div className="w-full lg:flex-1 flex flex-col gap-6">
            {/* Header con usuario y botones */}
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'w-12 h-12 sm:w-10 sm:h-10',
                      userButtonPopoverCard: 'shadow-xl border border-orange-200',
                      userButtonPopoverActionButton: 'hover:bg-orange-50 text-orange-900',
                    },
                  }}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <RoleGate className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-yellow-600 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base">
                  <div>Admin Dashboard</div>
                </RoleGate>
                <SignOutButton>
                  <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-medium rounded-lg hover:from-orange-700 hover:to-orange-800 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </div>
            <ProgressTask />
            <ToDoForm />
          </div>
          <div className="w-full lg:flex-1">
            <Tasks />
          </div>
        </main>
      </div>
    </Authenticated>
  )
}

export default DashboardPage
