'use server'
import { getCurrentPoint } from '@/actions/point-transaction.actions'
import { auth } from '@/auth'
// export const runtime = 'edge'
export async function POST(req: Request) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const currentPoint = await getCurrentPoint(session.user.id)

  return Response.json({ currentPoint: currentPoint.pointRemain })
}
