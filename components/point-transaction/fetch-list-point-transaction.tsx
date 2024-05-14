import { Suspense } from 'react'
import { getListPurchase } from '@/actions/purchase.action'
import TableListPointTransaction from './table-list-point-transaction'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { getListPointTransaction } from '@/actions/point-transaction.actions'

export default async function FetchListPointTransactionOfUser() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* {products?.length ? <TableListProduct products={products} /> : null} */}
        <TableListPointTransaction />
      </Suspense>
    </div>
  )
}
