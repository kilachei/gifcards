import { Link } from 'react-router-dom'

const STEPS = [
  {
    n: '01',
    title: 'Choose your card',
    desc: 'Browse our supported gift card brands. Whether you want to sell an Amazon, Apple, Steam or any other supported card — we have you covered.',
    icon: '🎴',
    color: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  {
    n: '02',
    title: 'Submit your details',
    desc: 'Fill in your card details — the brand, amount and region. Takes less than a minute. No account needed to get started.',
    icon: '📋',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    n: '03',
    title: 'We verify your card',
    desc: 'Our team quickly verifies the card balance and authenticity. Most cards are verified within minutes.',
    icon: '🔍',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    n: '04',
    title: 'Get paid instantly',
    desc: 'Once verified, your payout is sent immediately via your preferred payment method. No delays, no hidden fees.',
    icon: '💸',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
]

const FAQS = [
  {
    q: 'How long does the process take?',
    a: 'Most transactions are completed within minutes. Verification takes 1–5 minutes and payouts are sent immediately after.',
  },
  {
    q: 'What payment methods do you support?',
    a: 'We currently support M-Pesa, bank transfer, and cryptocurrency payouts. More options coming soon.',
  },
  {
    q: 'Is there a minimum or maximum amount?',
    a: 'Minimum amounts vary by brand — check the Rates page for details. There is no maximum limit.',
  },
  {
    q: 'What if my card is partially used?',
    a: 'No problem. Just enter the remaining balance when submitting. We accept partially used cards.',
  },
  {
    q: 'Is it safe to trade here?',
    a: 'Yes. We have processed over 84,000 transactions. Your card details are handled securely and never shared.',
  },
  {
    q: 'Which regions are supported?',
    a: 'We accept cards from the USA, UK, Canada, Europe, Australia and many other regions. Select your region when submitting.',
  },
]

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-[#F7F5F0]">

      {/* Hero */}
      <section className="bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-300">
              Simple process
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How it <span className="text-amber-400">works</span>
          </h1>
          <p className="text-stone-300 text-base md:text-lg max-w-2xl leading-relaxed">
            Selling your gift card takes less than 2 minutes. Here's exactly what happens step by step.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-white border border-stone-200 rounded-3xl p-8 relative overflow-hidden shadow-sm">
              <div className="flex items-start gap-5">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl border-2 text-lg font-black shrink-0 ${s.color}`}>
                  {s.n}
                </div>
                <div>
                  <h3 className="text-lg font-black text-stone-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
              <span className="absolute -bottom-4 -right-2 text-8xl opacity-[0.04] font-black text-stone-900 select-none">
                {s.n}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-stone-900 mx-6 md:mx-auto md:max-w-6xl rounded-3xl mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-700">
          {[
            ['84,200+', 'Cards traded'],
            ['< 5 min', 'Avg. verification'],
            ['Instant', 'Payout speed'],
            ['32K+',    'Happy users'],
          ].map(([value, label]) => (
            <div key={label} className="px-8 py-6 text-center">
              <p className="text-3xl font-black text-white mb-1">{value}</p>
              <p className="text-xs text-stone-400 uppercase tracking-widest font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold mb-2">Got questions?</p>
          <h2 className="text-3xl font-black text-stone-900 tracking-tight">Frequently asked</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => (
            <div key={faq.q} className="bg-white border border-stone-200 rounded-2xl px-6 py-5 shadow-sm">
              <p className="font-bold text-stone-900 mb-2">{faq.q}</p>
              <p className="text-sm text-stone-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-stone-900 rounded-3xl px-10 py-16 text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Ready to get started?
          </p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">
            Sell your gift card today
          </h2>
          <p className="text-stone-400 mb-10 text-lg font-light max-w-md mx-auto">
            Join thousands of users who have already turned their unused gift cards into cash.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/sell"
              className="px-10 py-4 bg-amber-400 text-stone-900 font-bold rounded-xl hover:bg-amber-300 transition-all hover:scale-105 shadow-xl shadow-amber-400/30"
            >
              Sell a gift card now
            </Link>
            <Link
              to="/rates"
              className="px-10 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all hover:scale-105"
            >
              View rates →
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}