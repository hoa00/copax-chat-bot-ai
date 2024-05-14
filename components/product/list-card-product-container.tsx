import { Suspense } from 'react'

import { getListProduct } from '@/actions/product.actions'
import ListCardProduct from './list-card-product'

export default async function ListCardProductContainer({
  userId
}: {
  userId: string
}) {
  const products = await getListProduct(userId)

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* {products?.length ? <TableListProduct products={products} /> : null} */}
        <ListCardProduct products={products} />
      </Suspense>
    </div>
  )
}
