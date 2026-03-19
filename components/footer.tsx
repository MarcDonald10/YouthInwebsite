import Link from 'next/link'
import { Instagram, Facebook, Linkedin, MessageCircle, ArrowRight, Zap } from 'lucide-react'

const NAV = [
  {
    title: 'La Plateforme',
    links: [
      { label: 'Concours 2026',          href: '/concours'    },
      { label: 'Voter pour un projet',   href: '/voter'       },
      { label: 'Mentor Market',          href: '/mentors'     },
      { label: 'Communauté & Villages™', href: '/communaute'  },
      { label: 'YouthIn Index™',         href: '#index'       },
      { label: 'Télécharger l\'app',     href: '#'            },
    ],
  },
  {
    title: 'À propos',
    links: [
      { label: 'Notre histoire',    href: '/apropos'   },
      { label: 'Blog & Actualités', href: '/blog'      },
      { label: 'Devenir mentor',    href: '/mentors'   },
      { label: 'Partenaires',       href: '#'          },
      { label: 'Presse & Médias',   href: '#'          },
      { label: 'Nous contacter',    href: '/contact'   },
    ],
  },
  {
    title: 'Légal & Contact',
    links: [
      { label: 'Conditions générales',       href: '/terms'   },
      { label: 'Politique de confidentialité', href: '/privacy' },
      { label: 'Règlement du concours',      href: '#'        },
      { label: 'support@youthin.cm',         href: 'mailto:support@youthin.cm' },
      { label: 'partners@youthin.cm',        href: 'mailto:partners@youthin.cm' },
    ],
  },
]

const SOCIALS = [
  { Icon: Instagram,     href: '#', label: 'Instagram'  },
  { Icon: Facebook,      href: '#', label: 'Facebook'   },
  { Icon: Linkedin,      href: '#', label: 'LinkedIn'   },
  { Icon: MessageCircle, href: '#', label: 'WhatsApp'   },
]

export function Footer() {
  return (
    <footer className="relative bg-[#080808] border-t border-zinc-900 mt-24 overflow-hidden">

      {/* Glow déco */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                      w-[800px] h-[300px] bg-[#DCF763]/[0.025] rounded-full blur-[100px]
                      pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── CTA Newsletter ── */}
        <div className="border-b border-zinc-900 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center
                          justify-between gap-6">
            <div>
              <p className="text-[#DCF763] text-xs font-bold uppercase tracking-widest mb-2">
                Reste informé
              </p>
              <h3 className="text-2xl font-black text-white">
                Actualités YouthIn dans ta boîte mail.
              </h3>
              <p className="text-zinc-500 text-sm mt-1">
                Résultats du concours, nouveaux mentors, opportunités. Zéro spam.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
              <input
                type="email"
                placeholder="ton@email.com"
                className="flex-1 sm:w-64 bg-zinc-900 border border-zinc-800 rounded-xl
                           px-4 py-2.5 text-sm text-white placeholder-zinc-600
                           focus:outline-none focus:border-zinc-600 transition-colors"
              />
              <button
                className="flex-shrink-0 bg-[#DCF763] text-black font-bold text-sm
                           px-4 py-2.5 rounded-xl hover:bg-[#DCF763]/90
                           hover:shadow-[0_0_20px_rgba(220,247,99,0.2)]
                           transition-all flex items-center gap-2"
              >
                S'inscrire
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Colonnes principales ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14">

          {/* Colonne identité */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-[#DCF763] rounded-xl flex items-center justify-center
                              flex-shrink-0">
                <span className="font-black text-black text-base">Yi</span>
              </div>
              <span className="font-black text-white text-lg tracking-tight">YouthIn</span>
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              La première plateforme qui transforme les jeunes Camerounais de 18 à 28 ans
              en entrepreneurs accomplis.
            </p>

            {/* Badges niveau */}
            <div className="flex flex-wrap gap-2 mb-7">
              {[
                { emoji: '🥉', label: 'Bronze' },
                { emoji: '🥈', label: 'Silver' },
                { emoji: '🥇', label: 'Gold'   },
                { emoji: '💎', label: 'Platinum'},
                { emoji: '⚡', label: 'Elite'  },
              ].map(({ emoji, label }) => (
                <span key={label}
                  className="text-xs text-zinc-600 bg-zinc-900 border border-zinc-800
                             rounded-lg px-2 py-1 flex items-center gap-1">
                  {emoji} {label}
                </span>
              ))}
            </div>

            {/* Réseaux */}
            <div className="flex gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <Link key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800
                             flex items-center justify-center
                             text-zinc-500 hover:text-white hover:border-zinc-700
                             hover:bg-zinc-800 transition-all">
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          {/* 3 colonnes de liens */}
          {NAV.map(col => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href}
                      className="text-zinc-500 hover:text-zinc-200 text-sm transition-colors
                                 flex items-center gap-2 group w-fit">
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Barre index ── */}
        <div className="border-t border-zinc-900 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#DCF763]/10 flex items-center justify-center">
                <Zap size={12} className="text-[#DCF763]" />
              </div>
              <p className="text-zinc-600 text-xs">
                <span className="text-zinc-400 font-semibold">YouthIn Index™</span>
                {' '}— Score de crédibilité entrepreneuriale reconnu par les banques partenaires.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-zinc-700">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                App disponible
              </span>
              <span>·</span>
              <span>Douala, Cameroun 🇨🇲</span>
            </div>
          </div>
        </div>

        {/* ── Copyright ── */}
        <div className="border-t border-zinc-900 py-6 flex flex-col sm:flex-row
                        items-center justify-between gap-3 text-xs text-zinc-700">
          <p>© 2026 YouthIn Cameroun. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms"   className="hover:text-zinc-500 transition-colors">CGU</Link>
            <Link href="/privacy" className="hover:text-zinc-500 transition-colors">Confidentialité</Link>
            <span className="text-zinc-800">#YouthInCameroun</span>
          </div>
        </div>

      </div>
    </footer>
  )
}