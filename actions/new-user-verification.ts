'use server'
const { AI_CHAT_API_ENDPOINT } = process.env

const userEndpointUrl = AI_CHAT_API_ENDPOINT + '/user'

interface VerificationUserDto {
  readonly email: string
  readonly token: string
}

export async function newUserVerification(input?: VerificationUserDto) {
  let item: any = {}

  try {
    const data = await fetch(userEndpointUrl + '/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input),
      cache: 'no-store'
    })
    item = await data.json()
  } catch (error) {
    return {}
  }

  // ? Hình như trả về url để redirect
  return item
}
