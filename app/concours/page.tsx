'use client'

import { useState, useEffect, useRef } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Heart, Upload, Trophy, Zap, Users, Clock, ChevronDown } from 'lucide-react'
import Link from 'next/link'

// ── Countdown hook ─────────────────────────────────────────
const VOTE_DEADLINE_MS = new Date('2026-03-31T23:59:59').getTime()

function useCountdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    function tick() {
      const diff = VOTE_DEADLINE_MS - Date.now()
      if (diff <= 0) return
      setTime({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

// ── Composants ─────────────────────────────────────────────

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="relative w-20 h-20 rounded-2xl flex items-center justify-center
                   bg-[#DCF763]/10 border border-[#DCF763]/30 overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-[#DCF763]/5 rounded-2xl" />
        <span className="relative text-4xl font-black text-[#DCF763] tabular-nums leading-none">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">{label}</span>
    </div>
  )
}

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const isCurrent = phase.status === 'EN COURS'
  const isDone    = phase.status === 'TERMINÉ'

  return (
    <div
      className={`
        group relative rounded-3xl border transition-all duration-500 overflow-hidden
        ${isCurrent
          ? 'bg-[#DCF763]/5 border-[#DCF763]/50 shadow-[0_0_40px_rgba(220,247,99,0.08)]'
          : isDone
          ? 'bg-zinc-900/60 border-zinc-800 opacity-60'
          : 'bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700'
        }
      `}
    >
      {/* Accent bar top */}
      {isCurrent && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DCF763] to-transparent" />
      )}

      <div className="p-8 flex gap-6">
        {/* Numéro */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <div className={`
            w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg
            ${isCurrent ? 'bg-[#DCF763] text-black' : isDone ? 'bg-zinc-700 text-zinc-400' : 'bg-zinc-800 text-zinc-500'}
          `}>
            {isDone ? '✓' : index + 1}
          </div>
          {index < 3 && (
            <div className={`w-[2px] h-8 rounded-full ${isCurrent ? 'bg-[#DCF763]/40' : 'bg-zinc-800'}`} />
          )}
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-2xl">{phase.icon}</span>
            <h3 className="text-xl font-bold text-white">Phase {phase.number} — {phase.name}</h3>
            <span className={`
              text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full
              ${isCurrent
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : isDone
                ? 'bg-zinc-700/60 text-zinc-500'
                : 'bg-zinc-800 text-zinc-600'
              }
            `}>
              {phase.status}
            </span>
          </div>
          <p className="text-[#DCF763]/70 text-sm font-medium mb-3 flex items-center gap-2">
            <Clock size={13} />
            {phase.dates}
          </p>
          <p className="text-zinc-400 leading-relaxed">{phase.description}</p>
        </div>
      </div>
    </div>
  )
}

function PrizeCard({ prize, rank }: { prize: Prize; rank: number }) {
  const isFirst = rank === 0
  return (
    <div className={`
      relative rounded-3xl border p-8 flex flex-col gap-5 transition-all duration-300
      hover:-translate-y-1 hover:shadow-2xl
      ${isFirst
        ? 'bg-[#DCF763]/8 border-[#DCF763]/40 shadow-[0_0_50px_rgba(220,247,99,0.06)]'
        : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
      }
    `}>
      {isFirst && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#DCF763] text-black text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full">
            Grand Prix
          </span>
        </div>
      )}

      <div>
        <p className={`text-sm font-bold uppercase tracking-widest mb-2 ${isFirst ? 'text-[#DCF763]' : 'text-zinc-500'}`}>
          {prize.rank}
        </p>
        <p className={`text-4xl font-black leading-none ${isFirst ? 'text-white' : 'text-zinc-300'}`}>
          {prize.amount}
        </p>
        {prize.amountSub && (
          <p className="text-zinc-500 text-sm mt-1">{prize.amountSub}</p>
        )}
      </div>

      <div className="h-[1px] bg-zinc-800" />

      <ul className="space-y-3">
        {prize.benefits.map((benefit, i) => (
          <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm">
            <span className={`mt-0.5 flex-shrink-0 ${isFirst ? 'text-[#DCF763]' : 'text-zinc-600'}`}>✦</span>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Données ────────────────────────────────────────────────

type Phase = {
  number: number; name: string; dates: string
  status: 'TERMINÉ' | 'EN COURS' | 'À VENIR'
  description: string; icon: string
}

type Prize = {
  rank: string; amount: string; amountSub?: string; benefits: string[]
}

const phases: Phase[] = [
  {
    number: 1, name: 'Soumission', icon: '📝',
    dates: '1er Février → 28 Février 2026', status: 'TERMINÉ',
    description: 'Soumets ton dossier projet : titre, accroche, description, problème adressé, solution, impact, photos et vidéo de présentation facultative.',
  },
  {
    number: 2, name: 'Vote Public', icon: '🗳️',
    dates: '1er Mars → 31 Mars 2026', status: 'EN COURS',
    description: 'Les membres de la communauté votent pour leurs projets préférés. 1 vote par membre par projet sur 24h. Classement en temps réel visible par tous.',
  },
  {
    number: 3, name: 'Demi-Finale', icon: '⚡',
    dates: '5 → 15 Avril 2026', status: 'À VENIR',
    description: 'Le jury sélectionne les 20 meilleurs dossiers parmi les Top 50 du vote public. Évaluation sur pertinence, viabilité et impact. Pitch possible en ligne.',
  },
  {
    number: 4, name: 'Grande Finale', icon: '🏆',
    dates: '30 Avril 2026 · Douala', status: 'À VENIR',
    description: "Les 5 finalistes pitchent devant un jury d'investisseurs, mentors et partenaires. Cérémonie de remise des prix en direct. Retransmission en ligne.",
  },
]

const prizes: Prize[] = [
  {
    rank: '1er Prix',
    amount: '.............',
    amountSub: 'FCFA',
    benefits: [
      '6 mois de mentorat intensif',
      'Couverture presse nationale',
      'Accès réseau investisseurs YouthIn',
      'Accompagnement juridique & financier',
    ],
  },
  {
    rank: '2e Prix',
    amount: '.............',
    amountSub: 'FCFA',
    benefits: ['3 mois de mentorat', 'Visibilité partenaires', 'Kit communication YouthIn'],
  },
  {
    rank: '3e Prix',
    amount: '.............',
    amountSub: 'FCFA',
    benefits: ['1 mois de mentorat', 'Kit communication YouthIn', 'Badge Finaliste'],
  },
  {
    rank: 'Prix Coup de Cœur',
    amount: '.............',
    amountSub: 'FCFA',
    benefits: ['Badge "Coup de Cœur" permanent', 'Mise en avant communauté', 'Session mentor offerte'],
  },
]

// Règles structurées par catégorie
const ruleGroups = [
  {
    category: 'Éligibilité',
    icon: '👤',
    rules: [
      'Avoir entre 18 et 26 ans au 1er janvier 2026',
      'Être de nationalité camerounaise ou résider légalement au Cameroun',
    ],
  },
  {
    category: 'Soumission du projet',
    icon: '📋',
    rules: [
      'Soumission gratuite — aucun frais pour participer',
      '1 seul projet par participant — concentre-toi sur ton meilleur projet',
      'Dossier complet obligatoire : titre, accroche, problème, solution, impact, au moins 1 photo',
      'Projet original et inédit — toute fraude ou plagiat entraîne une disqualification permanente et un badge Fraude visible sur le profil YouthIn',
      'Le projet doit répondre à un besoin réel au Cameroun',
      'Etre disponible pour assister aux formations',
    ],
  },
  {
    category: 'Vote — Application YouthIn',
    icon: '📱',
    rules: [
      'Vote gratuit et illimité dans le temps — 1 seul vote par membre et par projet',
      'Réservé exclusivement aux membres YouthIn avec compte vérifié',
      'Chaque vote compte directement dans le classement temps réel',
      'Toute tentative de manipulation des votes (faux comptes, bots) entraîne la disqualification du projet',
    ],
  },
  {
    category: 'Vote — Site web (public)',
    icon: '🌐',
    rules: [
      'Vote payant à 75 FCFA par vote via MTN Mobile Money ou Orange Money',
      'Ouvert au grand public — pas besoin de compte YouthIn',
      'Les votes web et app sont cumulés dans le même classement',
    ],
  },
  {
    category: 'Sélection & Jury',
    icon: '⚖️',
    rules: [
      'Les Top 50 du classement public passent devant le jury expert',
      'Le jury sélectionne les 20 demi-finalistes sur : pertinence, viabilité, impact local',
      'Les 5 finalistes sont invités à pitcher en personne à Douala le 30 avril 2026',
      'En cas d\'égalité, le jury a le dernier mot — sa décision est définitive',
      'Les lauréats doivent être joignables dans les 72h suivant l\'annonce des résultats',
    ],
  },
  {
    category: 'YouthIn Index™',
    icon: '⚡',
    rules: [
      'La participation au concours génère automatiquement des points sur le YouthIn Index™',
      'Les points sont attribués à chaque étape franchie : soumission, Top 50, demi-finale, finale, victoire',
      'Un projet disqualifié entraîne la perte de tous les points associés',
    ],
  },
]

const stats = [
  { value: '847', label: 'Projets soumis', icon: Upload },
  { value: '12 847', label: 'Membres actifs', icon: Users },
  { value: '4', label: 'Phases', icon: Zap },
  { value: '3,75M', label: 'FCFA en jeu', icon: Trophy },
]

// ── Page principale ────────────────────────────────────────
export default function ConcourPage() {
  const countdown = useCountdown()

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <Header />

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Fond radial */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px]
                          bg-[#DCF763]/[0.04] rounded-full blur-[120px]" />
          <div className="absolute top-40 right-0 w-[400px] h-[400px]
                          bg-[#DCF763]/[0.03] rounded-full blur-[80px]" />
        </div>

        {/* Grille déco */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#DCF763 1px, transparent 1px), linear-gradient(90deg, #DCF763 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Badge statut */}
          <div className="flex items-center gap-3 mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-400">
              Vote en cours — Phase 2 / 4
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Texte */}
            <div>
              <h1 className="text-6xl lg:text-7xl font-black leading-[0.95] mb-6 tracking-tight">
                Le plus grand{' '}
                <span className="text-[#DCF763] inline-block">concours</span>{' '}
                entrepreneurial du Cameroun.
              </h1>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-xl">
                Soumets ton projet. La communauté vote. Les meilleurs remportent
                cash, mentorat et visibilité nationale.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/soumettre">
                  <Button className="bg-[#DCF763] text-black hover:bg-[#DCF763]/90 font-bold
                                     px-8 py-6 text-base rounded-2xl group transition-all duration-200
                                     hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(220,247,99,0.3)]">
                    Soumettre mon projet
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/voter">
                  <Button variant="outline"
                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600
                               font-semibold px-8 py-6 text-base rounded-2xl">
                    Voir le classement en direct
                  </Button>
                </Link>
              </div>
            </div>

            {/* Countdown */}
            <div className="flex flex-col gap-8">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm">
                <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-6">
                  Clôture des votes dans
                </p>
                <div className="flex items-center gap-4 justify-between">
                  <CountUnit value={countdown.days}    label="Jours"    />
                  <span className="text-3xl font-black text-zinc-700 mb-4">:</span>
                  <CountUnit value={countdown.hours}   label="Heures"   />
                  <span className="text-3xl font-black text-zinc-700 mb-4">:</span>
                  <CountUnit value={countdown.minutes} label="Minutes"  />
                  <span className="text-3xl font-black text-zinc-700 mb-4">:</span>
                  <CountUnit value={countdown.seconds} label="Secondes" />
                </div>
              </div>

              {/* Stats en direct */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ value, label, icon: Icon }) => (
                  <div key={label}
                    className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5
                               flex items-center gap-4 hover:border-zinc-700 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#DCF763]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#DCF763]" />
                    </div>
                    <div>
                      <p className="text-xl font-black text-white leading-none">{value}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PHASES ════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#DCF763] text-sm font-bold uppercase tracking-widest mb-3">Déroulement</p>
            <h2 className="text-5xl font-black text-white">Les 4 Phases</h2>
          </div>
          <div className="space-y-4">
            {phases.map((phase, i) => (
              <PhaseCard key={i} phase={phase} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRIX ══════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
                          bg-[#DCF763]/[0.03] rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#DCF763] text-sm font-bold uppercase tracking-widest mb-3">Récompenses</p>
            <h2 className="text-5xl font-black text-white">........... FCFA à remporter</h2>
            <p className="text-zinc-500 mt-4 text-lg">Plus le mentorat, la visibilité et le réseau qui changent tout.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {prizes.map((prize, i) => (
              <PrizeCard key={i} prize={prize} rank={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ RÈGLES ════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#DCF763] text-sm font-bold uppercase tracking-widest mb-3">Conditions</p>
            <h2 className="text-5xl font-black text-white">Règles de Participation</h2>
          </div>

          <div className="space-y-4">
            {ruleGroups.map((group, gi) => (
              <div key={gi} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
                {/* Header catégorie */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-800 bg-zinc-900/80">
                  <span className="text-lg">{group.icon}</span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">{group.category}</h3>
                </div>
                {/* Règles */}
                <div className="px-6 py-5 space-y-4">
                  {group.rules.map((rule, ri) => (
                    <div key={ri} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-[#DCF763]/8 border border-[#DCF763]/15
                                      flex items-center justify-center mt-0.5">
                        <span className="text-[#DCF763] text-[10px] font-black">{ri + 1}</span>
                      </div>
                      <p className="text-zinc-400 leading-relaxed text-sm group-hover:text-zinc-200 transition-colors">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline"
              className="border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 rounded-xl">
              Voir le règlement complet (PDF)
            </Button>
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ═════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Soumettre */}
            <div className="group relative rounded-3xl overflow-hidden border border-[#DCF763]/20
                            bg-gradient-to-br from-[#DCF763]/8 to-transparent
                            p-10 flex flex-col gap-6
                            hover:border-[#DCF763]/40 hover:shadow-[0_0_60px_rgba(220,247,99,0.08)]
                            transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-[#DCF763]/15 flex items-center justify-center
                              group-hover:bg-[#DCF763]/25 transition-colors">
                <Upload className="text-[#DCF763]" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-2">Soumettre un Projet</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Prêt à présenter ta grande  <span className="text-white font-semibold">idée</span> ?
                </p>
              </div>
              <Link href="/soumettre" className="mt-auto">
                <Button className="bg-[#DCF763] text-black hover:bg-[#DCF763]/90 font-bold
                                   w-full py-5 rounded-2xl group/btn transition-all
                                   hover:shadow-[0_0_20px_rgba(220,247,99,0.3)]">
                  Soumettre maintenant
                  <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Voter */}
            <div className="group relative rounded-3xl overflow-hidden border border-zinc-800
                            bg-zinc-900/40
                            p-10 flex flex-col gap-6
                            hover:border-zinc-700 hover:bg-zinc-900/60
                            transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center
                              group-hover:bg-zinc-700 transition-colors">
                <Heart className="text-zinc-300" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-2">Voter pour un Projet</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Découvre les meilleures idées et vote pour tes favoris.
                  Seulement <span className="text-white font-semibold">75 FCFA</span> par vote.
                </p>
              </div>
              <Link href="/voter" className="mt-auto">
                <Button className="bg-zinc-800 text-white hover:bg-zinc-700 font-bold
                                   w-full py-5 rounded-2xl border border-zinc-700
                                   hover:border-zinc-600 transition-all">
                  Voir les Projets
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}