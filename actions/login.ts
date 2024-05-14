'use server'
import * as z from 'zod'
import { AuthError } from 'next-auth'

import { signIn } from '@/auth'
import { LoginSchema } from '@/schemas'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
const { AI_CHAT_API_ENDPOINT } = process.env
export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, code } = validatedFields.data

  try {
    let startTime = new Date().getTime()
    console.log('Start call time: ', startTime)
    const data = await fetch(`${AI_CHAT_API_ENDPOINT}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validatedFields.data),
      cache: 'no-store'
    })
    const existingUser = await data.json()

    console.log('actions > login> existingUser: ', existingUser)
    if (!existingUser?.email) {
      return { error: "Can't login" }
    }
    // existingUser.id = existingUser._id?.toString()

    console.log('Finish call time: ', new Date().getTime() - startTime)

    await signIn('credentials', {
      email,
      // password: 'a',
      name: existingUser.name,
      id: existingUser._id,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    console.log('actions > login: ', error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
  }
}
