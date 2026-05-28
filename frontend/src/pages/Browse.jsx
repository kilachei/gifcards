import { useState } from 'react'

const BRANDS = [
  {
    name: 'Amazon',
    tagline: 'Shop everything',
    discount: '18%',
    bg: '#FF9900',
    textColor: '#fff',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    logoDark: false,
    description: 'Use Amazon gift cards to shop millions of products worldwide.',
    denominations: [10, 25, 50, 100, 200],
  },
  {
    name: 'Apple',
    tagline: 'Apps & media',
    discount: '20%',
    bg: '#000000',
    textColor: '#fff',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    logoDark: true,
    description: 'Buy apps, music, movies and more on the App Store & iTunes.',
    denominations: [10, 25, 50, 100],
  },
  {
    name: 'Razer Gold',
    tagline: 'Gaming currency',
    discount: '15%',
    bg: '#44D62C',
    textColor: '#000',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Razer_logo.svg',
    logoDark: false,
    description: 'Universal gaming currency for hundreds of games worldwide.',
    denominations: [5, 10, 25, 50, 100],
  },
  {
    name: 'Prepaid Visa',
    tagline: 'Spend anywhere',
    discount: '12%',
    bg: '#1A1F71',
    textColor: '#fff',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
    logoDark: true,
    description: 'Spend anywhere Visa is accepted — online or in-store globally.',
    denominations: [25, 50, 100, 200, 500],
  },
  {
    name: 'Virtual Reward Center',
    tagline: 'Digital rewards',
    discount: '14%',
    bg: '#6C3CE1',
    textColor: '#fff',
    logo: null,
    icon: '🎁',
    description: 'Flexible digital reward cards redeemable across multiple platforms.',
    denominations: [10, 25, 50, 100],
  },
  {
    name: 'Tremendous',
    tagline: 'Instant payouts',
    discount: '13%',
    bg: '#0F172A',
    textColor: '#fff',
    logo: null,
    icon: '💸',
    description: 'Send and receive instant digital payouts and reward payments.',
    denominations: [25, 50, 100, 250],
  },
  {
    name: 'Xbox',
    tagline: 'Games & passes',
    discount: '16%',
    bg: '#107C10',
    textColor: '#fff',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox-Logo.svg',
    logoDark: true,
    description: 'Buy Xbox games, Game Pass subscriptions and add-ons.',
    denominations: [10, 25, 50, 100],
  },
]

export default function Browse() {
  const [selected, setSelected] = useState(null)
  const [amount, setAmount] = useState(null)

  const brand = BRANDS.find((b) => b.name === selected)

  function youPay(face, discount) {
    const pct = parseFloat(discount) / 100
    return (face * (1 - pct)).toFixed(2)
  }

  return (
    <main className="bg-[#F7F5F0] min-h-screen">

      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold mb-2">
            Marketplace
          </p>

          <h1 className="text-4xl font-black text-stone-900 tracking-tight mb-2">
            Browse gift cards
          </h1>

          <p className="text-stone-500 text-base">
            Pick a brand, choose your amount, and get it at a discount.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Brand grid */}
        {!selected && (
          <>
            <p className="text-sm font-semibold text-stone-500 mb-6">
              Select a brand to get started
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {BRANDS.slice(0, 4).map((b) => (
                <BrandCard
                  key={b.name}
                  brand={b}
                  onClick={() => setSelected(b.name)}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:w-3/4 mx-auto">
              {BRANDS.slice(4).map((b) => (
                <BrandCard
                  key={b.name}
                  brand={b}
                  onClick={() => setSelected(b.name)}
                />
              ))}
            </div>
          </>
        )}

        {/* Denomination picker */}
        {selected && brand && (
          <div className="max-w-2xl mx-auto">

            {/* Back */}
            <button
              onClick={() => {
                setSelected(null)
                setAmount(null)
              }}
              className="flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-stone-900 transition-colors mb-8"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>

              Back to all brands
            </button>

            {/* Brand hero */}
            <div
              className="rounded-2xl p-8 mb-8 flex items-center gap-5"
              style={{ backgroundColor: brand.bg }}
            >
              <div className="shrink-0">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 object-contain"
                    style={{
                      filter: brand.logoDark
                        ? 'brightness(0) invert(1)'
                        : 'none',
                    }}
                  />
                ) : (
                  <span className="text-5xl">{brand.icon}</span>
                )}
              </div>

              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-1"
                  style={{ color: brand.textColor }}
                >
                  {brand.tagline}
                </p>

                <p
                  className="text-xl font-black"
                  style={{ color: brand.textColor }}
                >
                  {brand.name}
                </p>

                <p
                  className="text-sm mt-1 opacity-80"
                  style={{ color: brand.textColor }}
                >
                  {brand.description}
                </p>
              </div>

              <div
                className="ml-auto shrink-0 text-sm font-black px-4 py-2 rounded-xl"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: brand.textColor,
                }}
              >
                {brand.discount} off
              </div>
            </div>

            {/* Pick amount */}
            <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold mb-4">
              Choose face value
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
              {brand.denominations.map((d) => (
                <button
                  key={d}
                  onClick={() => setAmount(d)}
                  className={`py-4 rounded-xl font-bold text-base transition-all hover:scale-105 border-2 ${
                    amount === d
                      ? 'bg-stone-900 text-white border-stone-900 shadow-lg'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  ${d}
                </button>
              ))}
            </div>

            {/* Order summary */}
            {amount && (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6">
                <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold mb-5">
                  Order summary
                </p>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-stone-500">
                    Card face value
                  </span>

                  <span className="font-semibold text-stone-900">
                    ${amount}.00
                  </span>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-stone-500">
                    Discount ({brand.discount})
                  </span>

                  <span className="font-semibold text-green-600">
                    -
                    $
                    {(
                      (amount * parseFloat(brand.discount)) /
                      100
                    ).toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-stone-100 pt-4 flex justify-between items-center">
                  <span className="font-bold text-stone-900">
                    You pay
                  </span>

                  <span className="text-2xl font-black text-stone-900">
                    ${youPay(amount, brand.discount)}
                  </span>
                </div>
              </div>
            )}

            {/* CTA */}
            {amount && (
              <a
                href={`https://wa.me/254727318468?text=Hi!%20I'd%20like%20to%20buy%20a%20${encodeURIComponent(
                  brand.name
                )}%20gift%20card%20worth%20$${amount}.%20Please%20assist.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-4 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-700 transition-all hover:scale-[1.02] shadow-lg shadow-stone-900/20 text-base"
              >
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>

                Order via WhatsApp
              </a>
            )}

            {!amount && (
              <p className="text-center text-sm text-stone-400 mt-4">
                Select an amount above to continue
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

function BrandCard({ brand, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
      style={{ backgroundColor: brand.bg }}
    >
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-2xl"></div>

      <div className="relative flex flex-col min-h-[130px] justify-between">

        <div className="mb-4">
          {brand.logo ? (
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-8 object-contain"
              style={{
                filter: brand.logoDark
                  ? 'brightness(0) invert(1)'
                  : 'none',
              }}
            />
          ) : (
            <span className="text-4xl">{brand.icon}</span>
          )}
        </div>

        <div>
          <p
            className="text-xs font-medium mb-1 opacity-70"
            style={{ color: brand.textColor }}
          >
            {brand.tagline}
          </p>

          <div className="flex items-center justify-between">
            <span
              className="text-sm font-bold"
              style={{ color: brand.textColor }}
            >
              {brand.name}
            </span>

            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: brand.textColor,
              }}
            >
              -{brand.discount}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}