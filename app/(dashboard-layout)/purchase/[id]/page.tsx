import PurchaseNotification from '../../../../components/purchase/PurchaseNotification'

export interface PageProps {
  params: {
    id: string
  }
}

export default async function DetailPurchasePage({ params }: PageProps) {
  // check params id
  // if exist get detail
  // chắc khỏi đi chỉ hiển thị thông báo thôi mà

  return (
    <div>
      <div className="max-w-xl p-5">
        <PurchaseNotification />
      </div>
    </div>
  )
}
