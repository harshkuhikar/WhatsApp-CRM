import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      checkAuth()
    } else {
      setLoading(false)
    }
  }, [token])

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data)
    } catch (error) {
      console.error('Auth check failed:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const response = await axios.post(
      `${API_URL}/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    )
    const newToken = response.data.access_token
    setToken(newToken)
    localStorage.setItem('token', newToken)
    return response.data
  }

  const signup = async (name, email, password, role = 'agent') => {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      name,
      email,
      password,
      role
    })
    return response.data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout, loading, API_URL }}>
      {children}
    </AuthContext.Provider>
  )
}
