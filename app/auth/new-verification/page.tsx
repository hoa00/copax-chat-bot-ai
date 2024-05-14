import { newUserVerification } from '@/actions/new-user-verification'
import EmailVerifySuccess from './_components/EmailVerifySuccess'
import EmailTokenVerifyNotValid from './_components/EmailTokenVerifyNotValid'

interface NewVerificationPageProps {
  searchParams?: {
    token?: string
    email?: string
  }
}

export default async function NewVerificationPage({
  searchParams
}: NewVerificationPageProps) {
  let verified = false
  const hasFullField = searchParams?.token && searchParams?.email

  if (searchParams?.token && searchParams?.email) {
    const apiMsg = await newUserVerification({
      token: searchParams?.token,
      email: searchParams?.email
    })
    if (apiMsg === 'OK') {
      verified = true
    }
  }

  return (
    <>
      <div>
        {hasFullField ? (
          <div>
            {verified ? (
              <EmailVerifySuccess />
            ) : (
              <div>Can&apos;t verify your email!</div>
            )}
          </div>
        ) : (
          <EmailTokenVerifyNotValid />
        )}
      </div>
    </>
  )
}
