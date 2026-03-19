'use client'

import { useState, useEffect, useRef } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArrowRight, Users, MessageSquare, TrendingUp, MapPin, Zap, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// ══ HOOK — animation scroll ════════════════════════════════
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ══ DONNÉES ════════════════════════════════════════════════
const VILLAGES = [
  {
    icon: '🌍', tag: 'National', name: 'YouthIn Nation 🇨🇲',
    desc: 'Toute la communauté YouthIn — grandes annonces, résultats concours, opportunités nationales pour les 12 847 membres.',
    members: 12847, weekly: '2 341', color: '#5B21B6',
    examples: ['YouthIn Nation'],
  },
  {
    icon: '🏙️', tag: 'Ville', name: 'Villages™ Ville',
    desc: 'Un Village™ par grande ville. Événements locaux, réunions mensuelles, mise en réseau de proximité avec des visages qu\'on reconnaît.',
    members: 4312, weekly: '847', color: '#0369A1',
    examples: ['YouthIn Douala', 'YouthIn Yaoundé', 'YouthIn Bafoussam', 'YouthIn Garoua'],
  },
  {
    icon: '🏘️', tag: 'Quartier', name: 'Villages™ Quartier',
    desc: 'Le plus puissant. 200 à 500 membres. La confiance est maximale — les entrepreneurs se retrouvent physiquement, se connaissent.',
    members: 234, weekly: '89', color: '#065F46',
    examples: ['Village™ Makepe', 'Village™ Akwa', 'Village™ Bastos', 'Village™ Biyem-Assi'],
  },
  {
    icon: '⚙️', tag: 'Secteur', name: 'Villages™ Secteur',
    desc: 'Entrepreneurs du même domaine, quelle que soit leur ville. Le réseau professionnel vertical qui crée les vraies opportunités.',
    members: 1876, weekly: '412', color: '#B45309',
    examples: ['Tech/Digital Cameroun', 'AgriTech Cameroun', 'BTP Cameroun', 'Santé & Bien-être'],
  },
]

const PUB_TYPES = [
  { emoji: '🎯', name: 'Jalon', desc: 'Premier client, premier FCFA, 1 an d\'activité. Validé par 3 pairs — +pts Index™ garantis.', color: '#DCF763' },
  { emoji: '📈', name: 'Résultat', desc: 'Chiffres concrets, métriques, preuves. Ce qui attire l\'équipe YouthIn pour une descente terrain.', color: '#F59E0B' },
  { emoji: '📸', name: 'Média', desc: 'Progress photos, démos produit, behind-the-scenes. Montre la réalité de ton entrepreneuriat.', color: '#EC4899' },
  { emoji: '🗳️', name: 'Sondage', desc: 'Valide une idée, prends une décision. La communauté répond en 24h.', color: '#8B5CF6' },
  { emoji: '🤝', name: 'Je cherche', desc: 'Partenaire, prestataire, client, associé. Ton Village™ répond avant n\'importe quel autre réseau.', color: '#14B8A6' },
]

const REACTIONS = [
  { emoji: '⚡', name: 'Inspire', quote: 'Ce contenu m\'inspire', color: '#DCF763', pts: 2 },
  { emoji: '🔥', name: 'Fire', quote: 'C\'est du feu, continue !', color: '#F97316', pts: 1 },
  { emoji: '🤝', name: 'Soutien', quote: 'Je te soutiens', color: '#14B8A6', pts: 1 },
  { emoji: '💰', name: 'Investir', quote: 'J\'y crois, j\'investirais', color: '#22C55E', pts: 4 },
  { emoji: '📚', name: 'J\'apprends', quote: 'Merci pour la leçon', color: '#A78BFA', pts: 2 },
]

// ══ COMPOSANTS ════════════════════════════════════════════

function FadeIn({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-1 h-4 rounded-full bg-[#DCF763]" />
      <span className="text-[#DCF763] text-xs font-bold uppercase tracking-[3px]">{children}</span>
    </div>
  )
}

// ══ PAGE ══════════════════════════════════════════════════
export default function CommunautePage() {
  const [activeVillage, setActiveVillage] = useState(0)
  const [hoveredReaction, setHoveredReaction] = useState<number | null>(null)
  const v = VILLAGES[activeVillage]

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[95vh] flex items-end pb-20 px-4 sm:px-6 lg:px-8 pt-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(220,247,99,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(220,247,99,0.04) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[800px] opacity-30"
            style={{ background: 'radial-gradient(ellipse, rgba(220,247,99,0.12) 0%, transparent 60%)' }} />
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full border border-[#DCF763]/5" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full border border-[#DCF763]/8 translate-x-[100px] translate-y-[50px]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="absolute -top-10 right-0 text-[280px] font-black leading-none text-[#DCF763]/[0.03] select-none pointer-events-none hidden lg:block tracking-tighter">12K</div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2.5 mb-10 bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm rounded-full px-4 py-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-zinc-400 text-sm"><span className="text-emerald-400 font-bold">12 847</span> membres · Actif en ce moment</span>
            </div>

            <div className="overflow-hidden mb-4">
              <div className="text-7xl sm:text-8xl lg:text-[108px] font-black leading-[0.85] tracking-tighter"
                style={{ animation: 'slideUp 0.8s ease forwards', opacity: 0 }}>
                Ta communauté
              </div>
            </div>
            <div className="overflow-hidden mb-10">
              <div className="text-7xl sm:text-8xl lg:text-[108px] font-black leading-[0.85] tracking-tighter text-[#DCF763]"
                style={{ animation: 'slideUp 0.8s ease 0.12s forwards', opacity: 0 }}>
                t'attend.
              </div>
            </div>

            <div style={{ animation: 'fadeIn 0.8s ease 0.4s forwards', opacity: 0 }}>
              <p className="text-xl sm:text-2xl text-zinc-400 max-w-2xl leading-relaxed mb-12 font-light">
                Villages™ par ville, quartier et secteur. Des milliers d'entrepreneurs
                qui s'entraident, partagent et se propulsent — 365 jours par an.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button className="group flex items-center gap-3 bg-[#DCF763] text-black font-black text-lg px-10 py-5 rounded-2xl hover:bg-[#DCF763]/90 hover:shadow-[0_0_50px_rgba(220,247,99,0.4)] hover:scale-[1.02] transition-all duration-200">
                  Rejoindre la communauté
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="text-zinc-500 hover:text-zinc-200 font-semibold text-lg flex items-center gap-2 transition-colors group">
                  Explorer les Villages™
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '12 847', label: 'Membres inscrits' },
              { val: '4 types', label: 'De Villages™' },
              { val: '365j', label: 'Communauté active' },
              { val: '∞', label: 'Opportunités créées' },
            ].map(({ val, label }, i) => (
              <div key={i} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-2xl px-5 py-4"
                style={{ animation: `fadeIn 0.6s ease ${0.5 + i * 0.1}s forwards`, opacity: 0 }}>
                <p className="text-2xl font-black text-[#DCF763]">{val}</p>
                <p className="text-zinc-600 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VILLAGES */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <SectionLabel>Structure de la communauté</SectionLabel>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
              <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight max-w-xl">4 types de<br /><span className="text-[#DCF763]">Villages™.</span></h2>
              <p className="text-zinc-500 max-w-sm leading-relaxed">Un Village™ n'est pas un groupe WhatsApp. C'est un espace structuré avec chat, fil d'actu, événements et détection de talents.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid lg:grid-cols-[320px_1fr] gap-5">
              <div className="flex lg:flex-col gap-3">
                {VILLAGES.map((vt, i) => (
                  <button key={i} onClick={() => setActiveVillage(i)}
                    className={`relative group flex items-center gap-4 p-4 rounded-2xl text-left border transition-all duration-300 overflow-hidden ${activeVillage === i ? 'border-transparent text-white' : 'border-zinc-800/80 text-zinc-600 hover:text-zinc-300 hover:border-zinc-700'}`}
                    style={activeVillage === i ? { background: `linear-gradient(135deg, ${vt.color}15, ${vt.color}05)`, borderColor: `${vt.color}40` } : {}}>
                    {activeVillage === i && <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full" style={{ background: vt.color }} />}
                    <span className="text-2xl flex-shrink-0">{vt.icon}</span>
                    <div className="min-w-0 hidden sm:block">
                      <p className={`font-black text-sm ${activeVillage === i ? 'text-white' : ''}`}>{vt.tag}</p>
                      <p className="text-zinc-600 text-xs mt-0.5">{vt.members.toLocaleString('fr-FR')} membres</p>
                    </div>
                  </button>
                ))}
              </div>

              <div key={activeVillage} className="relative rounded-3xl border overflow-hidden"
                style={{ borderColor: `${v.color}25`, background: `linear-gradient(135deg, ${v.color}08 0%, transparent 60%)`, animation: 'panelIn 0.35s ease forwards' }}>
                <div className="absolute top-0 left-0 right-0 h-[1.5px]"
                  style={{ background: `linear-gradient(90deg, transparent 0%, ${v.color} 50%, transparent 100%)` }} />
                <div className="p-8 sm:p-12">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                    <div className="flex items-center gap-5">
                      <div className="text-6xl">{v.icon}</div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-2"
                          style={{ color: v.color, background: `${v.color}15`, border: `1px solid ${v.color}30` }}>{v.tag}</span>
                        <h3 className="text-3xl font-black text-white">{v.name}</h3>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-right">
                        <p className="text-3xl font-black text-white">{v.members.toLocaleString('fr-FR')}</p>
                        <p className="text-zinc-600 text-xs">membres</p>
                      </div>
                      <div className="w-px bg-zinc-800" />
                      <div className="text-right">
                        <p className="text-3xl font-black" style={{ color: v.color }}>{v.weekly}</p>
                        <p className="text-zinc-600 text-xs">actifs/sem.</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-300 text-xl leading-relaxed mb-10 max-w-2xl">{v.desc}</p>
                  <div>
                    <p className="text-zinc-700 text-xs font-bold uppercase tracking-widest mb-3">Villages™ existants</p>
                    <div className="flex flex-wrap gap-2">
                      {v.examples.map(ex => (
                        <span key={ex} className="text-sm font-semibold px-4 py-2 rounded-xl"
                          style={{ color: v.color, background: `${v.color}10`, border: `1px solid ${v.color}20` }}>{ex}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t flex items-center gap-3" style={{ borderColor: `${v.color}20` }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: v.color }} />
                    <p className="text-sm text-zinc-400">{v.weekly} membres actifs cette semaine</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CE QUI SE PASSE */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(220,247,99,0.03) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 border-y border-zinc-900/80 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <FadeIn>
            <SectionLabel>Fonctionnement</SectionLabel>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-20 leading-tight">Ce qui se passe<br />dans un Village™.</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: MessageSquare, color: '#DCF763', title: 'Chat en temps réel', desc: 'Échanges instantanés, réponses filées, annonces épinglées. La vraie conversation entrepreneuriale.' },
              { Icon: TrendingUp, color: '#F59E0B', title: 'Publications + Index™', desc: 'Chaque jalon publié dans le Village™ enrichit automatiquement ton YouthIn Index™.' },
              { Icon: Zap, color: '#8B5CF6', title: 'Détection automatique', desc: 'L\'algorithme YouthIn repère les membres à fort potentiel pour une descente terrain.' },
              { Icon: MapPin, color: '#14B8A6', title: 'Rendez-vous physiques', desc: 'Le digital organise le physique. Réunions mensuelles, sorties terrain, networking réel.' },
            ].map(({ Icon, color, title, desc }, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group h-full bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-7 flex flex-col gap-5 hover:border-zinc-700 hover:-translate-y-2 transition-all duration-300 cursor-default">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-black text-white mb-2">{title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-zinc-800">
                    <div className="w-8 h-[2px] rounded-full transition-all duration-300 group-hover:w-16" style={{ background: color }} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <SectionLabel>Contenu entrepreneurial</SectionLabel>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
              <h2 className="text-5xl lg:text-6xl font-black leading-tight">5 types de<br /><span className="text-[#DCF763]">publications.</span></h2>
              <p className="text-zinc-500 max-w-xs leading-relaxed">Chaque publication bien construite enrichit ton score. Plus tu partages de valeur, plus l'équipe YouthIn te remarque.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FadeIn delay={0} className="lg:row-span-2">
              <div className="group relative h-full rounded-3xl overflow-hidden border border-[#DCF763]/20 bg-gradient-to-b from-[#DCF763]/8 to-transparent hover:border-[#DCF763]/40 hover:-translate-y-1 transition-all duration-300 cursor-default min-h-[280px] flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#DCF763]/60 to-transparent" />
                <div className="p-8 flex flex-col h-full">
                  <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110 w-fit">🎯</div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#DCF763] mb-3">Le plus valorisé</span>
                  <h3 className="text-2xl font-black text-white mb-4">Jalon</h3>
                  <p className="text-zinc-400 leading-relaxed flex-1">Premier client, premier FCFA, 1 an d'activité, premier employé. Validé par 3 membres Platinum/Elite. Le signal le plus fort pour l'équipe YouthIn.</p>
                  <div className="mt-8 inline-flex items-center gap-2 bg-[#DCF763]/15 rounded-xl px-4 py-2.5 w-fit">
                    <Zap size={13} className="text-[#DCF763]" />
                    <span className="text-[#DCF763] text-xs font-bold">+20 à +150 pts Index™</span>
                  </div>
                </div>
              </div>
            </FadeIn>
            {PUB_TYPES.slice(1).map((p, i) => (
              <FadeIn key={i} delay={(i + 1) * 0.08}>
                <div className="group relative rounded-3xl border border-zinc-800/80 overflow-hidden bg-zinc-900/30 hover:border-zinc-700 hover:-translate-y-1 transition-all duration-300 cursor-default">
                  <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
                  <div className="p-7">
                    <div className="text-4xl mb-5 transition-transform duration-300 group-hover:scale-110 w-fit">{p.emoji}</div>
                    <h3 className="font-black text-sm uppercase tracking-wide mb-2" style={{ color: p.color }}>{p.name}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* RÉACTIONS */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none border-y border-zinc-900/80" />
        <div className="relative max-w-7xl mx-auto">
          <FadeIn>
            <SectionLabel>Langage YouthIn</SectionLabel>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
              <h2 className="text-5xl lg:text-6xl font-black leading-tight">5 réactions.<br /><span className="text-[#DCF763]">5 intentions.</span></h2>
              <p className="text-zinc-500 max-w-sm leading-relaxed">Pas de simple "Like". Chaque réaction a un sens précis et génère des points différents sur le YouthIn Index™ du créateur.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {REACTIONS.map((r, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="group relative rounded-3xl border overflow-hidden cursor-default transition-all duration-300 text-center p-8 flex flex-col items-center"
                  style={{
                    borderColor: hoveredReaction === i ? `${r.color}40` : 'rgba(39,39,42,0.8)',
                    background: hoveredReaction === i ? `linear-gradient(135deg, ${r.color}10, transparent)` : 'rgba(9,9,11,0.5)',
                    transform: hoveredReaction === i ? 'translateY(-8px)' : 'translateY(0)',
                  }}
                  onMouseEnter={() => setHoveredReaction(i)}
                  onMouseLeave={() => setHoveredReaction(null)}>
                  {hoveredReaction === i && <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${r.color}, transparent)` }} />}
                  <div className="text-5xl mb-5 transition-all duration-300" style={{ transform: hoveredReaction === i ? 'scale(1.25)' : 'scale(1)' }}>{r.emoji}</div>
                  <h3 className="font-black text-base mb-2 transition-colors duration-200" style={{ color: hoveredReaction === i ? r.color : '#ffffff' }}>{r.name}</h3>
                  <p className="text-zinc-600 text-xs italic mb-5 leading-relaxed">"{r.quote}"</p>
                  <div className="mt-auto inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all duration-200"
                    style={{ color: r.color, background: `${r.color}${hoveredReaction === i ? '20' : '10'}` }}>
                    <Zap size={10} />
                    <span className="text-xs font-black">+{r.pts} pts</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <div className="mt-8 text-center">
              <p className="text-zinc-700 text-sm">La réaction{' '}<span className="text-emerald-400 font-bold">💰 Investir</span>{' '}vaut 4× — signal fort pour les investisseurs partenaires de YouthIn.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* DÉTECTION */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="relative rounded-[40px] overflow-hidden border border-[#DCF763]/15">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(220,247,99,0.07) 0%, rgba(220,247,99,0.02) 40%, transparent 70%)' }} />
              <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,247,99,0.6), transparent)' }} />
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border border-[#DCF763]/8 pointer-events-none" />
              <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full border border-[#DCF763]/5 pointer-events-none" />
              <div className="relative grid lg:grid-cols-2 gap-12 items-center p-10 sm:p-16">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#DCF763]/12 border border-[#DCF763]/20 rounded-full px-4 py-2 mb-8">
                    <Zap size={13} className="text-[#DCF763]" />
                    <span className="text-[#DCF763] text-xs font-bold uppercase tracking-widest">Fonctionnalité exclusive YouthIn</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">Le Village™ détecte les talents avant qu'ils le sachent.</h2>
                  <p className="text-zinc-400 text-lg leading-relaxed mb-5">L'algorithme YouthIn analyse en continu les signaux d'activité dans chaque Village™. Les membres à fort potentiel reçoivent une invitation personnalisée de l'équipe.</p>
                  <p className="text-zinc-600 text-sm leading-relaxed">Une descente terrain, une mise en avant sur la plateforme, un événement organisé dans leur quartier. YouthIn va chercher les talents — pas l'inverse.</p>
                </div>
                <div className="space-y-3">
                  <p className="text-zinc-700 text-xs font-bold uppercase tracking-widest mb-5">Critères de détection</p>
                  {[
                    { label: 'Score Potentiel Village™ ≥ 75/100', done: true },
                    { label: 'Au moins 2 milestones validés', done: true },
                    { label: 'Progression Index™ 3 mois consécutifs', done: true },
                    { label: '5+ membres aidés dans le Village™', done: false },
                    { label: 'Signal "Investir" reçu ×3 minimum', done: false },
                    { label: '→ Invitation équipe YouthIn', done: false, special: true },
                  ].map(({ label, done, special }, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-2xl px-4 py-3 border transition-all duration-200 hover:border-zinc-700"
                      style={{ background: done ? 'rgba(34,197,94,0.05)' : 'rgba(39,39,42,0.4)', borderColor: done ? 'rgba(34,197,94,0.15)' : 'rgba(39,39,42,0.8)' }}>
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-600'}`}>{done ? '✓' : '○'}</span>
                      <p className={`text-sm font-medium ${done ? 'text-zinc-200' : special ? 'text-[#DCF763]' : 'text-zinc-600'}`}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-20"
              style={{ background: 'radial-gradient(ellipse, rgba(220,247,99,0.3) 0%, transparent 60%)' }} />
          </div>
          <FadeIn>
            <p className="text-zinc-600 text-sm font-bold uppercase tracking-widest mb-6">Rejoins le mouvement</p>
            <h2 className="text-6xl lg:text-8xl font-black leading-[0.88] tracking-tighter mb-8">
              Fais partie<br /><span className="text-[#DCF763]">du mouvement.</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-14 max-w-xl mx-auto leading-relaxed">
              +12 000 entrepreneurs camerounais construisent leur avenir sur YouthIn. Ton Village™ t'attend.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="group flex items-center gap-3 bg-[#DCF763] text-black font-black text-lg px-12 py-5 rounded-2xl hover:bg-[#DCF763]/90 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(220,247,99,0.4)] transition-all duration-200">
                Rejoindre la communauté
                <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
              <Link href="/concours">
                <button className="flex items-center gap-2 border border-zinc-800 text-zinc-400 font-semibold text-lg px-8 py-5 rounded-2xl hover:border-zinc-600 hover:text-white transition-colors">
                  Voir le concours
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes panelIn {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <Footer />
    </main>
  )
}