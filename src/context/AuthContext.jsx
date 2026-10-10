import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { api, tokenStore } from '../services/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // টোকেন থাকলে প্রথমে ইউজারকে যাচাই করা পর্যন্ত "লোডিং" থাকে
  const [loading, setLoading] = useState(() => Boolean(tokenStore.getAccess()))

  useEffect(() => {
    if (!tokenStore.getAccess()) return

    api
      .get('/auth/me')
      .then(setUser)
      .catch((error) => {
        // সার্ভার বন্ধ থাকলে টোকেন মুছব না, শুধু টোকেন অচল হলে মুছব
        if (error.status === 401 || error.status === 403) tokenStore.clear()
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  // টোকেন রিফ্রেশ ব্যর্থ হলে api.js এই ইভেন্ট পাঠায়
  useEffect(() => {
    const handleLogout = () => setUser(null)

    window.addEventListener('auth:logout', handleLogout)
    return () => window.removeEventListener('auth:logout', handleLogout)
  }, [])

  const startSession = useCallback(async (tokens) => {
    tokenStore.set(tokens.access_token, tokens.refresh_token)

    try {
      const me = await api.get('/auth/me')
      setUser(me)
      return me
    } catch (error) {
      tokenStore.clear()
      throw error
    }
  }, [])

  const login = useCallback(
    async (username, password) => {
      const tokens = await api.postForm(
        '/auth/login',
        { username, password },
        { auth: false },
      )
      return startSession(tokens)
    },
    [startSession],
  )

  const register = useCallback(
    async (payload) => {
      const tokens = await api.post('/auth/register', payload, { auth: false })
      return startSession(tokens)
    },
    [startSession],
  )

  const logout = useCallback(() => {
    tokenStore.clear()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
    }),
    [user, loading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}