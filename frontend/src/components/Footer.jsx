import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white">

      {/* Top section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Brand col */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-stone-900 text-xs font-black tracking-tighter">
                KX
              </span>
            </div>

            <span className="font-black text-white text-lg tracking-tight">
              Kilachei<span className="text-amber-400">EX</span>change
            </span>
          </div>

          <p className="text-stone-400 text-sm leading-relaxed">
            The fastest and most trusted gift card exchange platform.
            Buy discounted cards or sell yours instantly — always secure,
            always the best rate.
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span>

            <span className="text-xs text-emerald-400 font-semibold uppercase tracking-widest">
              Live marketplace
            </span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold mb-5">
            Get in touch
          </p>

          <div className="flex flex-col gap-4">

            {/* WhatsApp */}
            <a
              href="https://wa.me/254727318468"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                <svg
                  className="w-5 h-5 text-[#25D366]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
              </div>

              <div>
                <p className="text-xs text-stone-500 mb-0.5">
                  WhatsApp
                </p>

                <p className="text-sm font-semibold text-stone-300 group-hover:text-amber-400 transition-colors">
                  +254 727 318 468
                </p>
              </div>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/itskipkirui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#229ED9]/10 border border-[#229ED9]/20 flex items-center justify-center shrink-0 group-hover:bg-[#229ED9]/20 transition-colors">
                <svg
                  className="w-5 h-5 text-[#229ED9]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </div>

              <div>
                <p className="text-xs text-stone-500 mb-0.5">
                  Telegram
                </p>

                <p className="text-sm font-semibold text-stone-300 group-hover:text-amber-400 transition-colors">
                  @itskipkirui
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:Kennethkipkiruiofficial@gmail.com"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 group-hover:bg-amber-400/20 transition-colors">
                <svg
                  className="w-5 h-5 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-xs text-stone-500 mb-0.5">
                  Email
                </p>

                <p className="text-sm font-semibold text-stone-300 group-hover:text-amber-400 transition-colors break-all">
                  Kennethkipkiruiofficial@gmail.com
                </p>
              </div>
            </a>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-xs text-stone-600">
            © 2026 KilacheiEXchange. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Support'].map((l) => (
              <Link
                key={l}
                to={`/${l.toLowerCase()}`}
                className="text-xs text-stone-600 hover:text-amber-400 transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>

        </div>
      </div>

    </footer>
  )
}