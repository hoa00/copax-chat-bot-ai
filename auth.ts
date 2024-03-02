import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

const configGoogle = GoogleProvider({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  authorization: {
    params: {
      prompt: 'consent',
      access_type: 'offline',
      response_type: 'code'
    }
  }
})

const configCredentials = Credentials({
  // name: 'Credentials',
  // credentials: {
  //   username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
  //   password: { label: 'Password', type: 'password' }
  // },
  // @ts-ignore
  async authorize(credentials) {
    if (!credentials || !credentials.email || !credentials.password) {
      return null
    }
    // fake user = true
    return {
      id: credentials.email,
      name: credentials.email,
      email: credentials.email
    }
  }
})

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update
} = NextAuth({
  providers: [GitHub, configGoogle, configCredentials],
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      // Đoạn dưới để kiểm tra user verified hay chưa
      // const existingUser = await getUserById(user.id)

      // // Prevent sign in without email verification
      // if (!existingUser?.emailVerified) return false

      // if (existingUser.isTwoFactorEnabled) {
      //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
      //     existingUser.id
      //   )

      //   if (!twoFactorConfirmation) return false

      //   // Delete two factor confirmation for next sign in
      //   await db.twoFactorConfirmation.delete({
      //     where: { id: twoFactorConfirmation.id }
      //   })
      // }

      return true
    },
    jwt({ token, profile }) {
      if (profile) {
        //   if (account?.provider === 'google') {
        //     return (
        //       profile.email_verified && profile.email.endsWith('@example.com')
        //     )
        //   }
        token.id = profile.id || profile.sub
        token.image = profile.avatar_url || profile.picture
      }
      return token
    },
    session: ({ session, token }) => {
      if (session?.user && token?.id) {
        session.user.id = String(token.id)
      }
      return session
    },
    authorized({ auth }) {
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  pages: {
    // signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
    signIn: '/auth/login',
    error: '/auth/error'
  }
})
