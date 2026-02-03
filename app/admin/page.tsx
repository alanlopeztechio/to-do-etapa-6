import {SignOutButton} from '@clerk/nextjs'
import {clerkClient} from '@clerk/nextjs/server'
import {LogOut, Search, ShieldCheck, Trash2, UserRound} from 'lucide-react'
import {deleteUser, removeRole, setRole} from './_actions'

interface Props {
  searchParams: Promise<{search?: string}>
}

const Page = async ({searchParams}: Props) => {
  const {search} = await searchParams

  const client = await clerkClient()
  const response = await client.users.getUserList({
    query: search,
  })

  const users = response.data
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-orange-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white/90 border border-orange-300 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="flex flex-col gap-6 p-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-orange-600 text-sm font-medium uppercase tracking-[0.2em]">
                <ShieldCheck size={18} />
                Panel de administrador
              </div>
              <h1 className="text-3xl font-semibold text-orange-900">Gestión de usuarios</h1>
              <p className="text-orange-700/80 text-sm">
                Administra roles, busca usuarios y gestiona permisos de manera segura.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {/* <InvitationModal /> */}
              <SignOutButton>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-medium rounded-lg hover:from-orange-700 hover:to-orange-800 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  <LogOut size={18} />
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </header>

          <form method="GET" className="relative">
            <input
              type="text"
              name="search"
              placeholder="Buscar por nombre o correo"
              className="w-full rounded-2xl border border-orange-300 bg-orange-50 px-4 py-3 pl-12 text-sm text-orange-900 placeholder:text-orange-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200/40 outline-none transition"
            />
            <div className="absolute inset-y-0 left-4 flex items-center text-orange-600">
              <Search size={18} />
            </div>
            <div className="absolute inset-y-0 right-2 flex items-center">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-sm hover:shadow transition"
              >
                Buscar
              </button>
            </div>
          </form>

          <div className="grid gap-4 md:grid-cols-2">
            {users.map((user) => {
              const primaryEmail = user.emailAddresses.find(
                (email) => email.id === user.primaryEmailAddressId,
              )?.emailAddress
              const role = (user.publicMetadata.role as string) || 'Sin rol'

              return (
                <div
                  key={user.id}
                  className="rounded-2xl border border-orange-200 bg-orange-50/60 backdrop-blur p-5 shadow-lg space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-lg font-semibold text-orange-900">
                        <UserRound size={20} className="text-orange-600" />
                        <span>
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                      <p className="text-orange-700/80 text-sm">{primaryEmail}</p>
                    </div>
                    <span className="rounded-full bg-orange-500/15 text-orange-700 px-3 py-1 text-xs font-semibold border border-orange-400/30">
                      {role}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <form action={setRole} className="flex items-center gap-3">
                      <input type="hidden" value={user.id} name="id" />
                      <label className="text-sm text-orange-700/80" htmlFor={`role-${user.id}`}>
                        Rol
                      </label>
                      <select
                        id={`role-${user.id}`}
                        name="role"
                        defaultValue={role !== 'Sin rol' ? role : ''}
                        className="flex-1 rounded-xl border border-orange-300 bg-white px-3 py-2 text-sm text-orange-900 placeholder:text-orange-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200/40 outline-none transition"
                      >
                        <option value="admin" className="bg-orange-50 text-orange-900">
                          Admin
                        </option>
                        <option value="normal" className="bg-orange-50 text-orange-900">
                          Usuario Normal
                        </option>
                      </select>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-sm hover:shadow transition"
                      >
                        Guardar
                      </button>
                    </form>
                  </div>
                  <form action={deleteUser}>
                    <input type="hidden" value={user.id} name="id" />
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-300 hover:text-red-800 shadow-sm hover:shadow-md transition-all duration-150">
                      <Trash2 size={16} className="text-red-500" />
                      <span>Eliminar</span>
                    </button>
                  </form>
                </div>
              )
            })}
          </div>
          {/* <UsersList /> */}
        </div>
      </div>
    </div>
  )
}

export default Page
