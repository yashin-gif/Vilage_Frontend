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

  const refreshUser = useCallback(async () => {
    const me = await api.get('/auth/me', { auth: true })
    setUser(me)
    return me
  }, [])

  const updateProfile = useCallback(async (changes) => {
    const updated = await api.patch('/auth/me', changes, { auth: true })
    setUser((prev) => ({ ...prev, ...updated }))
    return updated
  }, [])

  // পাসওয়ার্ড বদলালে অন্য সব ডিভাইস থেকে লগআউট হয়ে যায়; এই ডিভাইসে নতুন টোকেন বসে
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    const tokens = await api.post(
      '/auth/change-password',
      { current_password: currentPassword, new_password: newPassword },
      { auth: true },
    )
    tokenStore.set(tokens.access_token, tokens.refresh_token)
    const me = await api.get('/auth/me', { auth: true })
    setUser(me)
  }, [])

  const logout = useCallback(() => {
    // সার্ভারে টোকেন বাতিল করি। ব্যর্থ হলেও স্থানীয়ভাবে লগআউট হবে।
    // টোকেন এই কলের শুরুতেই পড়া হয়, তাই পরের লাইনে মুছে ফেললেও সমস্যা নেই।
    api.post('/auth/logout', undefined, { auth: true }).catch(() => {})
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
      refreshUser,
      updateProfile,
      changePassword,
    }),
    [user, loading, login, register, logout, refreshUser, updateProfile, changePassword],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}