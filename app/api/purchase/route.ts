'use server'
import { getListPurchase } from '@/actions/purchase.action'
import { auth } from '@/auth'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const session = await auth()
  const userId = session?.user?.id

  const cursor = req.nextUrl.searchParams.get('cursor')

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const items = await getListPurchase(session.user.id, cursor)

  return Response.json(items)
}
