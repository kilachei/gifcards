import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export default function Rates() {
  const [rates, setRates] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'rates'), (snap) => {
      const data = snap.docs.map(d => d.data())
      data.sort((a, b) => a.brand.localeCompare(b.brand))
      setRates(data)
      setLoading(false)
    })
    return unsub
  }, [])

  const filtered = rates.filter(r =>
    r.brand.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-[#F7F5F0]">

      {/* Hero */}
      <section className="bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest font-semibold text-emerald-300">
              Live rates
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Current gift card <span className="text-amber-400">rates</span>
          </h1>
          <p className="text-stone-300 text-base md:text-lg max-w-2xl leading-relaxed">
            Up-to-date buy and sell rates for every brand we support.
            All payouts processed same day.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">

        {/* Search */}
        <div className="mb-6 flex items-center gap-3 bg-white border border-stone-200 rounded-2xl px-5 py-3 shadow-sm max-w-sm">
          <svg className="w-4 h-4 text-stone-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search brand..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm text-stone-900 placeholder-stone-400 w-full"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-stone-400 hover:text-stone-600 transition-colors text-xs font-semibold">
              Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-stone-400 text-sm gap-3">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Loading rates...
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Brand</th>
                  <th className="text-center px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Discount</th>
                  <th className="text-center px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Buy rate</th>
                  <th className="text-center px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Sell rate</th>
                  <th className="text-center px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Min amount</th>
                  <th className="text-center px-4 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">Payout</th>
                  <th className="px-4 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-stone-400 text-sm">
                      No brands match "<span className="font-semibold text-stone-600">{search}</span>"
                    </td>
                  </tr>
                ) : (
                  filtered.map((r, i) => (
                    <tr
                      key={r.brand}
                      className={`border-b border-stone-100 hover:bg-amber-50/50 transition-colors last:border-none ${i % 2 === 0 ? '' : 'bg-stone-50/40'}`}
                    >
                      <td className="px-6 py-4 font-bold text-stone-900">{r.brand}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
                          -{r.discount}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center font-semibold text-stone-700">
                        {Number(r.buyRate).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-center font-semibold text-emerald-600">
                        {Number(r.sellRate).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-center text-stone-500">
                        ${r.minAmount}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                          r.payout === 'Instant'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-blue-50 text-blue-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${r.payout === 'Instant' ? 'bg-emerald-500' : 'bg-blue-400'}`}></span>
                          {r.payout}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Link
                          to="/sell"
                          className="text-xs font-bold px-3 py-1.5 rounded-lg bg-stone-900 text-white hover:bg-stone-700 transition-all"
                        >
                          Sell →
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <p className="text-xs text-stone-400 mt-4 text-center">
          Rates are updated in real time. Final payout may vary slightly based on card condition and region.
        </p>

      </section>
    </main>
  )
}