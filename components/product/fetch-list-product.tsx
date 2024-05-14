import { Suspense } from 'react'
import TableListProduct from './table-list-product'
import { getListProduct } from '@/actions/product.actions'
// import { Button } from 'antd'
export default async function FetchListProduct({ userId }: { userId: string }) {
  const products = await getListProduct(userId)

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* {products?.length ? <TableListProduct products={products} /> : null} */}
        <TableListProduct products={products} />
      </Suspense>
    </div>
  )
}
