import FetchListPurchaseOfUser from '@/components/purchase/fetch-list-purchase'

export default async function ListPurchasePage() {
  return (
    <div>
      <h3>Lịch sử mua hàng nằm ở đây nghe</h3>
      <FetchListPurchaseOfUser />
    </div>
  )
}
