'use server'

const { AI_CHAT_API_ENDPOINT } = process.env

export async function getListPointTransaction(
  userId: string,
  createdAtBefore?: string | null
) {
  if (!userId) {
    return {}
  }
  let chat: any = {}

  let url = `${AI_CHAT_API_ENDPOINT}/point-transaction/list/by-user/${userId}`
  if (createdAtBefore) {
    url = `${url}?createdAtBefore=${createdAtBefore}`
  }

  try {
    const data = await fetch(url, {
      cache: 'no-store'
    })
    chat = await data.json()
  } catch (error) {
    return {}
  }

  return chat
}

export async function getCurrentPoint(userId: string) {
  if (!userId) {
    return {}
  }
  let chat: any = {}

  let url = `${AI_CHAT_API_ENDPOINT}/current-point/by-user/${userId}`

  try {
    const data = await fetch(url, {
      cache: 'no-store'
    })
    chat = await data.json()
  } catch (error) {
    return {}
  }

  return chat
}
