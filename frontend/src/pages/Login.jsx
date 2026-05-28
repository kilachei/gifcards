import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">

          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-stone-900 rounded-xl flex items-center justify-center">
                <span className="text-amber-400 text-xs font-black tracking-tighter">KX</span>
              </div>
              <span className="font-black text-stone-900 text-lg tracking-tight">
                Kilachei<span className="text-amber-500">EX</span>change
              </span>
            </Link>
            <h1 className="text-2xl font-black text-stone-900 mb-1">Welcome back</h1>
            <p className="text-stone-500 text-sm">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">Email address</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handle}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-stone-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-amber-600 hover:text-amber-500 font-semibold">
                  Forgot password?
                </Link>
              </div>
              <input
                name="password"
                type="password"
                required
                placeholder="Your password"
                value={form.password}
                onChange={handle}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-700 transition-all hover:scale-[1.02] shadow-lg shadow-stone-900/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>

          <p className="text-center text-sm text-stone-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-amber-600 hover:text-amber-500">
              Get started
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}