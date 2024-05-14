import Link from 'next/link'

export default async function UsersPage() {
  return (
    <div>
      <h3>Admin</h3>

      {
        // menu đến 2 trang: products, users
      }
      <ul>
        <li>
          <Link href="/system-config/products">Products</Link>
        </li>

        <li>
          <Link href="/system-config/users">Users</Link>
        </li>
      </ul>
    </div>
  )
}
