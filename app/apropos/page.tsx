'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'

// ── Données ────────────────────────────────────────────────
const PROBLEMS = [
  {
    stat: '78%',
    color: '#DCF763',
    title: 'Le financement inaccessible',
    desc: 'des jeunes entrepreneurs camerounais se voient refuser tout crédit bancaire. Sans garanties, pas de financement. YouthIn démocratise l\'accès au capital grâce au YouthIn Index™ reconnu par les banques partenaires.',
  },
  {
    stat: '∞',
    color: '#8B5CF6',
    title: 'Les compétences sans pratique',
    desc: 'Les formations existent mais sont déconnectées du terrain. Le Mentor Market met en relation avec des praticiens qui ont vraiment bâti des entreprises en Afrique — pas des théoriciens.',
  },
  {
    stat: '0',
    color: '#14B8A6',
    title: 'L\'absence de réseau crédible',
    desc: 'Sans réseau, les bonnes idées restent invisibles. Le concours YouthIn et les Villages™ permettent à chaque entrepreneur de se faire connaître à l\'échelle nationale en partant de rien.',
  },
]

const VALUES = [
  {
    emoji: '🤝',
    name: 'Inclusion',
    color: '#DCF763',
    desc: 'YouthIn est gratuit, accessible partout, pensé pour les vrais entrepreneurs du terrain — pas pour les élites déjà établies.',
  },
  {
    emoji: '❤️',
    name: 'Solidarité',
    color: '#EC4899',
    desc: 'On croit à l\'intelligence collective. Les Villages™, les réactions — tout pousse vers l\'entraide plutôt que la compétition toxique.',
  },
  {
    emoji: '⭐',
    name: 'Mérite',
    color: '#F59E0B',
    desc: 'Le YouthIn Index™ récompense ce que tu fais, pas qui tu connais. Chaque point est mérité, tracé, vérifiable.',
  },
  {
    emoji: '🎭',
    name: 'Authenticité',
    color: '#14B8A6',
    desc: 'YouthIn valorise les entrepreneurs du vrai Cameroun — leurs langues, leurs pratiques, leur culture entrepreneuriale locale.',
  },
]

const TEAM = [
  { name: 'Marc Donald',  role: 'Fondateur & DG',            city: 'Douala',   initials: 'MD', color: '#DCF763' },
  { name: 'Farelle',      role: 'Dir. Concours & Communauté', city: 'Douala',   initials: 'FA', color: '#8B5CF6' },
  { name: 'Frank',        role: 'Dir. Stratégie & Impact',    city: 'Yaoundé',  initials: 'FK', color: '#F59E0B' },
  { name: 'Valérie',      role: 'Analyste Data & Index™',     city: 'Douala',   initials: 'VL', color: '#14B8A6' },
  { name: 'Alex',         role: 'Dir. Administratif & Finance', city: 'Douala', initials: 'AL', color: '#EC4899' },
  { name: 'Arnauld Kodo', role: 'Dir. Partenariats',          city: 'Douala',   initials: 'AK', color: '#38BDF8' },
  { name: 'Caterine',     role: 'Dir. Événements & Terrain',  city: 'Douala',   initials: 'CT', color: '#A78BFA' },
  { name: 'Midrel',       role: 'Dir. Juridique',             city: 'Yaoundé',  initials: 'MI', color: '#34D399' },
]

const MILESTONES = [
  { year: '2025', label: 'L\'idée naît à Douala', desc: 'Un groupe de jeunes entrepreneurs fait le constat d\'un talent camerounais immense sans accès aux ressources.' },
  { year: 'Mars 2025', label: 'Fondation de YouthIn', desc: 'Constitution de l\'équipe fondatrice. Début du développement de la plateforme.' },
  { year: 'Oct 2025', label: 'Première version app', desc: 'Lancement de la beta avec 500 membres testeurs à Douala et Yaoundé.' },
  { year: 'Fév 2026', label: 'Concours Season 1', desc: 'Ouverture officielle du 1er concours YouthIn. 847 projets soumis en 28 jours.' },
  { year: 'Avr 2026', label: 'Grande Finale', desc: 'Cérémonie à Douala. Couverture presse nationale. 5 finalistes, 3 750 000 FCFA distribués.' },
]

// ── Page ───────────────────────────────────────────────────
export default function AProposPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <Header />

      {/* ════════════════════════
          HERO
      ════════════════════════ */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2
                          w-[1000px] h-[600px] bg-[#DCF763]/[0.03] rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(#DCF763 1px, transparent 1px), linear-gradient(90deg, #DCF763 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }} />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#DCF763]/10 border border-[#DCF763]/20
                          rounded-full px-4 py-2 mb-10">
            <span className="text-[#DCF763] text-sm font-bold uppercase tracking-widest">
              Notre histoire
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9]
                         tracking-tight mb-8">
            Nous croyons que chaque jeune Camerounais a en lui un{' '}
            <span className="text-[#DCF763]">entrepreneur</span>{' '}
            qui attend de naître.
          </h1>

          <p className="text-2xl text-zinc-400 font-light max-w-3xl leading-relaxed">
            YouthIn, c'est un mouvement. Pas juste une application.
          </p>
        </div>
      </section>

      {/* ════════════════════════
          POURQUOI YOUTHIN
      ════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#DCF763] text-sm font-bold uppercase tracking-widest mb-5">Notre origine</p>
            <h2 className="text-4xl font-black text-white mb-8 leading-tight">
              Pourquoi YouthIn existe.
            </h2>
            <div className="space-y-5 text-zinc-400 leading-relaxed text-lg">
              <p>
                En 2025, de jeunes entrepreneurs de Douala font le même constat : le talent
                camerounais est partout, mais les opportunités ne le sont pas. Accéder à du
                financement est quasi impossible sans garanties. Les formations disponibles
                sont trop théoriques. Le réseau des "grandes familles" reste fermé.
              </p>
              <p>
                Ils décident de construire la solution qu'ils auraient voulu avoir.
                Une plateforme qui ouvre les portes du financement communautaire,
                du mentorat de qualité et d'un réseau de pairs ambitieux.
              </p>
              <p className="text-[#DCF763] font-black text-2xl">
                C'est YouthIn.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {MILESTONES.map((m, i) => (
              <div key={i} className="flex gap-5 group">
                {/* Ligne + point */}
                <div className="flex flex-col items-center flex-shrink-0 w-12">
                  <div className={`w-3 h-3 rounded-full border-2 mt-1 flex-shrink-0 transition-colors
                                   ${i === MILESTONES.length - 1
                                     ? 'border-[#DCF763] bg-[#DCF763]'
                                     : 'border-zinc-600 bg-transparent group-hover:border-[#DCF763]'
                                   }`} />
                  {i < MILESTONES.length - 1 && (
                    <div className="w-px flex-1 bg-zinc-800 my-1" />
                  )}
                </div>
                {/* Contenu */}
                <div className={`pb-8 ${i === MILESTONES.length - 1 ? 'pb-0' : ''}`}>
                  <p className="text-xs font-bold text-[#DCF763] uppercase tracking-wider mb-1">{m.year}</p>
                  <p className="font-black text-white text-sm mb-1">{m.label}</p>
                  <p className="text-zinc-500 text-xs leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════
          LES 3 PROBLÈMES
      ════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#DCF763] text-sm font-bold uppercase tracking-widest mb-4">Notre raison d'être</p>
            <h2 className="text-5xl font-black text-white">Les 3 problèmes qu'on résout.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {PROBLEMS.map((p, i) => (
              <div key={i}
                className="relative rounded-3xl border border-zinc-800 overflow-hidden
                           bg-zinc-900/30 hover:border-zinc-700 transition-all duration-300
                           hover:-translate-y-1 group">
                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0
                                group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />

                <div className="p-8">
                  <div className="text-6xl font-black mb-5 leading-none"
                    style={{ color: p.color }}>
                    {p.stat}
                  </div>
                  <h3 className="text-xl font-black text-white mb-4">{p.title}</h3>
                  <p className="text-zinc-500 leading-relaxed text-sm">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════
          MISSION & VISION
      ════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-5">

            <div className="rounded-3xl border border-[#DCF763]/20 bg-[#DCF763]/5 p-10
                            relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px]
                              bg-gradient-to-r from-transparent via-[#DCF763]/50 to-transparent" />
              <div className="w-12 h-12 rounded-2xl bg-[#DCF763]/15 flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <p className="text-[#DCF763] text-xs font-bold uppercase tracking-widest mb-3">Mission</p>
              <h3 className="text-2xl font-black text-white mb-4 leading-snug">
                Démocratiser l'entrepreneuriat au Cameroun.
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Donner à chaque jeune de 18 à 28 ans les outils, la communauté
                et la visibilité pour transformer une idée en entreprise prospère.
                Sans condition de diplôme, de réseau ou d'origine sociale.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-10
                            relative overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6">
                <span className="text-2xl">🔮</span>
              </div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-3">Vision</p>
              <h3 className="text-2xl font-black text-white mb-4 leading-snug">
                Un Cameroun où l'entrepreneuriat est la voie normale.
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Pas l'exception. Devenir le standard africain de crédibilité
                entrepreneuriale — puis l'étendre à toute l'Afrique subsaharienne,
                en commençant par la Côte d'Ivoire et le Sénégal.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════
          VALEURS
      ════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900/20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#DCF763] text-sm font-bold uppercase tracking-widest mb-4">Ce qui nous guide</p>
            <h2 className="text-5xl font-black text-white">Nos valeurs.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <div key={i}
                className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8
                           hover:border-zinc-700 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0
                                group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${v.color}, transparent)` }} />

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${v.color}12` }}>
                    {v.emoji}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white mb-2"
                      style={{ color: v.color }}>{v.name}</h3>
                    <p className="text-zinc-400 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════
          ÉQUIPE
      ════════════════════════ 
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#DCF763] text-sm font-bold uppercase tracking-widest mb-4">Les bâtisseurs</p>
            <h2 className="text-5xl font-black text-white">L'équipe fondatrice.</h2>
            <p className="text-zinc-500 mt-4 max-w-xl mx-auto">
              8 membres complémentaires. Tech, Finance, Stratégie, Communication,
              Juridique, Événements. Tous Camerounais.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {TEAM.map((m, i) => (
              <div key={i}
                className="group text-center bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6
                           hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1">

                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center
                                font-black text-xl text-black transition-transform
                                group-hover:scale-105"
                  style={{ backgroundColor: m.color }}>
                  {m.initials}
                </div>

                <p className="font-black text-white text-sm mb-1">{m.name}</p>
                <p className="text-zinc-500 text-xs leading-relaxed mb-2">{m.role}</p>
                <p className="text-xs font-bold" style={{ color: m.color }}>📍 {m.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* ════════════════════════
          YouthIn Index™
      ════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl border border-[#DCF763]/20 overflow-hidden
                          bg-gradient-to-br from-[#DCF763]/6 to-transparent px-8 sm:px-14 py-16">
            <div className="absolute top-0 left-0 right-0 h-[1px]
                            bg-gradient-to-r from-transparent via-[#DCF763]/60 to-transparent" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px]
                            bg-[#DCF763]/[0.04] rounded-full blur-[80px] pointer-events-none" />

            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#DCF763]/15 border border-[#DCF763]/20
                                rounded-full px-3 py-1.5 mb-6">
                  <Zap size={12} className="text-[#DCF763]" />
                  <span className="text-[#DCF763] text-xs font-bold uppercase tracking-wider">
                    Notre innovation
                  </span>
                </div>
                <h2 className="text-4xl font-black text-white mb-5 leading-tight">
                  Le YouthIn Index™ — notre contribution à l'Afrique.
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  Là où les banques refusent les jeunes faute d'historique financier,
                  nous créons cet historique. Un score de crédibilité entrepreneuriale
                  basé sur le comportement réel — pas sur des garanties matérielles.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  À terme, le YouthIn Index™ deviendra le standard de confiance pour
                  les entrepreneurs africains — comme le score de crédit en Occident,
                  mais conçu pour nos réalités.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Reconnu par les banques partenaires', done: true },
                  { label: 'Rapport PDF officiel avec QR code', done: true },
                  { label: 'Validation milestones par les pairs', done: true },
                  { label: 'Expansion vers les incubateurs', done: false },
                  { label: 'Standard national officiel', done: false },
                ].map(({ label, done }, i) => (
                  <div key={i} className="flex items-center gap-4 bg-zinc-900/60 border border-zinc-800
                                          rounded-2xl px-4 py-3">
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black
                                     ${done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-600'}`}>
                      {done ? '✓' : '○'}
                    </div>
                    <p className={`text-sm ${done ? 'text-zinc-300' : 'text-zinc-600'}`}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════
          CTA
      ════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6 leading-tight">
            Rejoins le mouvement.
          </h2>
          <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
            +12 000 entrepreneurs te font déjà confiance. Télécharge l'app YouthIn
            et commence à construire.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="group flex items-center gap-3 bg-[#DCF763] text-black font-black
                               text-base px-10 py-4 rounded-2xl
                               hover:bg-[#DCF763]/90 hover:scale-[1.02]
                               hover:shadow-[0_0_40px_rgba(220,247,99,0.3)]
                               transition-all duration-200">
              Télécharger l'app — Gratuit
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="/concours">
              <button className="flex items-center gap-2 border border-zinc-700 text-zinc-300
                                 font-semibold px-8 py-4 rounded-2xl
                                 hover:border-zinc-600 hover:text-white transition-colors">
                Voir le concours
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}