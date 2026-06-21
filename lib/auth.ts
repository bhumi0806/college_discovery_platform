export type AuthUser = {
  id: string
  email: string
  name: string
}

type AuthState = {
  token: string | null
  user: AuthUser | null
}

const STORAGE_KEY = 'college-discovery-auth'

export function loadAuth(): AuthState {
  if (typeof window === 'undefined') {
    return { token: null, user: null }
  }

  const json = window.localStorage.getItem(STORAGE_KEY)
  if (!json) {
    return { token: null, user: null }
  }

  try {
    return JSON.parse(json) as AuthState
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    return { token: null, user: null }
  }
}

export function saveAuth(token: string, user: AuthUser) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }))
}

export function clearAuth() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}

export function getAuthHeaders(token: string | null) {
  if (!token) return {}
  return { Authorization: `Bearer ${token}` }
}
