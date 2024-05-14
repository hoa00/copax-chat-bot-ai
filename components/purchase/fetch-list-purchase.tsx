import { Suspense } from 'react'
import TableListPurchase from './table-list-purchase'
import { getListPurchase } from '@/actions/purchase.action'
// import { Button } from 'antd'
export default async function FetchListPurchaseOfUser() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* {products?.length ? <TableListProduct products={products} /> : null} */}
        <TableListPurchase />
      </Suspense>
    </div>
  )
}
