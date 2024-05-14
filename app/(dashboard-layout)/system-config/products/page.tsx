import FetchListProduct from '@/components/product/fetch-list-product'
import FormCreateProduct from '@/components/product/form-create-product'
import { getUser } from '@/lib/utils'

export default async function ConfigProductsPage() {
  const user = await getUser()

  return (
    <div>
      <h3>Products</h3>
      <hr />
      <FormCreateProduct />
      <hr />
      <FetchListProduct userId={user.id} />
    </div>
  )
}
