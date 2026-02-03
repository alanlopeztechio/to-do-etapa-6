'use server'

import {checkRole} from '@/utils/roles'
import {auth, clerkClient} from '@clerk/nextjs/server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'

export async function setRole(formData: FormData) {
  const client = await clerkClient()

  if (!(await checkRole('admin'))) {
    return
  }
  try {
    await client.users.updateUserMetadata(formData.get('id') as string, {
      publicMetadata: {role: formData.get('role')},
    })
    revalidatePath('/admin')
  } catch (err) {
    console.error(err)
  }
  redirect('/admin')
}

export async function removeRole(formData: FormData) {
  const client = await clerkClient()

  if (!(await checkRole('admin'))) {
    return
  }
  try {
    await client.users.updateUserMetadata(formData.get('id') as string, {
      publicMetadata: {role: null},
    })
    revalidatePath('/admin')
  } catch (err) {
    console.error(err)
  }

  redirect('/admin')
}

export async function deleteUser(formData: FormData) {
  const client = await clerkClient()

  try {
    const idUser = formData.get('id') as string
    await client.users.deleteUser(idUser)
    revalidatePath('/admin')
  } catch (err) {
    console.error(err)
  }

  redirect('/admin')
}
