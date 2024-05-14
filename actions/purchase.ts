'use server'
const { AI_CHAT_API_ENDPOINT } = process.env

const purchaseEndpointUrl = AI_CHAT_API_ENDPOINT + '/purchase'

export async function getListProduct(userId: string, createdAtBefore?: string) {
  if (!userId) {
    return {}
  }
  let products: any = {}

  try {
    const data = await fetch(purchaseEndpointUrl, {
      cache: 'no-store'
    })
    products = await data.json()
  } catch (error) {
    return {}
  }

  return products
}

export async function checkout(userId: string, productInput?: any) {
  if (!userId) {
    return {}
  }
  let product: any = {}

  /*
  readonly user: string;
  readonly product: string;
  readonly quantity?: number;
  readonly price?: number;
  readonly totalPrice: number;
  */

  try {
    const data = await fetch(purchaseEndpointUrl + '/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productInput),
      cache: 'no-store'
    })
    product = await data.json()
  } catch (error) {
    return {}
  }

  // ? Hình như trả về url để redirect
  return product
}

export async function updateProduct(
  userId: string,
  productId: string,
  productInput?: string
) {
  if (!userId) {
    return {}
  }
  let product: any = {}

  try {
    const data = await fetch(`${purchaseEndpointUrl}/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productInput),
      cache: 'no-store'
    })
    product = await data.json()
  } catch (error) {
    return {}
  }

  return product
}

export async function deleteProduct(userId: string, productId: string) {
  if (!userId) {
    return {}
  }
  let product: any = {}

  try {
    const data = await fetch(`${purchaseEndpointUrl}/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })
    product = await data.json()
  } catch (error) {
    return {}
  }

  return product
}
