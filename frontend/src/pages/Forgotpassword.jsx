import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'

export default function ForgotPassword() {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await sendPasswordResetEmail(auth, email.trim())
      setSent(true)
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        // Don't reveal whether the email exists — just show success
        setSent(true)
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">

          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-stone-900 rounded-xl flex items-center justify-center">
                <span className="text-amber-400 text-xs font-black tracking-tighter">KX</span>
              </div>
              <span className="font-black text-stone-900 text-lg tracking-tight">
                Kilachei<span className="text-amber-500">EX</span>change
              </span>
            </Link>

            {!sent ? (
              <>
                <h1 className="text-2xl font-black text-stone-900 mb-1">Forgot password?</h1>
                <p className="text-stone-500 text-sm">
                  Enter your email and we'll send you a reset link.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-black text-stone-900 mb-1">Check your inbox</h1>
                <p className="text-stone-500 text-sm">
                  We sent a reset link to your email.
                </p>
              </>
            )}
          </div>

          {/* ── SENT STATE ── */}
          {sent ? (
            <div className="text-center">
              {/* Checkmark */}
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>

              <p className="text-stone-600 text-sm leading-relaxed mb-2">
                If <span className="font-semibold text-stone-900">{email}</span> is registered,
                you'll receive a password reset email shortly.
              </p>
              <p className="text-stone-400 text-xs mb-8">
                Don't see it? Check your spam folder.
              </p>

              <button
                onClick={() => { setSent(false); setEmail('') }}
                className="w-full py-3.5 rounded-2xl border border-stone-200 text-stone-700 font-bold text-sm hover:bg-stone-50 transition-all mb-3"
              >
                Try a different email
              </button>

              <Link
                to="/login"
                className="block w-full py-3.5 rounded-2xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-700 transition-all hover:scale-[1.02] shadow-lg shadow-stone-900/20 text-center"
              >
                Back to sign in →
              </Link>
            </div>
          ) : (
            /* ── FORM ── */
            <>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-4 py-3 mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoFocus
                    className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-700 transition-all hover:scale-[1.02] shadow-lg shadow-stone-900/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? 'Sending…' : 'Send reset link →'}
                </button>
              </form>

              <p className="text-center text-sm text-stone-500 mt-6">
                Remembered it?{' '}
                <Link to="/login" className="font-bold text-amber-600 hover:text-amber-500">
                  Sign in
                </Link>
              </p>
            </>
          )}

        </div>
      </div>
    </main>
  )
}