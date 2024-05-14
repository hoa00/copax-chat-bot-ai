import ListCardProductContainer from '@/components/product/list-card-product-container'
import { getUser } from '@/lib/utils'

export default async function ProductsPage() {
  const user = await getUser()

  return (
    <div>
      <ListCardProductContainer userId={user.id} />
    </div>
  )
}
