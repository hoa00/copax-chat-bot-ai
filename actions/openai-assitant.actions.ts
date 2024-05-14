'use server'
import OpenAI from 'openai'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const { ASSISTANT_ID, OPENAI_API_KEY, AI_CHAT_API_ENDPOINT } = process.env

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY || ''
})

export async function getChatsFromOpenAIAssistant(id: string, userId: string) {
  if (!userId) {
    return {}
  }

  let chat: any = {}

  try {
    const data = await fetch(`${AI_CHAT_API_ENDPOINT}/chat/${id}`, {
      cache: 'no-store'
    })
    chat = await data.json()

    if (!chat || (userId && chat.userId !== userId) || !chat.threadId) {
      return {}
    }
  } catch (error) {
    return {}
  }
  const messagesRq = await openai.beta.threads.messages.list(chat.threadId, {
    order: 'asc'
  })
  const messages = await messagesRq.data

  return {
    ...chat,
    messages
  }
}
