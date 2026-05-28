import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  updateProfile,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth'
import { auth } from '../firebase'
import { useAuth } from '../context/AuthContext'

const MOCK_TRANSACTIONS = [
  { id: 1, brand: 'Amazon',    amount: '$50',  rate: '18%', payout: '$41.00', date: 'May 20, 2026', status: 'Completed' },
  { id: 2, brand: 'Steam',     amount: '$25',  rate: '15%', payout: '$21.25', date: 'May 15, 2026', status: 'Completed' },
  { id: 3, brand: 'Apple',     amount: '$100', rate: '20%', payout: '$80.00', date: 'May 10, 2026', status: 'Completed' },
  { id: 4, brand: 'Xbox',      amount: '$30',  rate: '16%', payout: '$25.20', date: 'May 5, 2026',  status: 'Pending'   },
]

export default function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Name
  const [name, setName] = useState(user?.displayName || '')
  const [nameSuccess, setNameSuccess] = useState('')
  const [nameError, setNameError] = useState('')
  const [nameLoading, setNameLoading] = useState(false)

  // Password
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })
  const [passSuccess, setPassSuccess] = useState('')
  const [passError, setPassError] = useState('')
  const [passLoading, setPassLoading] = useState(false)

  // Delete
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const handleName = async (e) => {
    e.preventDefault()
    setNameError('')
    setNameSuccess('')
    setNameLoading(true)
    try {
      await updateProfile(auth.currentUser, { displayName: name })
      setNameSuccess('Name updated successfully.')
    } catch (err) {
      setNameError('Failed to update name. Please try again.')
    } finally {
      setNameLoading(false)
    }
  }

  const handlePassword = async (e) => {
    e.preventDefault()
    setPassError('')
    setPassSuccess('')

    if (passwords.newPass !== passwords.confirm) {
      setPassError('New passwords do not match.')
      return
    }
    if (passwords.newPass.length < 6) {
      setPassError('Password must be at least 6 characters.')
      return
    }

    setPassLoading(true)
    try {
      const credential = EmailAuthProvider.credential(user.email, passwords.current)
      await reauthenticateWithCredential(auth.currentUser, credential)
      await updatePassword(auth.currentUser, passwords.newPass)
      setPassSuccess('Password updated successfully.')
      setPasswords({ current: '', newPass: '', confirm: '' })
    } catch (err) {
      setPassError('Current password is incorrect.')
    } finally {
      setPassLoading(false)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    setDeleteError('')
    setDeleteLoading(true)
    try {
      const credential = EmailAuthProvider.credential(user.email, deleteConfirm)
      await reauthenticateWithCredential(auth.currentUser, credential)
      await deleteUser(auth.currentUser)
      navigate('/')
    } catch (err) {
      setDeleteError('Password is incorrect. Account not deleted.')
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0]">

      {/* Hero */}
      <section className="bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center shrink-0">
              <span className="text-2xl font-black text-stone-900">
                {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">
                {user?.displayName || 'My Account'}
              </h1>
              <p className="text-stone-400 text-sm mt-1">{user?.email}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">

        {/* Account Info */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
          <h2 className="text-lg font-black text-stone-900 mb-1">Account info</h2>
          <p className="text-sm text-stone-400 mb-6">Your basic account details.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-stone-50 rounded-2xl px-5 py-4">
              <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold mb-1">Email</p>
              <p className="text-sm font-bold text-stone-900">{user?.email}</p>
            </div>
            <div className="bg-stone-50 rounded-2xl px-5 py-4">
              <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold mb-1">Member since</p>
              <p className="text-sm font-bold text-stone-900">
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : 'N/A'}
              </p>
            </div>
          </div>

          {/* Update name */}
          <form onSubmit={handleName} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">Display name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 text-sm"
              />
            </div>
            {nameSuccess && <p className="text-sm text-emerald-600 font-semibold">{nameSuccess}</p>}
            {nameError && <p className="text-sm text-red-500">{nameError}</p>}
            <button
              type="submit"
              disabled={nameLoading}
              className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-bold hover:bg-stone-700 transition-all disabled:opacity-50"
            >
              {nameLoading ? 'Saving...' : 'Save name'}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
          <h2 className="text-lg font-black text-stone-900 mb-1">Change password</h2>
          <p className="text-sm text-stone-400 mb-6">Make sure your password is strong and unique.</p>

          <form onSubmit={handlePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">Current password</label>
              <input
                type="password"
                value={passwords.current}
                onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                placeholder="Enter current password"
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">New password</label>
              <input
                type="password"
                value={passwords.newPass}
                onChange={e => setPasswords({ ...passwords, newPass: e.target.value })}
                placeholder="Min. 6 characters"
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">Confirm new password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                placeholder="Repeat new password"
                className={`w-full rounded-2xl border bg-white px-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 text-sm ${
                  passwords.confirm && passwords.newPass !== passwords.confirm
                    ? 'border-red-300'
                    : 'border-stone-300'
                }`}
              />
              {passwords.confirm && passwords.newPass !== passwords.confirm && (
                <p className="text-xs text-red-500 mt-1.5 ml-1">Passwords do not match</p>
              )}
            </div>
            {passSuccess && <p className="text-sm text-emerald-600 font-semibold">{passSuccess}</p>}
            {passError && <p className="text-sm text-red-500">{passError}</p>}
            <button
              type="submit"
              disabled={passLoading}
              className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-bold hover:bg-stone-700 transition-all disabled:opacity-50"
            >
              {passLoading ? 'Updating...' : 'Update password'}
            </button>
          </form>
        </div>

        {/* Transaction History */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
          <h2 className="text-lg font-black text-stone-900 mb-1">Transaction history</h2>
          <p className="text-sm text-stone-400 mb-6">Your recent gift card trades.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-stone-400 uppercase tracking-widest">Brand</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-stone-400 uppercase tracking-widest">Amount</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-stone-400 uppercase tracking-widest">Rate</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-stone-400 uppercase tracking-widest">Payout</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-stone-400 uppercase tracking-widest">Date</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-stone-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TRANSACTIONS.map((t) => (
                  <tr key={t.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-2 font-bold text-stone-900">{t.brand}</td>
                    <td className="py-3 px-2 text-center text-stone-600">{t.amount}</td>
                    <td className="py-3 px-2 text-center">
                      <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                        -{t.rate}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-emerald-600">{t.payout}</td>
                    <td className="py-3 px-2 text-center text-stone-400 text-xs">{t.date}</td>
                    <td className="py-3 px-2 text-center">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        t.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Account */}
        <div className="bg-white border border-red-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-lg font-black text-red-600 mb-1">Delete account</h2>
          <p className="text-sm text-stone-400 mb-6">
            Permanently delete your account and all associated data. This cannot be undone.
          </p>

          {!showDelete ? (
            <button
              onClick={() => setShowDelete(true)}
              className="px-6 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 transition-all"
            >
              Delete my account
            </button>
          ) : (
            <form onSubmit={handleDelete} className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-sm text-red-600">
                ⚠️ This action is irreversible. Enter your password to confirm.
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Confirm password</label>
                <input
                  type="password"
                  value={deleteConfirm}
                  onChange={e => setDeleteConfirm(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-red-300 bg-white px-4 py-3.5 outline-none focus:ring-2 focus:ring-red-400 text-stone-900 text-sm"
                />
              </div>
              {deleteError && <p className="text-sm text-red-500">{deleteError}</p>}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={deleteLoading}
                  className="px-6 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all disabled:opacity-50"
                >
                  {deleteLoading ? 'Deleting...' : 'Confirm delete'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowDelete(false); setDeleteConfirm(''); setDeleteError('') }}
                  className="px-6 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-bold hover:bg-stone-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </main>
  )
}