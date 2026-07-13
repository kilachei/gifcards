// Sell.jsx
import { useState } from 'react'

const POPULAR_CARDS = [
  'Amazon',
  'Apple',
  'Steam',
  'Razer Gold',
  'Google Play',
  'Xbox',
  'PlayStation',
  'Nike',
  'Sephora',
  'Prepaid Visa',
  'Mastercard',
  'Tremendous',
  'Virtual Reward Center',
]

export default function Sell() {
  const [selectedCard, setSelectedCard] = useState('')
  const [customCard, setCustomCard] = useState('')
  const [amount, setAmount] = useState('')
  const [country, setCountry] = useState('USA')

  const finalCard = selectedCard === 'Other' ? customCard : selectedCard

  return (
    <main className="min-h-screen bg-[#F7F5F0]">

      {/* Hero */}
      <section className="bg-stone-900 text-white border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-6 py-16">

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest font-semibold text-emerald-300">
              Instant payouts
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 max-w-3xl leading-tight">
            Sell your gift cards
            <span className="text-amber-400"> instantly</span>
          </h1>

          <p className="text-stone-300 text-base md:text-lg max-w-2xl leading-relaxed">
            Exchange your unused gift cards for cash quickly and securely.
            We accept popular brands and many other gift cards worldwide.
          </p>

        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">

        {/* Left */}
        <div>

          <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm">

            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest font-semibold text-stone-400 mb-2">
                Step 1
              </p>

              <h2 className="text-2xl font-black text-stone-900 mb-2">
                Select your gift card
              </h2>

              <p className="text-stone-500 text-sm">
                Choose a popular card below or select “Other”.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {POPULAR_CARDS.map((card) => (
                <button
                  key={card}
                  onClick={() => setSelectedCard(card)}
                  className={`rounded-2xl border-2 px-4 py-4 text-sm font-bold transition-all hover:scale-[1.02] ${
                    selectedCard === card
                      ? 'bg-stone-900 border-stone-900 text-white shadow-lg'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  {card}
                </button>
              ))}

              <button
                onClick={() => setSelectedCard('Other')}
                className={`rounded-2xl border-2 px-4 py-4 text-sm font-bold transition-all hover:scale-[1.02] ${
                  selectedCard === 'Other'
                    ? 'bg-amber-400 border-amber-400 text-stone-900 shadow-lg'
                    : 'bg-amber-50 border-amber-200 text-amber-700 hover:border-amber-400'
                }`}
              >
                + Other
              </button>
            </div>

            {selectedCard === 'Other' && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Enter gift card name
                </label>

                <input
                  type="text"
                  placeholder="e.g Walmart, Target, eBay"
                  value={customCard}
                  onChange={(e) => setCustomCard(e.target.value)}
                  className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-4 outline-none focus:ring-2 focus:ring-amber-400 text-stone-900"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Gift card amount ($)
                </label>

                <input
                  type="number"
                  placeholder="100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-4 outline-none focus:ring-2 focus:ring-amber-400 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Card region
                </label>

                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-4 outline-none focus:ring-2 focus:ring-amber-400 text-stone-900"
                >
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                  <option>Europe</option>
                  <option>Australia</option>
                  <option>Other</option>
                </select>
              </div>

            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Extra details (optional)
              </label>

              <textarea
                rows="5"
                placeholder="Enter any details about your gift card..."
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-4 outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 resize-none"
              ></textarea>
            </div>

            <a
              href={`https://wa.me/254731832891?text=${encodeURIComponent(
                `Hi! I would like to sell a ${finalCard || 'gift card'} worth $${amount || '0'} (${country}). Please assist.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-stone-900 hover:bg-stone-700 transition-all text-white font-bold py-4 rounded-2xl shadow-lg shadow-stone-900/20"
            >
              Continue via WhatsApp
            </a>

          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">

          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
            <p className="text-xs uppercase tracking-widest font-semibold text-stone-400 mb-4">
              Why sell with us?
            </p>

            <div className="space-y-5">
              {[
                ['⚡', 'Fast payments', 'Receive your payout quickly after verification.'],
                ['🔒', 'Secure trades', 'Safe and trusted transactions every time.'],
                ['🌍', 'Worldwide cards', 'We accept many gift cards globally.'],
                ['💬', '24/7 support', 'Get assistance anytime through WhatsApp.'],
              ].map(([icon, title, desc]) => (
                <div key={title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-2xl shrink-0">
                    {icon}
                  </div>

                  <div>
                    <p className="font-bold text-stone-900 mb-1">{title}</p>
                    <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-400 to-yellow-300 rounded-3xl p-6 text-stone-900 shadow-lg">
            <p className="text-xs uppercase tracking-widest font-bold mb-3 opacity-70">
              Need help?
            </p>

            <h3 className="text-2xl font-black mb-3 leading-tight">
              Have a gift card not listed?
            </h3>

            <p className="text-sm leading-relaxed mb-5 opacity-80">
              No problem. Contact us directly and we’ll let you know if we accept it.
            </p>

            <a
              href="https://t.me/itskipkirui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-3 rounded-2xl font-bold hover:bg-black transition-all"
            >
              Contact on Telegram
            </a>
          </div>

        </div>

      </section>
    </main>
  )
}
