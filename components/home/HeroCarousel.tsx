import { useCallback, useEffect, useRef, useState } from "react"
import {
  ArrowRight, ArrowLeft, Zap, Trophy, Users, BookOpen, PiggyBank, Star,
  ChevronRight, ChevronDown, TrendingUp, Shield, CheckCircle, Clock,
  Link
} from 'lucide-react'

interface Stat { v: string; l: string }

interface Innovation {
  id: number; tag: string; num: string; color: string; colorRgb: string
  Icon: React.ElementType; image: string; imageAlt: string; eyebrow: string
  titleLine1: string; titleLine2: string; titleLine3: string
  subtitle: string; stats: Stat[]; cta: string; href: string; badge: string
}


const INNOVATIONS: Innovation[] = [
  {
    id: 0, tag: 'Concours National', num: '01', color: '#F59E0B', colorRgb: '245,158,11', Icon: Trophy,
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1920&q=85&fit=crop',
    imageAlt: 'Cérémonie entrepreneuriat Douala',
    eyebrow: 'Season 1 · 847 projets soumis',
    titleLine1: 'La compétition', titleLine2: 'qui révèle', titleLine3: 'les meilleurs.',
    subtitle: "7 phases publiques. Du pitch vidéo à la Grande Finale de Douala. Le seul concours africain où l'histoire du porteur de projet compte autant que l'idée.",
    stats: [{ v: '847', l: 'Projets soumis' }, { v: '3,75M', l: 'FCFA en jeu' }, { v: '30 Avr', l: 'Grande Finale' }],
    cta: 'Soumettre un projet', href: '/soumettre', badge: '🗳️ Phase Vote en cours',
  },
  {
    id: 1, tag: 'YouthIn Index™', num: '02', color: '#DCF763', colorRgb: '220,247,99', Icon: Zap,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=85&fit=crop',
    imageAlt: 'Dashboard analytics score entrepreneurial',
    eyebrow: '0 à 1000 pts · 4 piliers',
    titleLine1: 'Ta cote de', titleLine2: 'crédibilité', titleLine3: 'entrepreneuriale.',
    subtitle: "Régularité, Résultats, Réseau, Réputation. Reconnu par les banques partenaires. Remplace le collatéral que les jeunes n'ont pas — pour la première fois en Afrique.",
    stats: [{ v: '1 000', l: 'Score max' }, { v: '4R', l: 'Piliers' }, { v: 'Platinum+', l: 'Rapport PDF' }],
    cta: "Comprendre l'Index™", href: '#index', badge: '⚡ Reconnu par 3 banques',
  },
  {
    id: 2, tag: 'Villages™', num: '03', color: '#14B8A6', colorRgb: '20,184,166', Icon: Users,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=85&fit=crop',
    imageAlt: 'Communauté jeunes entrepreneurs Cameroun',
    eyebrow: '12 847 membres · 4 types de Villages™',
    titleLine1: 'La communauté', titleLine2: 'qui détecte', titleLine3: 'les talents.',
    subtitle: "Par quartier, ville et secteur. L'algorithme YouthIn repère les membres à fort potentiel avant qu'ils le sachent eux-mêmes. Le digital organise le physique.",
    stats: [{ v: '12 847', l: 'Membres actifs' }, { v: '4', l: 'Types Villages™' }, { v: '365j', l: 'Communauté active' }],
    cta: 'Explorer les Villages™', href: '/communaute', badge: '🟢 Makepe · 89 actifs',
  },
  {
    id: 3, tag: 'Mentor Market', num: '04', color: '#8B5CF6', colorRgb: '139,92,246', Icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1920&q=85&fit=crop',
    imageAlt: 'Session mentorat business Afrique Cameroun',
    eyebrow: '200+ mentors certifiés · Mobile Money',
    titleLine1: 'Le marché du', titleLine2: 'mentorat', titleLine3: 'africain.',
    subtitle: "+200 mentors vérifiés dans tous les secteurs. Sessions 1-to-1 payées en Mobile Money. Finance, Tech, BTP, Santé, AgriTech — dans ta langue, dans ton contexte.",
    stats: [{ v: '200+', l: 'Mentors certifiés' }, { v: '1 342', l: 'Sessions ce mois' }, { v: 'MoMo', l: 'Paiement local' }],
    cta: 'Trouver un mentor', href: '/mentors', badge: '⚡ Arnauld Kodo · Elite 891 pts',
  },
]

const SLIDE_DURATION = 6000

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [exiting, setExiting] = useState<number | null>(null)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [animKey, setAnimKey] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number>(0)
  const busyRef = useRef(false)
  const N = INNOVATIONS.length

  const goTo = useCallback((idx: number, dir: 'next' | 'prev' = 'next') => {
    if (busyRef.current || idx === current) return
    busyRef.current = true
    setDirection(dir)
    setExiting(current)
    setCurrent(idx)
    setAnimKey(k => k + 1)
    setProgress(0)
    startRef.current = performance.now()
    setTimeout(() => { setExiting(null); busyRef.current = false }, 800)
  }, [current])

  const next = useCallback(() => goTo((current + 1) % N, 'next'), [current, goTo, N])
  const prev = useCallback(() => goTo((current - 1 + N) % N, 'prev'), [current, goTo, N])

  /* ── Auto-play avec RAF pour progress bar lisse ── */
  useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }
    if (startRef.current === 0) startRef.current = performance.now()
    else startRef.current = performance.now() - (progress / 100) * SLIDE_DURATION

    const tick = (now: number) => {
      const p = Math.min(((now - startRef.current) / SLIDE_DURATION) * 100, 100)
      setProgress(p)
      if (p >= 100) {
        startRef.current = 0
        next()
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [paused, current]) // eslint-disable-line

  const slide = INNOVATIONS[current]

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{ height: '100svh', minHeight: 600, maxHeight: 980, backgroundColor: '#030303' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      {/* ── PHOTO LAYERS ── */}
      {INNOVATIONS.map((s, i) => {
        const isActive = i === current
        const isExit = i === exiting
        if (!isActive && !isExit) return null
        return (
          <div key={s.id}
            className={`absolute inset-0 ${isActive
                ? direction === 'next' ? 'yi-enter-next' : 'yi-enter-prev'
                : direction === 'next' ? 'yi-exit-next' : 'yi-exit-prev'
              }`}
            style={{ zIndex: isActive ? 2 : 1 }}
          >
            {/* Photo avec zoom Ken Burns */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                key={isActive ? `${s.id}-${animKey}` : s.id}
                src={s.image} alt={s.imageAlt}
                className={isActive ? 'yi-img-zoom w-full h-full object-cover' : 'w-full h-full object-cover'}
                style={{ filter: 'brightness(.28) saturate(.55)' }}
              />

              {/* Grain texture — donne du caractère éditorial */}
              <div className="absolute inset-0 pointer-events-none opacity-[.045]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '256px' }} />

              {/* Halo couleur centré-bas */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: `radial-gradient(ellipse 80% 55% at 50% 100%,rgba(${s.colorRgb},.18) 0%,transparent 65%)`
              }} />

              {/* Vignette latérale gauche — lisibilité texte */}
              <div className="absolute inset-y-0 left-0 pointer-events-none"
                style={{ width: '65%', background: 'linear-gradient(to right,rgba(3,3,3,.82) 0%,rgba(3,3,3,.4) 55%,transparent 100%)' }} />

              {/* Fade bas */}
              <div className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{ height: '65%', background: 'linear-gradient(to top,rgba(3,3,3,.96) 0%,rgba(3,3,3,.5) 45%,transparent 100%)' }} />

              {/* Fade haut */}
              <div className="absolute inset-x-0 top-0 pointer-events-none"
                style={{ height: 140, background: 'linear-gradient(to bottom,rgba(3,3,3,.6) 0%,transparent 100%)' }} />
            </div>

            {/* Numéro géant en filigrane — signature éditoriale */}
            {isActive && (
              <div
                key={`num-${s.id}-${animKey}`}
                className="absolute right-[-0.05em] bottom-[10%] fd pointer-events-none select-none leading-none"
                style={{
                  fontSize: 'clamp(160px,22vw,340px)',
                  fontWeight: 700,
                  color: `rgba(${s.colorRgb},.07)`,
                  letterSpacing: '-.04em',
                  animation: 'yiNumReveal .9s cubic-bezier(.16,1,.3,1) .1s both',
                }}
              >
                {s.num}
              </div>
            )}
          </div>
        )
      })}

      {/* ── UI LAYER ── */}
      <div className="relative z-10 flex flex-col h-full">

       

        {/* MIDDLE — Contenu principal */}
        <div className="flex-1 flex items-end pb-2">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid lg:grid-cols-[1fr_240px] gap-10 items-end">

              {/* Texte principal avec stagger */}
              <div key={`text-${current}-${animKey}`} className="yi-stagger space-y-5 sm:space-y-6">

                {/* Ligne 1 — Tag + numéro */}
                <div className="flex items-center gap-4">
                  <span className="fd text-[10px] font-black uppercase tracking-[4px]"
                    style={{ color: `rgba(${slide.colorRgb},.45)` }}>
                    {slide.num}
                  </span>
                  <div className="w-px h-3 opacity-20" style={{ background: slide.color }} />
                  <div className="flex items-center gap-2 rounded-full px-3.5 py-1.5"
                    style={{ background: `rgba(${slide.colorRgb},.1)`, border: `1px solid rgba(${slide.colorRgb},.22)` }}>
                    <slide.Icon size={10} style={{ color: slide.color }} />
                    <span className="fd font-bold text-[10px] uppercase tracking-[3px]" style={{ color: slide.color }}>
                      {slide.tag}
                    </span>
                  </div>
                  <span className="text-zinc-600 text-xs hidden sm:block">{slide.eyebrow}</span>
                </div>

                {/* Titre massif */}
                <div>
                  <h1 className="fd text-white"
                    style={{
                      fontSize: 'clamp(40px,7.5vw,100px)',
                      fontWeight: 700,
                      lineHeight: .9,
                      letterSpacing: '-.04em',
                    }}>
                    <span className="block">{slide.titleLine1}</span>
                    <span className="block" style={{
                      color: slide.color,
                      textShadow: `0 0 80px rgba(${slide.colorRgb},.35)`,
                    }}>
                      {slide.titleLine2}
                    </span>
                    <span className="block">{slide.titleLine3}</span>
                  </h1>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg"
                  style={{ fontWeight: 300 }}>
                  {slide.subtitle}
                </p>

                {/* CTA + badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link href={slide.href}
                    className="group relative inline-flex items-center gap-2.5 fd font-semibold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl overflow-hidden transition-all duration-250 hover:scale-[1.03] active:scale-[.97]"
                    style={{
                      background: slide.color, color: '#030303',
                      boxShadow: `0 0 0 0 rgba(${slide.colorRgb},.4)`,
                    }}>
                    <span className="relative z-10">{slide.cta}</span>
                    <ArrowRight size={15} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent)',
                        animation: 'shimmer 1.5s linear infinite'
                      }} />
                  </Link>
                  <span className="yi-glass text-xs font-medium px-4 py-3 rounded-2xl"
                    style={{ color: `rgba(${slide.colorRgb},.8)` }}>
                    {slide.badge}
                  </span>
                </div>

                {/* Stats 3 cards */}
                <div className="flex flex-wrap gap-2">
                  {slide.stats.map(({ v, l }) => (
                    <div key={l}
                      className="rounded-xl px-4 py-3 transition-all duration-300"
                      style={{
                        background: `rgba(${slide.colorRgb},.07)`,
                        border: `1px solid rgba(${slide.colorRgb},.18)`,
                      }}>
                      <p className="fd font-semibold text-sm sm:text-base leading-none mb-1"
                        style={{ color: slide.color }}>{v}</p>
                      <p className="text-zinc-600 text-[10px] sm:text-xs">{l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots verticaux — desktop uniquement */}
              <div className="hidden lg:flex flex-col gap-3 pb-1">
                {INNOVATIONS.map((s, i) => (
                  <button key={i}
                    onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                    className="flex items-center gap-3.5 group"
                    aria-label={`Innovation ${s.num} — ${s.tag}`}>
                    <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                      {i === current && (
                        <svg className="absolute inset-0" viewBox="0 0 20 20" style={{ transform: 'rotate(-90deg)' }}>
                          <circle cx="10" cy="10" r="8" fill="none" stroke={`rgba(${s.colorRgb},.2)`} strokeWidth="1.5" />
                          <circle cx="10" cy="10" r="8" fill="none" stroke={s.color} strokeWidth="1.5"
                            strokeDasharray={`${2 * Math.PI * 8}`}
                            strokeDashoffset={`${2 * Math.PI * 8 * (1 - progress / 100)}`}
                            style={{ transition: 'stroke-dashoffset 0.1s linear' }} />
                        </svg>
                      )}
                      <div className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                        style={{
                          background: i === current ? s.color : 'rgba(255,255,255,.2)',
                          transform: i === current ? 'scale(1)' : 'scale(0.75)'
                        }} />
                    </div>
                    <span className="text-[11px] font-medium transition-all duration-300 leading-tight"
                      style={{ color: i === current ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.2)' }}>
                      {s.tag}
                    </span>
                  </button>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM BAR — navigation + progress */}
        <div className="flex-shrink-0 px-6 sm:px-10 lg:px-16 py-5 sm:py-6">
          <div className="max-w-7xl mx-auto flex items-center gap-3 sm:gap-4">

            {/* Prev */}
            <button onClick={prev} aria-label="Précédent"
              className="yi-nav yi-glass w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0">
              <ArrowLeft size={13} className="text-zinc-400" />
            </button>

            {/* Barres de progression */}
            <div className="flex gap-1.5 flex-1">
              {INNOVATIONS.map((_, i) => (
                <button key={i}
                  onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                  className="flex-1 rounded-full overflow-hidden transition-all duration-300"
                  style={{
                    height: i === current ? 3 : 2,
                    background: 'rgba(255,255,255,.08)'
                  }}
                  aria-label={`Slide ${i + 1}`}>
                  <div className="h-full rounded-full"
                    style={{
                      width: i === current ? `${progress}%` : i < current ? '100%' : '0%',
                      background: i === current ? slide.color : i < current ? `rgba(${slide.colorRgb},.4)` : 'transparent',
                      transition: i === current ? 'none' : 'none',
                    }} />
                </button>
              ))}
            </div>

            {/* Next */}
            <button onClick={next} aria-label="Suivant"
              className="yi-nav yi-glass w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0">
              <ArrowRight size={13} className="text-zinc-400" />
            </button>

            {/* Compteur */}
            <div className="flex items-baseline gap-1 flex-shrink-0 ml-1">
              <span className="fd font-bold text-xl" style={{ color: slide.color, letterSpacing: '-.04em' }}>
                {String(current + 1).padStart(2, '0')}
              </span>
              <span className="text-zinc-800 text-sm font-light">/</span>
              <span className="text-zinc-600 text-sm">
                {String(N).padStart(2, '0')}
              </span>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}