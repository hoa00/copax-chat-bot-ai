'use server'
import { auth } from '@/auth'
import { productEndpointUrl } from '@/lib/types'
// export const runtime = 'edge'
export async function POST(req: Request) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  // Parse the request body
  const inputBody = await req.json()
  console.log('inputBody product', inputBody)

  const product = await fetch(productEndpointUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputBody),
    cache: 'no-store'
  })
  const data = await product.json()

  return Response.json({ data })
}
