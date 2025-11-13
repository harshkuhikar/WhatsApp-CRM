import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { MessageCircle, Loader2 } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [showQR, setShowQR] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'agent'
  })
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isLogin) {
        await login(formData.email, formData.password)
        navigate('/')
      } else {
        await signup(formData.name, formData.email, formData.password, formData.role)
        alert('Account created! Please login.')
        setIsLogin(true)
      }
    } catch (error) {
      alert(error.response?.data?.detail || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const qrData = JSON.stringify({
    type: 'whatsapp_business_auth',
    timestamp: Date.now(),
    session: Math.random().toString(36).substring(7)
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 whatsapp-bg text-white p-12 flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle size={48} />
              <h1 className="text-4xl font-bold">WhatsApp Business</h1>
            </div>
            <h2 className="text-3xl font-semibold mb-4">Bulk Messaging CRM</h2>
            <p className="text-green-100 text-lg mb-8">
              Send unlimited messages, manage campaigns, and grow your business with our powerful WhatsApp Business solution.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">✓</div>
                <div>
                  <h3 className="font-semibold">Bulk Messaging</h3>
                  <p className="text-sm text-green-100">Send to thousands instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">✓</div>
                <div>
                  <h3 className="font-semibold">Campaign Management</h3>
                  <p className="text-sm text-green-100">Schedule and track campaigns</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">✓</div>
                <div>
                  <h3 className="font-semibold">Message Templates</h3>
                  <p className="text-sm text-green-100">Create reusable templates</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Signup Form */}
        <div className="w-full lg:w-1/2 p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {showQR ? 'Scan QR Code' : isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {showQR ? 'Scan with WhatsApp Business app' : isLogin ? 'Login to your account' : 'Sign up to get started'}
            </p>
          </div>

          {showQR ? (
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <QRCodeSVG value={qrData} size={256} level="H" />
              </div>
              <p className="text-center text-gray-600 mb-4">
                Open WhatsApp Business on your phone and scan this QR code
              </p>
              <button
                onClick={() => setShowQR(false)}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                ← Back to login
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="••••••••"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    >
                      <option value="agent">Agent</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full whatsapp-green text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Processing...
                    </>
                  ) : (
                    isLogin ? 'Login' : 'Sign Up'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
                </button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowQR(true)}
                  className="mt-4 w-full border-2 border-green-500 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Scan QR Code
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
