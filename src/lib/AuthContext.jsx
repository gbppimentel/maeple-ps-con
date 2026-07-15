import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'

const db = globalThis.__B44_DB__ || {
  auth: {
    isAuthenticated: async () => false,
    me: async () => null,
    logout: async () => {},
    redirectToLogin: async () => {},
  },
}

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false)
  const [authError, setAuthError] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [appPublicSettings] = useState({ id: 'standalone', public_settings: { mode: 'standalone' } })

  const syncAuth = useCallback(async () => {
    setIsLoadingAuth(true)
    setAuthError(null)

    try {
      const authenticated = await db.auth.isAuthenticated()
      if (!authenticated) {
        setUser(null)
        setIsAuthenticated(false)
        return
      }

      const currentUser = await db.auth.me()
      setUser(currentUser)
      setIsAuthenticated(true)
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
      if (error?.status === 401 || error?.status === 403) {
        setAuthError({ type: 'auth_required', message: 'Authentication required' })
      }
    } finally {
      setIsLoadingAuth(false)
      setAuthChecked(true)
    }
  }, [])

  useEffect(() => {
    syncAuth()
  }, [syncAuth])

  const logout = async (shouldRedirect = true) => {
    setUser(null)
    setIsAuthenticated(false)
    if (shouldRedirect) {
      await db.auth.logout(window.location.href)
    } else {
      await db.auth.logout()
    }
  }

  const navigateToLogin = async () => {
    await db.auth.redirectToLogin(window.location.href)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth: syncAuth,
      checkAppState: syncAuth,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
