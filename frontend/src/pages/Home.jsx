import { Link } from 'react-router-dom'

const BRANDS = [
  {
    name: 'Amazon',
    tagline: 'Shop everything',
    bg: '#FF9900',
    textColor: '#fff',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    logoDark: false,
    cardImg: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&q=80',
  },
  {
    name: 'Apple',
    tagline: 'Apps & media',
    bg: '#1c1c1e',
    textColor: '#fff',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    logoDark: true,
    cardImg: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
  },
  {
    name: 'Razer Gold',
    tagline: 'Gaming currency',
    bg: '#44D62C',
    textColor: '#000',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Razer_logo.svg',
    logoDark: false,
    cardImg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80',
  },
  {
    name: 'Prepaid Visa',
    tagline: 'Spend anywhere',
    bg: '#1A1F71',
    textColor: '#fff',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
    logoDark: true,
    cardImg: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400&q=80',
  },
  {
    name: 'Virtual Reward Center',
    tagline: 'Digital rewards',
    bg: '#6C3CE1',
    textColor: '#fff',
    logo: null,
    icon: '🎁',
    cardImg: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80',
  },
  {
    name: 'Tremendous',
    tagline: 'Instant payouts',
    bg: '#0F172A',
    textColor: '#fff',
    logo: null,
    icon: '💸',
    cardImg: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&q=80',
  },
  {
    name: 'Xbox',
    tagline: 'Games & passes',
    bg: '#107C10',
    textColor: '#fff',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox-Logo.svg',
    logoDark: true,
    cardImg: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&q=80',
  },
]

const STATS = [
  { label: 'Cards traded',  value: '200+'  },
  { label: 'Top brands',    value: '13'    },
  { label: 'Avg. discount', value: '15%'   },
  { label: 'Happy users',   value: '150+'  },
]

const STEPS = [
  {
    n: '01',
    title: 'Pick a brand',
    desc: 'Browse our 13 supported gift card brands and choose the one you want to buy or sell.',
    color: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  {
    n: '02',
    title: 'Secure checkout',
    desc: 'Pay safely via Stripe. Funds held in escrow until the card code is verified by the buyer.',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  {
    n: '03',
    title: 'Instant transfer',
    desc: 'Card code released to buyer. Seller paid immediately. Ratings exchanged. Done.',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
]

export default function Home() {
  return (
    <main className="bg-[#F7F5F0]">

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse inline-block"></span>
          Live marketplace · 13 brands supported
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-stone-900 tracking-tighter leading-[1.05] mb-6">
          Trade gift cards.<br />
          <span className="text-amber-500 italic">Get real value.</span>
        </h1>
        <p className="text-stone-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Buy discounted gift cards from top brands or sell yours instantly.
          Always secure. Always the best rate.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            to="/browse"
            className="px-8 py-3.5 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-700 transition-all hover:scale-105 shadow-lg shadow-stone-900/20"
          >
            Browse gift cards
          </Link>
          <Link
            to="/sell"
            className="px-8 py-3.5 rounded-xl bg-white text-stone-700 font-semibold border border-stone-200 hover:border-stone-400 transition-all hover:scale-105 shadow-sm"
          >
            Sell my card →
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-stone-900 mx-6 md:mx-auto md:max-w-5xl rounded-2xl mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-700">
          {STATS.map((s) => (
            <div key={s.label} className="px-8 py-6 text-center">
              <p className="text-3xl font-black text-white mb-1">{s.value}</p>
              <p className="text-xs text-stone-400 uppercase tracking-widest font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Brands grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold mb-2">Supported brands</p>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight">Cards we accept</h2>
          </div>
          <Link to="/browse" className="text-sm font-semibold text-amber-600 hover:text-amber-500 transition-colors">
            Browse all →
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BRANDS.slice(0, 4).map(b => <BrandCard key={b.name} brand={b} />)}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:w-3/4 mx-auto">
            {BRANDS.slice(4).map(b => <BrandCard key={b.name} brand={b} />)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold mb-2">Simple process</p>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map(s => (
              <div key={s.n} className="bg-[#F7F5F0] rounded-2xl p-8 relative overflow-hidden">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border text-lg font-black mb-5 ${s.color}`}>
                  {s.n}
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-3">{s.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{s.desc}</p>
                <span className="absolute -bottom-4 -right-4 text-8xl opacity-5 font-black text-stone-900 select-none">{s.n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="relative bg-stone-900 rounded-3xl px-10 py-16 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-400/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">Zero seller fees</p>
            <h2 className="text-4xl font-black text-white tracking-tight mb-4">
              Got a gift card collecting dust?
            </h2>
            <p className="text-stone-400 mb-10 text-lg font-light max-w-md mx-auto">
              Turn it into cash in under 2 minutes. No fees. No hassle.
            </p>
            <Link
              to="/sell"
              className="inline-block px-10 py-4 bg-amber-400 text-stone-900 font-bold rounded-xl hover:bg-amber-300 transition-all hover:scale-105 shadow-xl shadow-amber-400/30"
            >
              Sell a gift card now
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}

function BrandCard({ brand }) {
  return (
    <div
      className="group relative rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
      style={{ backgroundColor: brand.bg }}
    >
      {/* Background image */}
      {brand.cardImg && (
        <div className="absolute inset-0">
          <img
            src={brand.cardImg}
            alt=""
            className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${brand.bg}cc, ${brand.bg}ff)` }}
          />
        </div>
      )}

      {/* Shine overlay */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-2xl" />

      <div className="relative flex flex-col h-full min-h-[160px] justify-between p-6">
        {/* Logo or icon */}
        <div className="mb-4">
          {brand.logo ? (
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-8 object-contain"
              style={{ filter: brand.logoDark ? 'brightness(0) invert(1)' : 'none' }}
            />
          ) : (
            <span className="text-4xl">{brand.icon}</span>
          )}
        </div>

        <div>
          <p className="text-xs font-medium mb-1 opacity-70" style={{ color: brand.textColor }}>
            {brand.tagline}
          </p>
          <p className="text-sm font-bold" style={{ color: brand.textColor }}>
            {brand.name}
          </p>
        </div>
      </div>
    </div>
  )
}