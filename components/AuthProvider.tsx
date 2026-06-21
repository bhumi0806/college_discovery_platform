import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { AuthUser } from '../lib/auth'
import { clearAuth, loadAuth, saveAuth } from '../lib/auth'

type AuthContextValue = {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  signIn: (token: string, user: AuthUser) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const auth = loadAuth()
    setUser(auth.user)
    setToken(auth.token)
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      signIn: (newToken: string, newUser: AuthUser) => {
        setToken(newToken)
        setUser(newUser)
        saveAuth(newToken, newUser)
      },
      signOut: () => {
        setToken(null)
        setUser(null)
        clearAuth()
      }
    }),
    [token, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
