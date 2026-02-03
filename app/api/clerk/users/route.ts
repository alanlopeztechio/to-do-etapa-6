import {clerkClient} from '@clerk/nextjs/server'
import {NextRequest, NextResponse} from 'next/server'

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url)

  const searchItem = searchParams.get('search')
  const client = await clerkClient()
  if (!searchItem) {
    const users = await client.users.getUserList()
    return NextResponse.json(users)
  }

  const users = await client.users.getUserList({
    query: searchItem,
  })

  return NextResponse.json(users.data)
}
