'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { type Chat } from '@/lib/types'

const { AI_CHAT_API_ENDPOINT } = process.env

export async function getListChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  try {
    // const pipeline = kv.pipeline()
    // const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1, {
    //   rev: true
    // })

    // for (const chat of chats) {
    //   pipeline.hgetall(chat)
    // }

    // const results = await pipeline.exec()

    const data = await fetch(
      `${AI_CHAT_API_ENDPOINT}/chat-list/list/user/${userId}`
    )
    const results = await data.json()

    return results as Chat[]
  } catch (error) {
    return []
  }
}

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  try {
    // const pipeline = kv.pipeline()
    // const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1, {
    //   rev: true
    // })

    // for (const chat of chats) {
    //   pipeline.hgetall(chat)
    // }

    // const results = await pipeline.exec()

    const data = await fetch(`${AI_CHAT_API_ENDPOINT}/chat/list/user/${userId}`)
    const results = await data.json()

    return results as Chat[]
  } catch (error) {
    return []
  }
}

export async function getChat(id: string, userId: string) {
  // const chat = await kv.hgetall<Chat>(`chat:${id}`)

  const data = await fetch(`${AI_CHAT_API_ENDPOINT}/chat/${id}`)
  const chat = await data.json()

  if (!chat || (userId && chat.userId !== userId)) {
    return null
  }

  return chat
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth()

  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  // const uid = await kv.hget<string>(`chat:${id}`, 'userId')

  // if (uid !== session?.user?.id) {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }

  await fetch(`${AI_CHAT_API_ENDPOINT}/chat/${id}`, {
    method: 'DELETE'
  })

  // await kv.del(`chat:${id}`)
  // await kv.zrem(`user:chat:${session.user.id}`, `chat:${id}`)

  revalidatePath('/')
  return revalidatePath(path)
}

export async function clearChats() {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  // const chats: Chat[] = await getChats()
  // if (!chats.length) {
  //   return redirect('/')
  // }

  await fetch(`${AI_CHAT_API_ENDPOINT}/chat/list/user/${session.user.id}`, {
    method: 'DELETE'
  })

  revalidatePath('/')
  return redirect('/')
}

export async function getSharedChat(id: string) {
  // const chat = await kv.hgetall<Chat>(`chat:${id}`)
  // if (!chat || !chat.sharePath) {
  //   return null
  // }
  // return chat
}

export async function shareChat(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  // const chat = await kv.hgetall<Chat>(`chat:${id}`)

  // if (!chat || chat.userId !== session.user.id) {
  //   return {
  //     error: 'Something went wrong'
  //   }
  // }

  // const payload = {
  //   ...chat,
  //   sharePath: `/share/${chat.id}`
  // }

  // await kv.hmset(`chat:${chat.id}`, payload)

  // return payload
}
