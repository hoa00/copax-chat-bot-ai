'use server'
import { auth } from '@/auth'

const { AI_CHAT_API_ENDPOINT } = process.env

const purchaseEndpointUrl = AI_CHAT_API_ENDPOINT + '/purchase'

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

  inputBody.user = userId

  console.log('inputBody /purchase/checkout: ', inputBody)

  const checkoutInfo = await fetch(purchaseEndpointUrl + '/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputBody),
    cache: 'no-store'
  })
  const data = await checkoutInfo.json()

  return Response.json({ data })
}
