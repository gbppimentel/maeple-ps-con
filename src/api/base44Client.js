const STORAGE_KEYS = {
  token: 'base44_access_token',
  user: 'base44_current_user',
  accounts: 'base44_accounts',
  pending: 'base44_pending_verifications',
  resetTokens: 'base44_password_reset_tokens',
}

const readJSON = (key, fallback) => {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const writeJSON = (key, value) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

const removeKey = (key) => {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(key)
}

const uid = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

const normalizeEmail = (email) => String(email || '').trim().toLowerCase()

const getAccounts = () => readJSON(STORAGE_KEYS.accounts, [])
const setAccounts = (accounts) => writeJSON(STORAGE_KEYS.accounts, accounts)
const getPending = () => readJSON(STORAGE_KEYS.pending, {})
const setPending = (pending) => writeJSON(STORAGE_KEYS.pending, pending)
const getResetTokens = () => readJSON(STORAGE_KEYS.resetTokens, {})
const setResetTokens = (tokens) => writeJSON(STORAGE_KEYS.resetTokens, tokens)

const getCurrentUser = () => readJSON(STORAGE_KEYS.user, null)
const setCurrentUser = (user, token) => {
  if (typeof window === 'undefined') return
  if (user && token) {
    window.localStorage.setItem(STORAGE_KEYS.token, token)
    writeJSON(STORAGE_KEYS.user, user)
  } else {
    removeKey(STORAGE_KEYS.token)
    removeKey(STORAGE_KEYS.user)
  }
}

const ensureDemoAccount = () => {
  const accounts = getAccounts()
  if (accounts.length) return accounts
  const demo = {
    id: uid(),
    email: 'demo@local.app',
    password: 'demo1234',
    name: 'Demo User',
    provider: 'local',
    role: 'user',
    createdAt: new Date().toISOString(),
  }
  setAccounts([demo])
  return [demo]
}

const findAccountByEmail = (email) => getAccounts().find((account) => account.email === normalizeEmail(email))

const auth = {
  async isAuthenticated() {
    if (typeof window === 'undefined') return false
    return Boolean(window.localStorage.getItem(STORAGE_KEYS.token))
  },

  async me() {
    const user = getCurrentUser()
    if (!user) {
      throw Object.assign(new Error('Not authenticated'), { status: 401 })
    }
    return user
  },

  async loginViaEmailPassword(email, password) {
    const normalizedEmail = normalizeEmail(email)
    const account = findAccountByEmail(normalizedEmail)
    if (!account || account.password !== password) {
      throw new Error('Invalid email or password')
    }

    const user = {
      id: account.id,
      email: account.email,
      name: account.name || account.email.split('@')[0],
      provider: account.provider || 'local',
      role: account.role || 'user',
    }
    const token = `token_${uid()}`
    setCurrentUser(user, token)
    return { access_token: token, user }
  },

  async loginWithProvider(provider, redirectPath = '/') {
    ensureDemoAccount()
    const user = {
      id: `provider_${provider}_${uid()}`,
      email: `${provider}@local.app`,
      name: `${provider[0].toUpperCase()}${provider.slice(1)} Demo`,
      provider,
      role: 'user',
    }
    const token = `token_${uid()}`
    setCurrentUser(user, token)
    if (typeof window !== 'undefined') {
      window.location.href = redirectPath
    }
    return { access_token: token, user }
  },

  async register({ email, password }) {
    const normalizedEmail = normalizeEmail(email)
    const accounts = getAccounts()
    if (accounts.some((account) => account.email === normalizedEmail)) {
      throw new Error('An account with that email already exists')
    }

    const otpCode = String(Math.floor(100000 + Math.random() * 900000))
    const pending = getPending()
    pending[normalizedEmail] = {
      email: normalizedEmail,
      password,
      otpCode,
      createdAt: new Date().toISOString(),
    }
    setPending(pending)
    return { otpCode }
  },

  async verifyOtp({ email, otpCode }) {
    const normalizedEmail = normalizeEmail(email)
    const pending = getPending()[normalizedEmail]
    if (!pending || pending.otpCode !== String(otpCode)) {
      throw new Error('Invalid verification code')
    }

    const accounts = getAccounts()
    const account = {
      id: uid(),
      email: normalizedEmail,
      password: pending.password,
      name: normalizedEmail.split('@')[0],
      provider: 'local',
      role: 'user',
      createdAt: new Date().toISOString(),
    }
    accounts.push(account)
    setAccounts(accounts)

    const nextPending = { ...getPending() }
    delete nextPending[normalizedEmail]
    setPending(nextPending)

    const user = {
      id: account.id,
      email: account.email,
      name: account.name,
      provider: 'local',
      role: 'user',
    }
    const token = `token_${uid()}`
    setCurrentUser(user, token)
    return { access_token: token, user }
  },

  async resendOtp(email) {
    const normalizedEmail = normalizeEmail(email)
    const pending = getPending()
    if (!pending[normalizedEmail]) {
      throw new Error('No pending verification for that email')
    }
    pending[normalizedEmail].otpCode = String(Math.floor(100000 + Math.random() * 900000))
    pending[normalizedEmail].resentAt = new Date().toISOString()
    setPending(pending)
    return { success: true }
  },

  async resetPasswordRequest(email) {
    const normalizedEmail = normalizeEmail(email)
    const account = findAccountByEmail(normalizedEmail)
    if (!account) return { success: true }

    const resetToken = `reset_${uid()}`
    const tokens = getResetTokens()
    tokens[resetToken] = {
      email: normalizedEmail,
      createdAt: new Date().toISOString(),
    }
    setResetTokens(tokens)
    return { resetToken }
  },

  async resetPassword({ resetToken, newPassword }) {
    const tokens = getResetTokens()
    const record = tokens[resetToken]
    if (!record) {
      throw new Error('Invalid reset token')
    }

    const accounts = getAccounts()
    const index = accounts.findIndex((account) => account.email === record.email)
    if (index === -1) {
      throw new Error('Account not found')
    }

    accounts[index] = { ...accounts[index], password: newPassword }
    setAccounts(accounts)
    delete tokens[resetToken]
    setResetTokens(tokens)
    return { success: true }
  },

  async setToken(token) {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.token, token)
  },

  async logout(redirectUrl) {
    setCurrentUser(null, null)
    if (typeof window !== 'undefined' && redirectUrl) {
      window.location.href = '/login'
    }
  },

  async redirectToLogin() {
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  },
}

const entities = new Proxy({}, {
  get: () => ({
    filter: async () => [],
    get: async () => null,
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  }),
})

const integrations = {
  Core: {
    UploadFile: async () => ({ file_url: '' }),
  },
}

export const db = { auth, entities, integrations }
export const base44 = db
export default db

if (typeof globalThis !== 'undefined') {
  globalThis.__B44_DB__ = db
}
