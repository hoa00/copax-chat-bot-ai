'use server'

import { productEndpointUrl } from '@/lib/types'

export async function getListProduct(userId: string, createdAtBefore?: string) {
  if (!userId) {
    return {}
  }
  let products: any = {}

  try {
    const data = await fetch(productEndpointUrl, {
      cache: 'no-store'
    })
    products = await data.json()
  } catch (error) {
    return {}
  }

  return products
}

// export async function createProduct(userId: string, productInput?: string) {
//   if (!userId) {
//     return {}
//   }
//   let product: any = {}

//   try {
//     const data = await fetch(productEndpointUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(productInput),
//       cache: 'no-store'
//     })
//     product = await data.json()
//   } catch (error) {
//     return {}
//   }

//   return product
// }

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
    const data = await fetch(`${productEndpointUrl}/${productId}`, {
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
    const data = await fetch(`${productEndpointUrl}/${productId}`, {
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
