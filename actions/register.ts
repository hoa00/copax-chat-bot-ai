'use server'

import * as z from 'zod'
import { RegisterSchema } from '@/schemas'

const { AI_CHAT_API_ENDPOINT } = process.env

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }
  try {
    const data = await fetch(`${AI_CHAT_API_ENDPOINT}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validatedFields.data),
      cache: 'no-store'
    })
    const user = await data.json()
    if (!user?.email) {
      return { error: "Can't register" }
    }
    return { success: 'Registered successfully!' }
  } catch (err) {
    console.log(err)
    return { error: "Can't register" }
  }
}
