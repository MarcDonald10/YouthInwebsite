'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProjectCardVotable, type Project } from '@/components/project-card-votable'
import {
  Search, TrendingUp, Users, Trophy, Zap,
  ArrowRight, LayoutGrid, List, SlidersHorizontal,
} from 'lucide-react'
import Link from 'next/link'

// ── Données mock ───────────────────────────────────────────
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AgriConnect Cameroun',
    description: 'Connecter directement les agriculteurs ruraux du Centre et de l\'Ouest aux acheteurs urbains de Douala et Yaoundé. Zéro intermédiaire — l\'agriculteur gagne plus, le consommateur paye moins.',
    category: 'AgriTech',
    founderName: 'Fatima Mbarga',
    image: '/illustration-submit.jpg',
    votes: 3847,
    budget: 5000000,
    createdAt: new Date('2026-02-01'),
  },
  {
    id: '2',
    title: 'Zhilak',
    description: 'Plateforme de services digitaux à la demande pour PME camerounaises : comptabilité, marketing, RH, IT. 150 prestataires inscrits, 30 PME clientes dans les 3 premiers mois.',
    category: 'Tech/Digital',
    founderName: 'Donald Baliaba',
    image: '/illustration-vote.jpg',
    votes: 2841,
    budget: 3500000,
    createdAt: new Date('2026-02-03'),
  },
  {
    id: '3',
    title: 'MediCam Téléconsultation',
    description: 'Connecter les communautés rurales aux professionnels de santé via vidéo-consultation et livraison d\'ordonnances. 12 médecins partenaires, 3 régions couvertes.',
    category: 'Santé',
    founderName: 'Dr. Sarah Fotso',
    image: '/illustration-success.jpg',
    votes: 2103,
    budget: 12000000,
    createdAt: new Date('2026-02-05'),
  },
  {
    id: '4',
    title: 'EcoTextile Cameroun',
    description: 'Vêtements éco-responsables à partir de fibres locales. Première marque de mode durable 100% camerounaise avec 3 artisans locaux dans l\'équipe.',
    category: 'Mode & Artisanat',
    founderName: 'Amina Ngassa',
    image: '/hero-2.jpg',
    votes: 1924,
    budget: 6000000,
    createdAt: new Date('2026-02-07'),
  },
  {
    id: '5',
    title: 'SolarKit Rural',
    description: 'Kits solaires abordables pour ménages sans accès au réseau électrique, payables en microversements via Mobile Money. Déjà 48 foyers équipés.',
    category: 'Énergie',
    founderName: 'Emmanuel Tchouata',
    image: '/illustration-submit.jpg',
    votes: 1587,
    budget: 8000000,
    createdAt: new Date('2026-02-09'),
  },
  {
    id: '6',
    title: 'LearnCam Académie',
    description: 'Formation aux compétences numériques avec projets réels clients. 85% des apprenants trouvent un emploi ou lancent leur activité dans les 6 mois.',
    category: 'Éducation',
    founderName: 'Pauline Essomba',
    image: '/illustration-vote.jpg',
    votes: 1243,
    budget: 4500000,
    createdAt: new Date('2026-02-12'),
  },
  {
    id: '7',
    title: 'CamerBuild Matériaux',
    description: 'Marketplace de matériaux de construction avec livraison J+2 à Douala. Mise en relation directe entre fournisseurs et entreprises BTP. 34 fournisseurs partenaires.',
    category: 'BTP',
    founderName: 'Boris Tchamba',
    image: '/illustration-success.jpg',
    votes: 987,
    budget: 7000000,
    createdAt: new Date('2026-02-15'),
  },
  {
    id: '8',
    title: 'FarmFinance Microcrédits',
    description: 'Microcrédits agricoles basés sur le YouthIn Index™ — pas de collatéral, pas d\'historique bancaire requis. 12 prêts accordés, 100% remboursés.',
    category: 'Finance',
    founderName: 'Christophe Nana',
    image: '/hero-2.jpg',
    votes: 756,
    budget: 9000000,
    createdAt: new Date('2026-02-18'),
  },
  {
    id: '9',
    title: 'CoolDelivery Yaoundé',
    description: 'Livraison de produits frais et surgelés à Yaoundé avec chaîne du froid. Partenariat avec 8 supermarchés et livraison en moins de 2h.',
    category: 'Commerce',
    founderName: 'Gaëlle Mbida',
    image: '/illustration-submit.jpg',
    votes: 634,
    budget: 5500000,
    createdAt: new Date('2026-02-20'),
  },
]

const CATEGORIES = ['Tous', 'AgriTech', 'Tech/Digital', 'Santé', 'Finance', 'Éducation', 'BTP', 'Énergie', 'Commerce', 'Mode & Artisanat']

const SORT_OPTIONS = [
  { value: 'votes', label: 'Plus de votes' },
  { value: 'newest', label: 'Plus récents' },
  { value: 'oldest', label: 'Plus anciens' },
]

// ── Podium top 3 ───────────────────────────────────────────
function PodiumCard({ project, rank }: { project: Project; rank: 1 | 2 | 3 }) {
  const config = {
    1: { emoji: '🥇', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)', size: 'text-3xl' },
    2: { emoji: '🥈', color: '#9E9E9E', bg: 'rgba(158,158,158,0.06)', border: 'rgba(158,158,158,0.2)', size: 'text-2xl' },
    3: { emoji: '🥉', color: '#CD7F32', bg: 'rgba(205,127,50,0.06)', border: 'rgba(205,127,50,0.2)', size: 'text-2xl' },
  }[rank]

  return (
    <div
      className="relative rounded-2xl border overflow-hidden transition-all duration-300
                 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] cursor-pointer"
      style={{ backgroundColor: config.bg, borderColor: config.border }}
    >
      {rank === 1 && (
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${config.color}, transparent)` }} />
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className={config.size}>{config.emoji}</span>
          <span className="text-xs font-black px-2.5 py-1 rounded-lg"
            style={{ color: config.color, backgroundColor: `${config.color}15` }}>
            #{rank} · {project.votes.toLocaleString('fr-FR')} votes
          </span>
        </div>
        <h3 className="font-black text-white text-base mb-1 leading-snug">{project.title}</h3>
        <p className="text-zinc-500 text-xs mb-3">{project.founderName} · {project.category}</p>
        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">{project.description}</p>
      </div>
    </div>
  )
}

// ── Page principale ────────────────────────────────────────
export default function VotingPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tous')
  const [sortBy, setSortBy] = useState('votes')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const totalVotes = useMemo(() => projects.reduce((s, p) => s + p.votes, 0), [projects])

  const sorted = useMemo(() =>
    [...projects].sort((a, b) => {
      if (sortBy === 'votes')   return b.votes - a.votes
      if (sortBy === 'newest')  return b.createdAt.getTime() - a.createdAt.getTime()
      if (sortBy === 'oldest')  return a.createdAt.getTime() - b.createdAt.getTime()
      return 0
    }), [projects, sortBy])

  const filtered = useMemo(() =>
    sorted.filter(p => {
      const q = search.toLowerCase()
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.founderName.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      const matchC = category === 'Tous' || p.category === category
      return matchQ && matchC
    }), [sorted, search, category])

  const top3 = useMemo(() => [...projects].sort((a, b) => b.votes - a.votes).slice(0, 3), [projects])

  function handleVote(id: string, count: number) {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, votes: count } : p))
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Header />

      <main className="pt-28 pb-24">

        {/* ══ HERO ══ */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2
                            w-[900px] h-[400px] bg-[#DCF763]/[0.03] rounded-full blur-[100px]" />
          </div>

          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#DCF763]/10 border border-[#DCF763]/20
                            rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[#DCF763] text-sm font-bold uppercase tracking-widest">
                Vote Public · Phase 2 · Jusqu'au 31 mars
              </span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight mb-6">
              Vote pour{' '}
              <span className="text-[#DCF763]">les meilleurs</span>{' '}
              projets.
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Chaque vote propulse un entrepreneur camerounais vers la finale.
              Sur le site : <span className="text-white font-semibold">75 FCFA / vote</span> via Mobile Money.
              Dans l'app YouthIn : <span className="text-[#DCF763] font-semibold">gratuit</span> pour les membres.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              {[
                { icon: TrendingUp, val: totalVotes.toLocaleString('fr-FR'), label: 'Votes enregistrés' },
                { icon: Users, val: projects.length.toString(), label: 'Projets actifs' },
                { icon: Trophy, val: 'Top 50', label: 'Passent devant le jury' },
                { icon: Zap, val: '2 000 000', label: 'FCFA Grand Prix' },
              ].map(({ icon: Icon, val, label }) => (
                <div key={label}
                  className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800
                             rounded-2xl px-5 py-3.5">
                  <Icon size={15} className="text-[#DCF763] flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-black text-white text-base leading-none">{val}</p>
                    <p className="text-zinc-600 text-xs mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Différence site vs app */}
            <div className="inline-flex items-stretch bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden text-sm">
              <div className="px-6 py-4 border-r border-zinc-800">
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Sur le site web</p>
                <p className="font-bold text-white">75 FCFA par vote · MTN / Orange</p>
                <p className="text-zinc-600 text-xs mt-0.5">Ouvert au grand public</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-[#DCF763] text-xs uppercase tracking-wider mb-1 font-bold">Dans l'app YouthIn</p>
                <p className="font-bold text-white">Gratuit · 1 vote par projet</p>
                <p className="text-zinc-600 text-xs mt-0.5">Membres vérifiés uniquement</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PODIUM TOP 3 ══ */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[#DCF763] text-xs font-bold uppercase tracking-widest mb-1">Classement</p>
                <h2 className="text-2xl font-black text-white">Top 3 en ce moment</h2>
              </div>
              <Link href="#tous-les-projets"
                className="text-zinc-500 hover:text-zinc-300 text-sm flex items-center gap-1.5 transition-colors">
                Voir tout le classement
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {top3.map((p, i) => (
                <PodiumCard key={p.id} project={p} rank={(i + 1) as 1 | 2 | 3} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ FILTRES ══ */}
        <section
          id="tous-les-projets"
          className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-sm
                     border-y border-zinc-800 px-4 sm:px-6 lg:px-8 py-4"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-4">
            {/* Ligne 1 : search + sort + view */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Rechercher un projet, fondateur..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl
                             text-white placeholder-zinc-600 text-sm
                             focus:outline-none focus:border-zinc-600 transition-colors"
                />
              </div>

              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5
                           text-zinc-300 text-sm focus:outline-none focus:border-zinc-600
                           cursor-pointer transition-colors hidden sm:block"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value} className="bg-zinc-900">{o.label}</option>
                ))}
              </select>

              <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-zinc-700 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-zinc-700 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  <List size={15} />
                </button>
              </div>
            </div>

            {/* Ligne 2 : catégories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`
                    flex-shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all
                    ${category === cat
                      ? 'bg-[#DCF763] text-black'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}

              <div className="flex-shrink-0 ml-auto text-xs text-zinc-600">
                {filtered.length} projet{filtered.length > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </section>

        {/* ══ GRILLE PROJETS ══ */}
        <section className="px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-7xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-zinc-400 font-semibold text-lg mb-2">Aucun projet trouvé</p>
                <p className="text-zinc-600 text-sm">Essaie un autre filtre ou terme de recherche.</p>
                <button
                  onClick={() => { setSearch(''); setCategory('Tous') }}
                  className="mt-6 text-[#DCF763] text-sm font-semibold hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className={
                view === 'grid'
                  ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-5'
                  : 'flex flex-col gap-4'
              }>
                {filtered.map(p => (
                  <ProjectCardVotable key={p.id} project={p} onVote={handleVote} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="px-4 sm:px-6 lg:px-8 mt-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-[#DCF763]/20
                            bg-gradient-to-br from-[#DCF763]/6 to-transparent text-center px-8 py-14">
              <div className="absolute top-0 left-0 right-0 h-[1px]
                              bg-gradient-to-r from-transparent via-[#DCF763]/50 to-transparent" />

              <p className="text-[#DCF763] text-sm font-bold uppercase tracking-widest mb-4">
                Tu as un projet ?
              </p>
              <h2 className="text-4xl font-black text-white mb-4">
                Soumets. La communauté vote.
              </h2>
              <p className="text-zinc-400 mb-10 leading-relaxed max-w-lg mx-auto">
                Rejoins les 847 entrepreneurs qui ont déjà soumis. Soumission gratuite.
                Les meilleurs projets gagnent cash, mentorat et visibilité nationale.
              </p>

              <Link href="/soumettre">
                <button className="group inline-flex items-center gap-3
                                   bg-[#DCF763] text-black font-black text-base
                                   px-10 py-4 rounded-2xl
                                   hover:bg-[#DCF763]/90 hover:scale-[1.02]
                                   hover:shadow-[0_0_40px_rgba(220,247,99,0.3)]
                                   transition-all duration-200">
                  Soumettre mon projet gratuitement
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}