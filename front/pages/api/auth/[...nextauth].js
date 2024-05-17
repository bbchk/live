import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from './lib/mongodb'

//todo implement apple and facebook providers

// Providers
const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  authorization: {
    params: {
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
    },
  },
  profile(profile) {
    return {
      id: profile.sub,
      firstName: profile.given_name,
      secondName: profile.family_name,
      email: profile.email,
      image: profile.picture,
      likedProducts: [],
      cart: [],
      wishList: [],
    }
  },
})

const githubProvider = GithubProvider({
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  profile(profile) {
    return {
      id: profile.id,
      firstName: profile?.name,
      secondName: '',
      email: profile.email,
      image: profile.avatar_url,
      likedProducts: [],
      cart: [],
      wishList: [],
    }
  },
})

const credentialsProvider = CredentialsProvider({
  type: 'credentials',
  credentials: {},
  async authorize(credentials) {
    const { email, password } = credentials

    try {
      const response = await axios.post(
        '/user/signIn',
        {
          email: email,
          password: password,
        },
        { headers: { 'Content-type': 'application/json' } },
      )
      let user = response.data

      user = {
        ...user,
        cart: user.cart.map(({ product, quantity }) => {
          return { ...product, quantity }
        }),
      }
      // console.log('🚀 ~ user:', user)
      // console.log('🚀 ~ user:', user.cart)

      if (response.status === 200) {
        return user
      } else {
        throw new Error('User not authenticated')
      }
    } catch (e) {
      // console.log(error)
      // throw error

      // console.log(error)
      throw new Error(e.response.data.message)
    }
  },
})

// Callbacks
const callbacks = {
  async jwt({ token, user, session, trigger, account }) {
    if (trigger === 'update') {
      token.user = session.user
    }

    if (account) {
      token.access_token = account.access_token
      token.provider = account.provider
      token.user = user
    }
    return token
  },
  async session({ session, token }) {
    session.provider = token.provider
    session.access_token = token.access_token
    session.user = token.user
    return session
  },
}

// Auth options
export const authOptions = {
  providers: [googleProvider, githubProvider, credentialsProvider],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  callbacks,
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth({
  ...authOptions,
  // debug: process.env.NODE_ENV !== "production" ? true : false,
})
