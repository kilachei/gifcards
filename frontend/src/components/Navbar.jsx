import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <nav className="bg-[#F7F5F0] border-b border-stone-200 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-amber-400 text-xs font-black tracking-tighter">KX</span>
          </div>
          <span className="font-black text-stone-900 text-lg tracking-tight leading-none">
            Kilachei<span className="text-amber-500">EX</span>change
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {[['Sell', '/sell'], ['Rates', '/rates'], ['How it works', '/how-it-works']].map(([label, path]) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Desktop right CTA */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-stone-900 px-4 py-2 rounded-xl hover:bg-stone-100 transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-xs font-black text-stone-900">
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
                {user.displayName || user.email}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-bold px-6 py-2.5 rounded-xl bg-stone-900 text-white hover:bg-stone-700 transition-all hover:scale-105"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-stone-600 hover:text-stone-900 px-4 py-2 rounded-xl hover:bg-stone-100 transition-all"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-sm font-bold px-6 py-2.5 rounded-xl bg-amber-400 text-stone-900 hover:bg-amber-300 transition-all hover:scale-105 shadow-md shadow-amber-400/30"
              >
                Get started →
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#F7F5F0] px-4 py-3 flex flex-col gap-1">
          {[['Sell', '/sell'], ['Rates', '/rates'], ['How it works', '/how-it-works']].map(([label, path]) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `text-sm font-semibold px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <hr className="border-stone-200 my-1" />
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-3 text-sm font-semibold text-stone-600 px-4 py-3 rounded-xl hover:bg-stone-100 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-xs font-black text-stone-900">
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
                {user.displayName || user.email}
              </Link>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false) }}
                className="text-sm font-bold text-center px-4 py-3 rounded-xl bg-stone-900 text-white hover:bg-stone-700 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-stone-600 px-4 py-3 rounded-xl hover:bg-stone-100 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-sm font-bold text-center px-4 py-3 rounded-xl bg-amber-400 text-stone-900 hover:bg-amber-300 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Get started →
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}