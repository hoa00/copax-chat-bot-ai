const { AI_CHAT_API_ENDPOINT } = process.env

export async function getListPurchase(
  userId: string,
  createdAtBefore?: string | null
) {
  let items: any = {}

  try {
    const data = await fetch(
      `${AI_CHAT_API_ENDPOINT}/purchase/list/user/${userId}`,
      {
        cache: 'no-store'
      }
    )
    items = await data.json()
  } catch (error) {
    return {}
  }

  return items
}
