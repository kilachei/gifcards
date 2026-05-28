import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    try {
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await updateProfile(user, { displayName: form.name })
      navigate('/login')
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''))
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
            <h1 className="text-2xl font-black text-stone-900 mb-1">Create your account</h1>
            <p className="text-stone-500 text-sm">Start trading gift cards in minutes</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">Full name</label>
              <input
                name="name"
                type="text"
                required
                placeholder="John Doe"
                value={form.name}
                onChange={handle}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 text-sm"
              />
            </div>

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
              <label className="block text-sm font-semibold text-stone-700 mb-2">Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handle}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">Confirm password</label>
              <input
                name="confirm"
                type="password"
                required
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={handle}
                className={`w-full rounded-2xl border bg-white px-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 text-sm ${
                  form.confirm && form.password !== form.confirm
                    ? 'border-red-300 focus:ring-red-300'
                    : 'border-stone-300'
                }`}
              />
              {form.confirm && form.password !== form.confirm && (
                <p className="text-xs text-red-500 mt-1.5 ml-1">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-700 transition-all hover:scale-[1.02] shadow-lg shadow-stone-900/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Creating account...' : 'Create account →'}
            </button>
          </form>

          <p className="text-center text-sm text-stone-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-amber-600 hover:text-amber-500">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          By signing up you agree to our terms of service and privacy policy.
        </p>
      </div>
    </main>
  )
}