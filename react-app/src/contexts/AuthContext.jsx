import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

// Mock auth functions to replace NextAuth
export const useSession = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useSession must be used within an AuthProvider')
  }
  return context
}

export const signIn = async (provider) => {
  // Placeholder - implement your authentication logic
  console.log('Sign in with:', provider)
  return Promise.resolve()
}

export const signOut = async () => {
  // Placeholder - implement your sign out logic
  console.log('Sign out')
  localStorage.removeItem('authToken')
  return Promise.resolve()
}

export const getSession = async () => {
  // Placeholder - implement your get session logic
  const token = localStorage.getItem('authToken')
  if (token) {
    return { user: { name: 'User', email: 'user@example.com' } }
  }
  return null
}

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    // Check for existing session/token
    const token = localStorage.getItem('authToken')
    if (token) {
      // Validate token and set user data
      setData({ user: { name: 'User', email: 'user@example.com' } })
      setStatus('authenticated')
    } else {
      setStatus('unauthenticated')
    }
  }, [])

  const contextValue = {
    data,
    status,
    update: (newData) => setData(newData),
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
