const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
    try {
        return JSON.parse(localStorage.getItem(USER_KEY))
    } catch {
        return null
    }
}

export function saveSession({ token, user }) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSession() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
}

async function request(path, body) {
    let res
    try {
        res = await fetch(`/api${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
    } catch {
        throw new Error('Сервер недоступен')
    }
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || 'Что-то пошло не так')
    saveSession(data)
    return data.user
}

export const login = (email, password) => request('/login', { email, password })
export const register = (fields) => request('/register', fields)
