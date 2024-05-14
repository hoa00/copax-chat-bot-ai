import { getCurrentPoint } from '@/actions/point-transaction.actions'
import { auth } from '@/auth'
import CurrentPointStatic from '@/components/point-transaction/curent-point-static'
import FetchListPointTransactionOfUser from '@/components/point-transaction/fetch-list-point-transaction'

import { notFound, redirect } from 'next/navigation'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export default async function UserSettingsPage({ params }: ChatPageProps) {
  const session = await auth()

  if (!session?.user) {
    redirect(`/sign-in?next=/chat/${params.id}`)
  }

  const currentPoint = await getCurrentPoint(session.user.id)

  // if (!currentPoint) {
  //   notFound()
  // }

  return (
    <div>
      <div className="p-5">
        <CurrentPointStatic currentPoint={currentPoint?.pointRemain} />
      </div>

      <div className="p-5">
        <FetchListPointTransactionOfUser />
      </div>
    </div>
  )
}
