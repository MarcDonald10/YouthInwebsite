'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  ArrowRight, ArrowLeft, Zap, Trophy, Users, BookOpen, PiggyBank, Star,
  ChevronRight, ChevronDown, TrendingUp, Shield, CheckCircle, Clock
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SLabel } from '@/components/home/SLabel'
import { Cursor } from '@/components/home/Cursor'
import { HeroCarousel } from '@/components/home/HeroCarousel'
/* ─── GLOBAL STYLES ────────────────────────────────────────── */
const G = `
  @import url('https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes heroReveal{from{opacity:0;transform:translateY(50px) skewY(1.5deg)}to{opacity:1;transform:none}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
  @keyframes pulseBtn{0%,100%{box-shadow:0 0 0 0 rgba(220,247,99,0)}50%{box-shadow:0 0 28px 6px rgba(220,247,99,.17)}}
  @keyframes scanline{from{transform:translateY(-100%)}to{transform:translateY(200vh)}}
  @keyframes floatCard{0%,100%{transform:translateY(0) rotate(0deg)}40%{transform:translateY(-9px) rotate(.6deg)}70%{transform:translateY(4px) rotate(-.6deg)}}
  @keyframes shimmer{from{background-position:-200% center}to{background-position:200% center}}
  @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes barIn{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @keyframes borderRun{0%{background-position:0% 50%}100%{background-position:200% 50%}}
  @keyframes heroPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.8;transform:scale(1.1)}}
  @keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
  @keyframes yiEnterNext{from{opacity:0;transform:translateX(4%) scale(1.015)}to{opacity:1;transform:none}}
  @keyframes yiExitNext{from{opacity:1;transform:none}to{opacity:0;transform:translateX(-4%) scale(.985)}}
  @keyframes yiEnterPrev{from{opacity:0;transform:translateX(-4%) scale(1.015)}to{opacity:1;transform:none}}
  @keyframes yiExitPrev{from{opacity:1;transform:none}to{opacity:0;transform:translateX(4%) scale(.985)}}
  @keyframes yiImgZoom{from{transform:scale(1.07)}to{transform:scale(1)}}
  @keyframes yiContentIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
  @keyframes yiBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}
  @keyframes yiNumReveal{from{opacity:0;transform:translateX(3%)}to{opacity:1;transform:none}}
  .fd{font-family:'Clash Display',sans-serif}
  .yi-enter-next{animation:yiEnterNext .7s cubic-bezier(.16,1,.3,1) forwards}
  .yi-exit-next{animation:yiExitNext .65s cubic-bezier(.4,0,1,1) forwards}
  .yi-enter-prev{animation:yiEnterPrev .7s cubic-bezier(.16,1,.3,1) forwards}
  .yi-exit-prev{animation:yiExitPrev .65s cubic-bezier(.4,0,1,1) forwards}
  .yi-img-zoom{animation:yiImgZoom 6s ease-out forwards}
  .yi-stagger>*{opacity:0;animation:yiContentIn .55s cubic-bezier(.16,1,.3,1) forwards}
  .yi-stagger>*:nth-child(1){animation-delay:.1s}
  .yi-stagger>*:nth-child(2){animation-delay:.2s}
  .yi-stagger>*:nth-child(3){animation-delay:.3s}
  .yi-stagger>*:nth-child(4){animation-delay:.4s}
  .yi-stagger>*:nth-child(5){animation-delay:.5s}
  .yi-glass{backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);background:rgba(0,0,0,.38);border:1px solid rgba(255,255,255,.09)}
  .yi-nav{backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);transition:all .22s ease}
  .yi-nav:hover{transform:scale(1.06)}
  .yi-nav:active{transform:scale(.94)}
  .yi-bounce{animation:yiBounce 2s ease-in-out infinite}
  .shimmer{background:linear-gradient(90deg,#DCF763 0%,#fff 35%,#DCF763 55%,#fff 80%,#DCF763 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
  .mq{animation:marquee 22s linear infinite}
  .mq:hover{animation-play-state:paused}
  .rv{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}
  .rv.on{opacity:1;transform:none}
  .cd{position:fixed;pointer-events:none;z-index:9999;mix-blend-mode:difference;border-radius:50%;transition:transform .15s}
  .cr{position:fixed;pointer-events:none;z-index:9998;border-radius:50%;transition:transform .15s}
  .cg:hover{box-shadow:0 0 0 1px rgba(220,247,99,.14),0 24px 80px rgba(0,0,0,.7)}
  .bar{transform-origin:left;animation:barIn 1s cubic-bezier(.16,1,.3,1) var(--d,0s) both}
  .lborder{background:linear-gradient(#030303,#030303) padding-box,linear-gradient(90deg,#DCF763,rgba(220,247,99,.2),#DCF763) border-box;border:1px solid transparent;background-size:200% 100%;animation:borderRun 3s linear infinite}
  .cg:hover{box-shadow:0 0 0 1px rgba(220,247,99,.14),0 24px 80px rgba(0,0,0,.7)}
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}.rv{opacity:1!important;transform:none!important}}
  @media(hover:none),(pointer:coarse){.cd,.cr{display:none!important}}
`
/* ─── TYPES ────────────────────────────────────────────────── */
interface Stat { v: string; l: string }
interface Innovation {
  id: number; tag: string; num: string; color: string; colorRgb: string
  Icon: React.ElementType; image: string; imageAlt: string; eyebrow: string
  titleLine1: string; titleLine2: string; titleLine3: string
  subtitle: string; stats: Stat[]; cta: string; href: string; badge: string
}

/* ─── CAROUSEL DATA ─────────────────────────────────────────── */
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

const PILLARS = [
  { emoji: '🏆', tag: 'Concours', href: '/concours', color: '#F59E0B', title: 'Compétis.\nGagne.\nGrandis.', desc: "Un concours national 7 phases. Idée ou prototype uniquement. Grande Finale à Douala. Jusqu'à 2 000 000 FCFA.", cta: 'Voir le concours', kpi: { v: '847', l: 'Projets soumis' } },
  { emoji: '\u{1F468}\u200d\u{1F3EB}', tag: 'Mentor Market', href: '/mentors', color: '#8B5CF6', title: 'Apprends\ndes meilleurs.', desc: '+200 mentors vérifiés dans tous les secteurs. Sessions 1-to-1 payées en Mobile Money. Finance, Tech, BTP, Santé, AgriTech.', cta: 'Trouver un mentor', kpi: { v: '1 342', l: 'Sessions ce mois' } },
  { emoji: '⚡', tag: 'YouthIn Index™', href: '#index', color: '#DCF763', title: 'Ton score\nde crédibilité.', desc: 'De 0 à 1000 pts sur 4 piliers. Reconnu par les banques partenaires. Rapport officiel PDF transmissible.', cta: "Comprendre l'Index", kpi: { v: '891', l: 'Score Elite max' } },
  { emoji: '🏘️', tag: 'Villages™', href: '/communaute', color: '#14B8A6', title: 'Ta\ncommunauté\nlocale.', desc: "Rejoins le Village™ de ton quartier, ta ville, ton secteur. Publie. Partage. Attire l'équipe YouthIn.", cta: 'Rejoindre', kpi: { v: '12 847', l: 'Membres actifs' } },
]

const LEVELS = [
  { emoji: '🥉', label: 'Bronze', range: '0–199', color: '#CD7F32', w: '20%', desc: 'Voter · Villages™ · Feed communautaire' },
  { emoji: '🥈', label: 'Silver', range: '200–399', color: '#9E9E9E', w: '40%', desc: 'Soumettre au concours · Formations avancées' },
  { emoji: '🥇', label: 'Gold', range: '400–599', color: '#F59E0B', w: '60%', desc: 'Mentor certifié · Badge vérifié sur le profil' },
  { emoji: '💎', label: 'Platinum', range: '600–799', color: '#A78BFA', w: '80%', desc: 'Rapport bancaire PDF · Dossier investisseurs' },
  { emoji: '⚡', label: 'Elite', range: '800–1000', color: '#DCF763', w: '100%', desc: 'Jury concours · Featured · Transmis aux banques' },
]

const TESTIMONIALS = [
  { name: 'Fatima Mbarga', loc: 'Yaoundé · AgriTech', lvl: 'Gold · 521 pts', init: 'FM', color: '#F59E0B', q: "En 3 mois, mon projet AgriConnect a reçu 3 847 votes. J'ai signé mon premier partenariat commercial. YouthIn m'a donné la visibilité que je n'avais pas." },
  { name: 'Arnauld Kodo', loc: 'Mentor Elite · 87 sessions', lvl: 'Elite · 891 pts', init: 'AK', color: '#DCF763', q: "La qualité des entrepreneurs camerounais m'impressionne. Ce qu'il leur manque, c'est l'accès. YouthIn est exactement cet accès." },
  { name: 'Donald Baliaba', loc: 'Douala · Tech/Digital', lvl: 'Gold · 642 pts', init: 'DB', color: '#8B5CF6', q: "Grâce au YouthIn Index™, une banque partenaire m'a accordé un microcrédit sans collatéral. Mon score a parlé pour moi." },
]

const LEADERBOARD = [
  { rank: 1, name: 'AgriConnect Cameroun', founder: 'Fatima Mbarga', sector: 'AgriTech', votes: 3847, delta: '+284', color: '#F59E0B', av: 'FM' },
  { rank: 2, name: 'TechServices BTP', founder: 'Donald Baliaba', sector: 'Tech/Digital', votes: 2841, delta: '+156', color: '#DCF763', av: 'DB' },
  { rank: 3, name: 'MediCam Téléconsult.', founder: 'Dr. Sarah Fotso', sector: 'Santé', votes: 2103, delta: '+98', color: '#EC4899', av: 'SF' },
  { rank: 4, name: 'EcoTextile Cameroun', founder: 'Amina Ngassa', sector: 'Mode', votes: 1924, delta: '+67', color: '#8B5CF6', av: 'AN' },
  { rank: 5, name: 'SolarKit Rural', founder: 'E. Tchouata', sector: 'Énergie', votes: 1587, delta: '+45', color: '#14B8A6', av: 'ET' },
]

const VILLAGES_LIVE = [
  { name: 'Village™ Makepe', city: 'Douala', members: 342, active: 89, type: 'Quartier', color: '#DCF763', trend: true },
  { name: 'YouthIn Yaoundé', city: 'Yaoundé', members: 2847, active: 421, type: 'Ville', color: '#F59E0B', trend: true },
  { name: 'Tech/Digital Cameroun', city: 'National', members: 1876, active: 312, type: 'Secteur', color: '#8B5CF6', trend: false },
  { name: 'Village™ Akwa', city: 'Douala', members: 218, active: 54, type: 'Quartier', color: '#14B8A6', trend: false },
  { name: 'AgriTech Cameroun', city: 'National', members: 934, active: 187, type: 'Secteur', color: '#EC4899', trend: true },
  { name: 'YouthIn Bafoussam', city: 'Bafoussam', members: 1124, active: 203, type: 'Ville', color: '#F59E0B', trend: false },
]

const ROADMAP = [
  { date: 'Déc 2024', event: 'Fondation YouthIn', desc: "Création de l'équipe fondatrice à Douala. Début du développement app + site.", done: true, color: '#22C55E' },
  { date: 'Fév 2025', event: 'Beta privée', desc: '500 membres testeurs. Villages™ pilotes à Douala et Yaoundé.', done: true, color: '#22C55E' },
  { date: 'Oct 2025', event: 'Lancement officiel', desc: 'App sur App Store + Google Play. 5 000 membres en 30 jours.', done: true, color: '#22C55E' },
  { date: 'Fév 2026', event: 'Concours Season 1', desc: 'Ouverture soumissions. 847 projets en 28 jours. Record absolu.', done: true, color: '#DCF763' },
  { date: '30 Avr 2026', event: 'Grande Finale', desc: 'Cérémonie à Douala. 5 finalistes. 3 750 000 FCFA distribués. Live national.', done: false, color: '#F59E0B' },
  { date: 'S2 2026', event: 'Expansion Nationale', desc: '8 nouvelles villes. 50 000 membres cibles.', done: false, color: '#8B5CF6' },
  { date: '2027', event: 'YouthIn Afrique', desc: "Expansion vers la Côte d'Ivoire et le Sénégal.", done: false, color: '#A78BFA' },
]

const TRUST = [
  { Icon: Shield, label: 'Mentors vérifiés', desc: "Chaque mentor est validé par l'équipe YouthIn avant publication." },
  { Icon: CheckCircle, label: 'Milestones validés', desc: 'Validés par 3 pairs Platinum/Elite — jamais auto-déclarés.' },
  { Icon: TrendingUp, label: 'Score en temps réel', desc: 'Le YouthIn Index™ se met à jour à chaque action concrète.' },
  { Icon: Clock, label: 'Support 6j/7', desc: "L'équipe YouthIn répond en moins de 24h à chaque message." },
]

const FAQ_DATA = [
  { q: 'YouthIn est-il gratuit ?', a: "L'app est entièrement gratuite. Les sessions mentor sont payantes (tarif fixé par le mentor). La soumission au concours est gratuite. Les votes sur le site coûtent 75 FCFA. Dans l'app, le vote est gratuit pour les membres vérifiés." },
  { q: 'Comment fonctionne le YouthIn Index™ ?', a: "Score de 0 à 1000 pts sur 4 piliers : Régularité (20%), Résultats (40%), Réseau (15%) et Réputation (25%). Le score monte avec chaque action concrète : milestone validé, session mentor, participation concours, engagement communautaire." },
  { q: 'Qui peut participer au concours ?', a: "Tout jeune de 18 à 35 ans au Cameroun avec un compte YouthIn vérifié. Projets en phase idée ou prototype uniquement. 1 seul projet par participant. Soumission gratuite." },
  { q: "Qu'est-ce qu'un Village™ ?", a: "Un espace communautaire structuré avec chat, fil d'actu, événements et détection de talents. 4 types : National, Ville, Quartier et Secteur. Chaque Village™ a ses propres activités et rencontres physiques mensuelles." },
  { q: 'Comment le YouthIn Index™ est reconnu par les banques ?', a: 'Les membres Platinum et Elite peuvent générer un rapport PDF officiel avec QR code de vérification, transmissible directement aux banques partenaires.' },
  { q: "Comment rejoindre l'équipe YouthIn ?", a: 'YouthIn recrute des ambassadeurs dans chaque ville. Les membres Elite avec un fort engagement sont prioritairement approchés. Contact : careers@youthin.cm' },
]

const MQ = ['🇨🇲 Cameroun', '🏆 3 750 000 FCFA', '⚡ YouthIn Index™', '🏘️ Villages™', '👨‍🏫 Mentor Market', '🌍 12 847 Membres', '📈 Concours Season 1', '🥇 Grande Finale Douala', '💎 Platinum · Elite', '🚀 Entrepreneuriat Africain', '🎯 Milestones validés', '🤝 Mentor certifié', '📱 App gratuite']




/* ─── HOOKS & UTILITIES ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') }), { threshold: .08 })
    els.forEach(el => obs.observe(el)); return () => obs.disconnect()
  }, [])
}

function useCoarsePointer() {
  const [v, setV] = useState(false)
  useEffect(() => { const mq = window.matchMedia('(hover:none),(pointer:coarse)'); const u = () => setV(mq.matches); u(); mq.addEventListener('change', u); return () => mq.removeEventListener('change', u) }, [])
  return v
}

function Count({ n, sfx = '' }: { n: number; sfx?: string }) {
  const [v, setV] = useState(0); const ref = useRef<HTMLSpanElement>(null); const go = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !go.current) { go.current = true; const t0 = performance.now(); const run = (now: number) => { const p = Math.min((now - t0) / 2000, 1); const ease = 1 - Math.pow(1 - p, 4); setV(Math.round(ease * n)); if (p < 1) requestAnimationFrame(run) }; requestAnimationFrame(run) }
    }, { threshold: .5 })
    if (ref.current) obs.observe(ref.current); return () => obs.disconnect()
  }, [n])
  return <span ref={ref}>{v.toLocaleString('fr-FR')}{sfx}</span>
}



/* ─── PAGE ──────────────────────────────────────────────────── */
export default function Home() {
  useReveal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const coarse = useCoarsePointer()

  return (
    <main className="min-h-screen text-white overflow-x-hidden"
      style={{ backgroundColor: '#030303', cursor: coarse ? 'auto' : 'none', fontFamily: "'DM Sans',sans-serif" }}>
      <style>{G}</style>
      {!coarse && <Cursor />}
      <Header />

      {/* ── HERO CAROUSEL ── */}
      <HeroCarousel />

      {/* MARQUEE */}
      <div className="border-y overflow-hidden py-3.5" style={{ borderColor: 'rgba(220,247,99,.07)' }}>
        <p className="sr-only">Points clés YouthIn.</p>
        <div className="flex whitespace-nowrap" aria-hidden="true">
          <div className="mq flex gap-10 sm:gap-12 items-center pr-12">
            {[...MQ, ...MQ].map((item, i) => (
              <span key={i} className="text-xs sm:text-sm font-semibold tracking-widest flex-shrink-0" style={{ color: i % 2 === 0 ? 'rgba(220,247,99,.7)' : 'rgba(255,255,255,.18)' }}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b" style={{ borderColor: 'rgba(255,255,255,.04)', background: 'rgba(255,255,255,.013)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {[{ n: 12847, s: '', l: 'Entrepreneurs', sub: 'inscrits' }, { n: 847, s: '', l: 'Projets', sub: 'soumis' }, { n: 200, s: '+', l: 'Mentors', sub: 'vérifiés' }, { n: 10, s: '', l: 'Régions', sub: 'couvertes' }].map(({ n, s, l, sub }, i) => (
            <div key={i} className="rv text-center" style={{ transitionDelay: `${i * .1}s` }}>
              <p className="fd tabular-nums mb-1 leading-none" style={{ fontSize: 'clamp(28px,5vw,54px)', fontWeight: 700, color: '#DCF763', letterSpacing: '-.04em' }}><Count n={n} sfx={s} /></p>
              <p className="text-white font-medium text-xs sm:text-sm mt-1">{l}</p>
              <p className="text-zinc-600 text-xs">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLASSEMENT */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rv flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-14">
            <div>
              <SLabel>Concours Season 1</SLabel>
              <h2 className="fd text-white" style={{ fontSize: 'clamp(28px,5vw,64px)', fontWeight: 700, lineHeight: .95, letterSpacing: '-.03em' }}>Top 5 du classement<br /><span style={{ color: '#DCF763' }}>en ce moment.</span></h2>
            </div>
            <div className="flex flex-row sm:flex-col items-start sm:items-end gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: 'rgba(220,247,99,.7)' }}>
                <span className="relative flex h-2 w-2 flex-shrink-0"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" /></span>
                Temps réel
              </div>
              <Link href="/voter" className="flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white transition-all whitespace-nowrap">Classement complet <ArrowRight size={13} /></Link>
            </div>
          </div>
          <div className="space-y-2.5 sm:space-y-3 rv" style={{ transitionDelay: '.1s' }}>
            {LEADERBOARD.map((p, i) => (
              <div key={i} className={`group flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${i === 0 ? 'lborder' : ''}`}
                style={{ background: i === 0 ? 'rgba(220,247,99,.04)' : 'rgba(255,255,255,.025)', borderColor: i === 0 ? 'transparent' : 'rgba(255,255,255,.07)' }}>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center fd font-semibold text-xs sm:text-sm flex-shrink-0" style={{ background: i < 3 ? `${p.color}20` : 'rgba(255,255,255,.05)', color: i < 3 ? p.color : '#888' }}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${p.rank}`}
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-black text-xs sm:text-sm text-black flex-shrink-0" style={{ background: p.color }}>{p.av}</div>
                <div className="flex-1 min-w-0">
                  <p className="fd font-semibold text-white text-xs sm:text-sm truncate">{p.name}</p>
                  <p className="text-zinc-600 text-[10px] sm:text-xs truncate"><span className="hidden sm:inline">{p.founder} · </span>{p.sector}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="fd font-semibold text-white text-sm sm:text-base">{p.votes.toLocaleString('fr-FR')}</p>
                  <p className="text-[10px] sm:text-xs" style={{ color: '#22C55E' }}>{p.delta}</p>
                </div>
                <div className="w-20 hidden md:block flex-shrink-0">
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.06)' }}>
                    <div className="h-full rounded-full" style={{ width: `${(p.votes / 3847) * 100}%`, background: p.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 sm:mt-8 rv" style={{ transitionDelay: '.3s' }}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-zinc-600">
              <span>🗳️ Sur le site : <span className="text-white font-semibold">75 FCFA / vote</span></span>
              <span className="hidden sm:block text-zinc-800">·</span>
              <span>📱 Dans l'app : <span style={{ color: '#DCF763' }} className="font-semibold">Gratuit</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* PILIERS */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: 'rgba(255,255,255,.04)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="rv text-center mb-14 sm:mb-20">
            <SLabel>L'écosystème complet</SLabel>
            <h2 className="fd mb-4 sm:mb-5 text-white" style={{ fontSize: 'clamp(30px,6vw,72px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-.03em' }}>Tout ce dont tu as besoin<br className="hidden sm:block" /> <span style={{ color: '#DCF763' }}>pour réussir.</span></h2>
            <p className="text-zinc-500 text-base sm:text-xl max-w-xl mx-auto" style={{ fontWeight: 300 }}>YouthIn n'est pas juste une app. C'est un écosystème complet pensé pour l'entrepreneur camerounais.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => (
              <Link key={i} href={p.href}>
                <div className="group relative rounded-3xl border overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1.5 cg rv" style={{ borderColor: 'rgba(255,255,255,.06)', background: `linear-gradient(135deg,${p.color}10,${p.color}04)`, transitionDelay: `${i * .08}s` }}>
                  <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg,transparent,${p.color},transparent)` }} />
                  <div className="p-7 sm:p-9 lg:p-12">
                    <div className="flex items-start justify-between mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="text-4xl sm:text-5xl" style={{ display: 'inline-block', animation: `floatCard ${4 + i * .6}s ease-in-out infinite ${i * .4}s` }}>{p.emoji}</span>
                        <span className="text-xs font-black uppercase tracking-[3px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border" style={{ color: p.color, borderColor: `${p.color}30`, background: `${p.color}10` }}>{p.tag}</span>
                      </div>
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center group-hover:bg-white/5 transition-all flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,.1)' }}>
                        <ArrowRight size={14} className="text-zinc-700 group-hover:text-zinc-300 transition-all" />
                      </div>
                    </div>
                    <h3 className="fd mb-3 sm:mb-4 whitespace-pre-line text-white" style={{ fontSize: 'clamp(20px,3vw,34px)', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.05 }}>{p.title}</h3>
                    <p className="text-zinc-500 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base" style={{ fontWeight: 300 }}>{p.desc}</p>
                    <div className="flex items-end justify-between">
                      <div><p className="fd font-semibold text-xl sm:text-2xl" style={{ color: p.color }}>{p.kpi.v}</p><p className="text-zinc-700 text-xs mt-0.5">{p.kpi.l}</p></div>
                      <p className="text-xs sm:text-sm font-semibold flex items-center gap-1.5" style={{ color: p.color }}>{p.cta}<ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" /></p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INDEX */}
      <section id="index" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 border-y pointer-events-none" style={{ borderColor: 'rgba(220,247,99,.04)', background: 'rgba(255,255,255,.01)' }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start lg:items-center">
            <div className="rv">
              <SLabel>YouthIn Index™</SLabel>
              <h2 className="fd mb-5 sm:mb-6" style={{ fontSize: 'clamp(28px,5vw,60px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-.03em' }}>
                <span className="text-white">La cote de crédibilité</span><br /><span style={{ color: '#DCF763' }}>entrepreneuriale.</span>
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-5 max-w-lg" style={{ fontWeight: 300 }}>Là où les banques refusent les jeunes faute d'historique financier, le YouthIn Index™ crée cet historique — basé sur le comportement réel.</p>
              <p className="text-zinc-600 leading-relaxed mb-8 sm:mb-12 max-w-lg text-sm sm:text-base">Score 0–1000 pts · 4 piliers : Régularité, Résultats, Réseau, Réputation.</p>
              <div className="flex flex-wrap gap-3">
                {[['1 000', 'Score max'], ['4R', 'Piliers'], ['PDF', 'Rapport Platinum+'], ['3×', 'Banques partenaires']].map(([v, l]) => (
                  <div key={l} className="rounded-2xl border px-4 sm:px-5 py-3 sm:py-4" style={{ background: 'rgba(255,255,255,.03)', borderColor: 'rgba(255,255,255,.07)' }}>
                    <p className="fd font-semibold text-xl sm:text-2xl text-white">{v}</p>
                    <p className="text-zinc-600 text-xs mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2 sm:space-y-2.5 rv" style={{ transitionDelay: '.2s' }}>
              {LEVELS.map((lvl, i) => (
                <div key={i} className="group flex items-center gap-3 sm:gap-5 rounded-2xl border px-4 sm:px-5 py-3.5 sm:py-4 transition-all duration-300 cursor-default hover:-translate-x-1"
                  style={{ background: 'rgba(255,255,255,.025)', borderColor: 'rgba(255,255,255,.06)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${lvl.color}40`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.06)')}>
                  <span className="text-xl sm:text-2xl flex-shrink-0">{lvl.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-0.5 flex-wrap">
                      <p className="fd font-semibold text-white text-xs sm:text-sm">{lvl.label}</p>
                      <span className="text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded" style={{ color: lvl.color, background: `${lvl.color}15` }}>{lvl.range} pts</span>
                    </div>
                    <p className="text-zinc-600 text-[10px] sm:text-xs truncate">{lvl.desc}</p>
                  </div>
                  <div className="w-14 sm:w-20 h-1 rounded-full flex-shrink-0 overflow-hidden" style={{ background: 'rgba(255,255,255,.06)' }}>
                    <div className="h-full rounded-full bar" style={{ width: lvl.w, background: lvl.color, '--d': `${.3 + i * .08}s` } as React.CSSProperties} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VILLAGES */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rv flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-14">
            <div>
              <SLabel>Communauté · Villages™</SLabel>
              <h2 className="fd text-white" style={{ fontSize: 'clamp(28px,5vw,64px)', fontWeight: 700, lineHeight: .95, letterSpacing: '-.03em' }}>Ton Village™<br /><span style={{ color: '#DCF763' }}>t'attend.</span></h2>
            </div>
            <Link href="/communaute" className="self-start sm:self-auto flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white transition-all whitespace-nowrap">Explorer les Villages™ <ArrowRight size={13} /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 rv" style={{ transitionDelay: '.1s' }}>
            {VILLAGES_LIVE.map((v, i) => (
              <div key={i} className="group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer" style={{ background: `linear-gradient(135deg,${v.color}08,rgba(255,255,255,.02))`, borderColor: 'rgba(255,255,255,.07)' }}>
                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg,transparent,${v.color},transparent)` }} />
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="min-w-0 flex-1 mr-3">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md flex-shrink-0" style={{ color: v.color, background: `${v.color}15` }}>{v.type}</span>
                        {v.trend && <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 flex-shrink-0"><TrendingUp size={10} />Trending</span>}
                      </div>
                      <h3 className="fd font-semibold text-white text-xs sm:text-sm mt-1 truncate">{v.name}</h3>
                      <p className="text-zinc-600 text-xs">{v.city}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: '#22C55E' }} />
                      <span className="text-[10px] sm:text-xs text-emerald-400 font-semibold whitespace-nowrap">{v.active} actifs</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-600 text-xs"><span className="text-zinc-300 font-semibold">{v.members.toLocaleString('fr-FR')}</span> membres</p>
                    <div className="w-16 sm:w-20 h-1 rounded-full overflow-hidden flex-shrink-0" style={{ background: 'rgba(255,255,255,.06)' }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min((v.active / v.members) * 100 * 3, 100)}%`, background: v.color }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-y" style={{ borderColor: 'rgba(255,255,255,.04)', background: 'rgba(255,255,255,.01)' }}>
        <div className="max-w-3xl sm:max-w-5xl mx-auto">
          <div className="rv text-center mb-12 sm:mb-16">
            <SLabel>Historique & Vision</SLabel>
            <h2 className="fd text-white" style={{ fontSize: 'clamp(28px,5vw,64px)', fontWeight: 700, lineHeight: .95, letterSpacing: '-.03em' }}>Notre parcours.<br /><span style={{ color: '#DCF763' }}>Notre cap.</span></h2>
          </div>
          <div className="relative rv" style={{ transitionDelay: '.1s' }}>
            <div className="absolute left-[21px] top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom,transparent,rgba(220,247,99,.2),rgba(220,247,99,.1),transparent)' }} />
            <div className="space-y-0">
              {ROADMAP.map((item, i) => (
                <div key={i} className="flex gap-5 sm:gap-8 group">
                  <div className="flex flex-col items-center flex-shrink-0" style={{ width: 42 }}>
                    <div className="relative w-[18px] h-[18px] rounded-full border-2 mt-1.5 z-10 transition-all duration-300 group-hover:scale-125 flex-shrink-0" style={{ borderColor: item.color, background: item.done ? item.color : '#030303' }}>
                      {item.done && <div className="absolute inset-0 rounded-full animate-pulse" style={{ background: `${item.color}30` }} />}
                    </div>
                  </div>
                  <div className={`pb-8 sm:pb-10 flex-1 min-w-0 ${i === ROADMAP.length - 1 ? 'pb-0' : ''}`}>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest flex-shrink-0" style={{ color: item.color }}>{item.date}</span>
                      {item.done ? <span className="text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">Accompli</span> : <span className="text-[10px] sm:text-xs font-bold text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-md">À venir</span>}
                    </div>
                    <h3 className="fd font-semibold text-white mb-1 sm:mb-1.5 text-sm sm:text-base">{item.event}</h3>
                    <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed" style={{ fontWeight: 300 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rv flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 sm:mb-16">
            <div>
              <SLabel>Témoignages</SLabel>
              <h2 className="fd text-white" style={{ fontSize: 'clamp(30px,6vw,72px)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: .95 }}>Ce qu'ils<br />disent.</h2>
            </div>
            <p className="text-zinc-600 max-w-xs text-sm" style={{ fontWeight: 300 }}>Des entrepreneurs réels. Des résultats réels.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="group relative rounded-3xl border overflow-hidden transition-all duration-400 hover:-translate-y-1.5 cg rv" style={{ background: 'rgba(255,255,255,.025)', borderColor: 'rgba(255,255,255,.07)', transitionDelay: `${i * .1}s` }}>
                <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 pointer-events-none" style={{ background: `linear-gradient(to bottom,${t.color}08,transparent)` }} />
                <div className="absolute top-4 sm:top-5 right-5 sm:right-6 fd leading-none select-none pointer-events-none" style={{ fontSize: 60, color: `${t.color}10`, fontWeight: 700 }}>"</div>
                <div className="relative p-6 sm:p-8">
                  <div className="flex gap-0.5 mb-4 sm:mb-6">{[...Array(5)].map((_, j) => <Star key={j} size={12} className="fill-[#DCF763] text-[#DCF763]" />)}</div>
                  <p className="text-zinc-300 leading-relaxed mb-6 sm:mb-8 relative z-10 text-sm sm:text-base" style={{ fontWeight: 300 }}>"{t.q}"</p>
                  <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,.06)' }}>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-black text-xs sm:text-sm text-black flex-shrink-0" style={{ background: t.color }}>{t.init}</div>
                    <div className="min-w-0 flex-1"><p className="fd font-semibold text-white text-xs sm:text-sm">{t.name}</p><p className="text-zinc-700 text-[10px] sm:text-xs truncate">{t.loc}</p></div>
                    <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl flex-shrink-0" style={{ color: t.color, background: `${t.color}12` }}>{t.lvl}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIANCE */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-y" style={{ borderColor: 'rgba(255,255,255,.04)', background: 'rgba(255,255,255,.01)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="rv text-center mb-10 sm:mb-14">
            <SLabel>Pourquoi nous faire confiance</SLabel>
            <h2 className="fd text-white" style={{ fontSize: 'clamp(26px,4vw,54px)', fontWeight: 700, letterSpacing: '-.03em' }}>Construit pour durer.<br /><span style={{ color: '#DCF763' }}>Conçu pour toi.</span></h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 rv" style={{ transitionDelay: '.1s' }}>
            {TRUST.map(({ Icon, label, desc }, i) => (
              <div key={i} className="group rounded-2xl border p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 cg" style={{ background: 'rgba(255,255,255,.02)', borderColor: 'rgba(255,255,255,.07)' }}>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-4 sm:mb-5 transition-all group-hover:scale-110" style={{ background: 'rgba(220,247,99,.1)', border: '1px solid rgba(220,247,99,.2)' }}>
                  <Icon size={16} color="#DCF763" />
                </div>
                <h3 className="fd font-semibold text-white text-xs sm:text-sm mb-1.5 sm:mb-2">{label}</h3>
                <p className="text-zinc-600 text-[10px] sm:text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="rv text-center mb-10 sm:mb-14">
            <SLabel>Questions fréquentes</SLabel>
            <h2 className="fd text-white" style={{ fontSize: 'clamp(28px,5vw,58px)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: .95 }}>Tu as des<br /><span style={{ color: '#DCF763' }}>questions ?</span></h2>
          </div>
          <div className="space-y-2.5 sm:space-y-3 rv" style={{ transitionDelay: '.1s' }}>
            {FAQ_DATA.map((item, i) => (
              <div key={i} className="rounded-2xl border overflow-hidden transition-all duration-200" style={{ background: openFaq === i ? 'rgba(220,247,99,.04)' : 'rgba(255,255,255,.025)', borderColor: openFaq === i ? 'rgba(220,247,99,.2)' : 'rgba(255,255,255,.07)' }}>
                <button className="w-full text-left flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <p className="fd font-semibold text-white text-xs sm:text-sm leading-relaxed">{item.q}</p>
                  <div className="flex-shrink-0 transition-transform duration-300" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>
                    <ChevronDown size={15} color={openFaq === i ? '#DCF763' : '#555'} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t" style={{ borderColor: 'rgba(220,247,99,.1)' }}>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed pt-4" style={{ fontWeight: 300 }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[900px] h-[450px]" style={{ background: 'radial-gradient(ellipse,rgba(220,247,99,.055) 0%,transparent 60%)' }} />
          <div className="absolute inset-0 opacity-[.018]" style={{ backgroundImage: 'linear-gradient(rgba(220,247,99,1) 1px,transparent 1px)', backgroundSize: '100% 56px' }} />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="rv relative rounded-[28px] sm:rounded-[40px] border overflow-hidden" style={{ borderColor: 'rgba(220,247,99,.12)', background: 'rgba(255,255,255,.018)' }}>
            <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: 'linear-gradient(90deg,transparent 0%,rgba(220,247,99,.85) 50%,transparent 100%)' }} />
            <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-l-2 border-t-2 rounded-tl-[28px] sm:rounded-tl-[40px]" style={{ borderColor: 'rgba(220,247,99,.18)' }} />
            <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-r-2 border-b-2 rounded-br-[28px] sm:rounded-br-[40px]" style={{ borderColor: 'rgba(220,247,99,.18)' }} />
            <div className="px-6 sm:px-12 lg:px-20 py-16 sm:py-20 lg:py-24 text-center">
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-[4px] sm:tracking-[5px] mb-6 sm:mb-8" style={{ color: 'rgba(220,247,99,.45)' }}>Rejoins le mouvement</p>
              <h2 className="fd mb-6 sm:mb-8" style={{ fontSize: 'clamp(40px,8vw,96px)', fontWeight: 700, letterSpacing: '-.04em', lineHeight: .9 }}>
                <span className="text-white">Ta place</span><br /><span style={{ color: '#DCF763' }}>est ici.</span>
              </h2>
              <p className="text-zinc-400 text-base sm:text-xl mb-10 sm:mb-14 max-w-lg mx-auto leading-relaxed" style={{ fontWeight: 300 }}>+12 000 entrepreneurs te font déjà confiance. Télécharge l'app, crée ton compte, et commence à construire.</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10">
                <Link href="/telecharger" className="group relative flex items-center justify-center gap-3 fd font-semibold text-black text-base sm:text-lg w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(220,247,99,.4)]" style={{ background: '#DCF763' }}>
                  <span className="relative z-10">Télécharger YouthIn — Gratuit</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)', animation: 'shimmer 1.4s linear infinite' }} />
                </Link>
              </div>
              <div className="flex items-center justify-center gap-6 sm:gap-8 text-zinc-700 text-xs sm:text-sm">
                {[{ l: 'App Store', d: 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' }, { l: 'Google Play', d: 'M3.18 23.76c.3.17.64.17.94 0l11.24-6.42-2.37-2.37-9.81 8.79zm-1.76-20.5C1.18 3.6 1 4 1 4.56v14.88c0 .56.18.96.42 1.3l.09.08 8.33-8.33v-.2L1.42 3.26zm19.1 8.05-2.87-1.64-2.58 2.58 2.58 2.58 2.88-1.64c.82-.47.82-1.23 0-1.88zM4.12.24 15.36 6.66 12.99 9.03 3.18.24c.3-.18.64-.17.94 0z' }].map(({ l, d }) => (
                  <div key={l} className="flex items-center gap-2 hover:text-zinc-400 transition-colors cursor-pointer">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4"><path d={d} /></svg><span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}