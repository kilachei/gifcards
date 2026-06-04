import { useState, useEffect } from 'react'
import { collection, onSnapshot, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const ADMIN_EMAIL = 'kenkilachei@gmail.com' // 🔴 Replace with your email

const PAYOUT_OPTIONS = ['Instant', '< 1 hour', '< 2 hours', '< 24 hours']

export default function Admin() {
  const [tab, setTab] = useState('rates')
  const [rates, setRates] = useState([])
  const [orders, setOrders] = useState([])
  const [editing, setEditing] = useState(null) // brand being edited
  const [editForm, setEditForm] = useState({})
  const [adding, setAdding] = useState(false)
  const [newRate, setNewRate] = useState({ brand: '', discount: '', buyRate: '', sellRate: '', minAmount: '', payout: 'Instant' })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  // Auth guard
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user || user.email !== ADMIN_EMAIL) navigate('/')
    })
    return unsub
  }, [navigate])

  // Live rates
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'rates'), (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      data.sort((a, b) => a.brand.localeCompare(b.brand))
      setRates(data)
    })
    return unsub
  }, [])

  // Live orders
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'orders'), (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
      setOrders(data)
    })
    return unsub
  }, [])

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  function startEdit(rate) {
    setEditing(rate.id)
    setEditForm({ ...rate })
  }

  async function saveEdit() {
    setSaving(true)
    try {
      await updateDoc(doc(db, 'rates', editing), {
        discount: Number(editForm.discount),
        buyRate: Number(editForm.buyRate),
        sellRate: Number(editForm.sellRate),
        minAmount: Number(editForm.minAmount),
        payout: editForm.payout,
      })
      setEditing(null)
      showToast(`✓ ${editForm.brand} updated`)
    } catch (e) {
      showToast('Error saving', 'error')
    }
    setSaving(false)
  }

  async function deleteRate(id, brand) {
    if (!confirm(`Delete ${brand}?`)) return
    await deleteDoc(doc(db, 'rates', id))
    showToast(`${brand} deleted`)
  }

  async function addRate() {
    if (!newRate.brand.trim()) return showToast('Brand name required', 'error')
    setSaving(true)
    try {
      await setDoc(doc(db, 'rates', newRate.brand.trim()), {
        brand: newRate.brand.trim(),
        discount: Number(newRate.discount),
        buyRate: Number(newRate.buyRate),
        sellRate: Number(newRate.sellRate),
        minAmount: Number(newRate.minAmount),
        payout: newRate.payout,
      })
      setAdding(false)
      setNewRate({ brand: '', discount: '', buyRate: '', sellRate: '', minAmount: '', payout: 'Instant' })
      showToast(`✓ ${newRate.brand} added`)
    } catch (e) {
      showToast('Error adding', 'error')
    }
    setSaving(false)
  }

  async function updateOrderStatus(id, status) {
    await updateDoc(doc(db, 'orders', id), { status })
    showToast(`Order marked as ${status}`)
  }

  const statusColor = {
    pending:   'bg-amber-100 text-amber-700',
    completed: 'bg-emerald-100 text-emerald-700',
    rejected:  'bg-red-100 text-red-600',
    processing:'bg-blue-100 text-blue-600',
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold transition-all ${
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-stone-900 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="bg-stone-900 text-white px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
            <svg className="w-4 h-4 text-stone-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <p className="font-black text-sm tracking-tight">KilacheiGC Admin</p>
            <p className="text-xs text-stone-400">Dashboard</p>
          </div>
        </div>
        <button
          onClick={() => auth.signOut().then(() => navigate('/'))}
          className="text-xs text-stone-400 hover:text-white transition-colors font-medium"
        >
          Sign out →
        </button>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="flex gap-2 mb-8 bg-white border border-stone-200 rounded-2xl p-1.5 w-fit shadow-sm">
          {[
            { key: 'rates',  label: '💳 Gift Card Rates', count: rates.length },
            { key: 'orders', label: '📦 Orders',          count: orders.length },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                tab === t.key
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {t.label}
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                tab === t.key ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
              }`}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* ── RATES TAB ── */}
        {tab === 'rates' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-stone-900">Gift Card Rates</h2>
              <button
                onClick={() => setAdding(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-stone-900 font-bold text-sm rounded-xl hover:bg-amber-300 transition-all"
              >
                + Add brand
              </button>
            </div>

            {/* Add new rate form */}
            {adding && (
              <div className="bg-white border-2 border-amber-300 rounded-2xl p-5 mb-4 shadow-sm">
                <p className="font-bold text-stone-900 mb-4 text-sm">New Gift Card Brand</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="text-xs text-stone-400 font-semibold block mb-1">Brand name *</label>
                    <input className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400"
                      value={newRate.brand} onChange={e => setNewRate(p => ({ ...p, brand: e.target.value }))} placeholder="e.g. Netflix" />
                  </div>
                  <div>
                    <label className="text-xs text-stone-400 font-semibold block mb-1">Discount %</label>
                    <input type="number" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400"
                      value={newRate.discount} onChange={e => setNewRate(p => ({ ...p, discount: e.target.value }))} placeholder="15" />
                  </div>
                  <div>
                    <label className="text-xs text-stone-400 font-semibold block mb-1">Buy rate</label>
                    <input type="number" step="0.01" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400"
                      value={newRate.buyRate} onChange={e => setNewRate(p => ({ ...p, buyRate: e.target.value }))} placeholder="0.85" />
                  </div>
                  <div>
                    <label className="text-xs text-stone-400 font-semibold block mb-1">Sell rate</label>
                    <input type="number" step="0.01" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400"
                      value={newRate.sellRate} onChange={e => setNewRate(p => ({ ...p, sellRate: e.target.value }))} placeholder="0.90" />
                  </div>
                  <div>
                    <label className="text-xs text-stone-400 font-semibold block mb-1">Min amount ($)</label>
                    <input type="number" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400"
                      value={newRate.minAmount} onChange={e => setNewRate(p => ({ ...p, minAmount: e.target.value }))} placeholder="10" />
                  </div>
                  <div>
                    <label className="text-xs text-stone-400 font-semibold block mb-1">Payout speed</label>
                    <select className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400"
                      value={newRate.payout} onChange={e => setNewRate(p => ({ ...p, payout: e.target.value }))}>
                      {PAYOUT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={addRate} disabled={saving}
                    className="px-5 py-2 bg-stone-900 text-white text-sm font-bold rounded-lg hover:bg-stone-700 transition-all disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save brand'}
                  </button>
                  <button onClick={() => setAdding(false)}
                    className="px-5 py-2 bg-stone-100 text-stone-600 text-sm font-semibold rounded-lg hover:bg-stone-200 transition-all">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Brand</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Discount</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Buy rate</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Sell rate</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Min $</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Payout</th>
                    <th className="px-4 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {rates.map((r, i) => (
                    <tr key={r.id} className={`border-b border-stone-100 last:border-none ${i % 2 === 0 ? '' : 'bg-stone-50/40'}`}>
                      {editing === r.id ? (
                        <>
                          <td className="px-6 py-3 font-bold text-stone-900">{r.brand}</td>
                          <td className="px-2 py-3">
                            <input type="number" className="w-16 border border-amber-300 rounded-lg px-2 py-1.5 text-sm text-center outline-none"
                              value={editForm.discount} onChange={e => setEditForm(p => ({ ...p, discount: e.target.value }))} />
                          </td>
                          <td className="px-2 py-3">
                            <input type="number" step="0.01" className="w-16 border border-amber-300 rounded-lg px-2 py-1.5 text-sm text-center outline-none"
                              value={editForm.buyRate} onChange={e => setEditForm(p => ({ ...p, buyRate: e.target.value }))} />
                          </td>
                          <td className="px-2 py-3">
                            <input type="number" step="0.01" className="w-16 border border-amber-300 rounded-lg px-2 py-1.5 text-sm text-center outline-none"
                              value={editForm.sellRate} onChange={e => setEditForm(p => ({ ...p, sellRate: e.target.value }))} />
                          </td>
                          <td className="px-2 py-3">
                            <input type="number" className="w-16 border border-amber-300 rounded-lg px-2 py-1.5 text-sm text-center outline-none"
                              value={editForm.minAmount} onChange={e => setEditForm(p => ({ ...p, minAmount: e.target.value }))} />
                          </td>
                          <td className="px-2 py-3">
                            <select className="border border-amber-300 rounded-lg px-2 py-1.5 text-sm outline-none"
                              value={editForm.payout} onChange={e => setEditForm(p => ({ ...p, payout: e.target.value }))}>
                              {PAYOUT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2 justify-end">
                              <button onClick={saveEdit} disabled={saving}
                                className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 disabled:opacity-50">
                                {saving ? '...' : 'Save'}
                              </button>
                              <button onClick={() => setEditing(null)}
                                className="px-3 py-1.5 bg-stone-100 text-stone-600 text-xs font-semibold rounded-lg hover:bg-stone-200">
                                Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 font-bold text-stone-900">{r.brand}</td>
                          <td className="px-4 py-4 text-center">
                            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">-{r.discount}%</span>
                          </td>
                          <td className="px-4 py-4 text-center font-semibold text-stone-700">{Number(r.buyRate).toFixed(2)}</td>
                          <td className="px-4 py-4 text-center font-semibold text-emerald-600">{Number(r.sellRate).toFixed(2)}</td>
                          <td className="px-4 py-4 text-center text-stone-500">${r.minAmount}</td>
                          <td className="px-4 py-4 text-center">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                              r.payout === 'Instant' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-50 text-blue-600'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${r.payout === 'Instant' ? 'bg-emerald-500' : 'bg-blue-400'}`}></span>
                              {r.payout}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => startEdit(r)}
                                className="px-3 py-1.5 bg-stone-900 text-white text-xs font-bold rounded-lg hover:bg-stone-700 transition-all">
                                Edit
                              </button>
                              <button onClick={() => deleteRate(r.id, r.brand)}
                                className="px-3 py-1.5 bg-red-50 text-red-500 text-xs font-bold rounded-lg hover:bg-red-100 transition-all">
                                Delete
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {tab === 'orders' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-stone-900">Orders & Transactions</h2>
              <span className="text-xs text-stone-400 font-medium">{orders.length} total orders</span>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-3xl py-20 text-center text-stone-400 text-sm">
                No orders yet.
              </div>
            ) : (
              <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-100 bg-stone-50">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Order</th>
                      <th className="text-left px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">User</th>
                      <th className="text-left px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Brand</th>
                      <th className="text-center px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Amount</th>
                      <th className="text-center px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Payout</th>
                      <th className="text-center px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Status</th>
                      <th className="px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o, i) => (
                      <tr key={o.id} className={`border-b border-stone-100 last:border-none ${i % 2 === 0 ? '' : 'bg-stone-50/40'}`}>
                        <td className="px-6 py-4">
                          <p className="font-mono text-xs text-stone-400">#{o.id.slice(0, 8)}</p>
                          <p className="text-xs text-stone-400 mt-0.5">
                            {o.createdAt?.seconds ? new Date(o.createdAt.seconds * 1000).toLocaleDateString() : '—'}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-stone-700 text-xs">{o.userEmail || o.userId || '—'}</td>
                        <td className="px-4 py-4 font-semibold text-stone-900">{o.brand || '—'}</td>
                        <td className="px-4 py-4 text-center font-bold text-stone-900">${o.amount || '—'}</td>
                        <td className="px-4 py-4 text-center font-semibold text-emerald-600">${o.payout || '—'}</td>
                        <td className="px-4 py-4 text-center">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${statusColor[o.status] || 'bg-stone-100 text-stone-500'}`}>
                            {o.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <select
                            value={o.status || 'pending'}
                            onChange={e => updateOrderStatus(o.id, e.target.value)}
                            className="border border-stone-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-amber-400 bg-white"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <div className="h-16" />
      </div>
    </div>
  )
}