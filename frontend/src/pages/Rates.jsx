import { useState } from 'react'
import { Link } from 'react-router-dom'

const RATES = [
  { brand: 'Amazon',               discount: 18, buyRate: 0.82, sellRate: 0.88, minAmount: 10,  payout: 'Instant'  },
  { brand: 'Apple',                discount: 20, buyRate: 0.80, sellRate: 0.86, minAmount: 10,  payout: 'Instant'  },
  { brand: 'Steam',                discount: 15, buyRate: 0.85, sellRate: 0.90, minAmount: 5,   payout: '< 1 hour' },
  { brand: 'Razer Gold',           discount: 15, buyRate: 0.85, sellRate: 0.89, minAmount: 5,   payout: '< 1 hour' },
  { brand: 'Google Play',          discount: 17, buyRate: 0.83, sellRate: 0.88, minAmount: 5,   payout: 'Instant'  },
  { brand: 'Xbox',                 discount: 16, buyRate: 0.84, sellRate: 0.89, minAmount: 10,  payout: '< 1 hour' },
  { brand: 'PlayStation',          discount: 16, buyRate: 0.84, sellRate: 0.89, minAmount: 10,  payout: '< 1 hour' },
  { brand: 'Nike',                 discount: 14, buyRate: 0.86, sellRate: 0.90, minAmount: 20,  payout: '< 2 hours'},
  { brand: 'Sephora',              discount: 14, buyRate: 0.86, sellRate: 0.90, minAmount: 20,  payout: '< 2 hours'},
  { brand: 'Prepaid Visa',         discount: 12, buyRate: 0.88, sellRate: 0.91, minAmount: 25,  payout: '< 2 hours'},
  { brand: 'Mastercard',           discount: 12, buyRate: 0.88, sellRate: 0.91, minAmount: 25,  payout: '< 2 hours'},
  { brand: 'Tremendous',           discount: 13, buyRate: 0.87, sellRate: 0.91, minAmount: 10,  payout: 'Instant'  },
  { brand: 'Virtual Reward Center',discount: 14, buyRate: 0.86, sellRate: 0.90, minAmount: 10,  payout: 'Instant'  },
]

export default function Rates() {
  const [search, setSearch] = useState('')

  const filtered = RATES.filter(r =>
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
                    {/* Brand */}
                    <td className="px-6 py-4 font-bold text-stone-900">{r.brand}</td>

                    {/* Discount */}
                    <td className="px-4 py-4 text-center">
                      <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        -{r.discount}%
                      </span>
                    </td>

                    {/* Buy rate */}
                    <td className="px-4 py-4 text-center font-semibold text-stone-700">
                      {r.buyRate.toFixed(2)}
                    </td>

                    {/* Sell rate */}
                    <td className="px-4 py-4 text-center font-semibold text-emerald-600">
                      {r.sellRate.toFixed(2)}
                    </td>

                    {/* Min amount */}
                    <td className="px-4 py-4 text-center text-stone-500">
                      ${r.minAmount}
                    </td>

                    {/* Payout */}
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

                    {/* CTA */}
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
        </div>

        {/* Footer note */}
        <p className="text-xs text-stone-400 mt-4 text-center">
          Rates are updated in real time. Final payout may vary slightly based on card condition and region.
        </p>

      </section>
    </main>
  )
}