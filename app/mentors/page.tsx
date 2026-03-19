'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Star, ArrowRight, Clock, Globe, Shield, Zap, TrendingUp, CheckCircle, ChevronDown } from 'lucide-react'

// ── Types ──────────────────────────────────────────────────
type Mentor = {
  id: string
  name: string
  initials: string
  title: string
  bio: string
  domains: string[]
  price: number
  duration: number
  rating: number
  sessions: number
  available: boolean
  nextSlot: string
  languages: string[]
  level: 'elite' | 'platinum'
  indexScore: number
  specialty: string
}

// ── Données ────────────────────────────────────────────────
const MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Arnauld Kodo',
    initials: 'AK',
    title: 'Directeur Financier Senior',
    bio: '15 ans d\'expérience en finance d\'entreprise. Ex-Ecobank, ex-Société Générale Cameroun. Spécialisé dans le financement des PME et les levées de fonds.',
    domains: ['Finance', 'Investissement', 'Comptabilité', 'Levée de fonds'],
    price: 35000,
    duration: 60,
    rating: 4.9,
    sessions: 87,
    available: true,
    nextSlot: 'Demain 10h',
    languages: ['Français', 'Anglais'],
    level: 'elite',
    indexScore: 891,
    specialty: 'Financement PME',
  },
  {
    id: 'm2',
    name: 'Sarah Fotso',
    initials: 'SF',
    title: 'Pharmacienne & Entrepreneur Santé',
    bio: 'Fondatrice de MediCam, réseau de 12 pharmacies au Cameroun. Experte en entrepreneuriat dans le secteur santé et en stratégie de distribution.',
    domains: ['Santé', 'Marketing', 'Stratégie', 'Distribution'],
    price: 25000,
    duration: 45,
    rating: 4.7,
    sessions: 53,
    available: true,
    nextSlot: 'Jeudi 14h',
    languages: ['Français'],
    level: 'platinum',
    indexScore: 734,
    specialty: 'Secteur santé',
  },
  {
    id: 'm3',
    name: 'Amandine Dibango',
    initials: 'AD',
    title: 'Tech Entrepreneur & CTO',
    bio: 'Co-fondatrice de 3 startups tech. Ex-Orange Digital Center. Spécialiste en développement produit, architecture tech et stratégie go-to-market en Afrique.',
    domains: ['Tech/Digital', 'Startup', 'Product', 'Go-to-market'],
    price: 40000,
    duration: 60,
    rating: 4.8,
    sessions: 42,
    available: true,
    nextSlot: 'Vendredi 16h',
    languages: ['Français', 'Anglais'],
    level: 'elite',
    indexScore: 856,
    specialty: 'Startups tech',
  },
  {
    id: 'm4',
    name: 'Paul Manga',
    initials: 'PM',
    title: 'CTO & Product Manager',
    bio: '10 ans en développement produit digital. Ex-OrangeDigital. Expert React Native, Firebase et stratégie produit pour les marchés africains.',
    domains: ['Tech', 'Produit', 'Mobile', 'Startup'],
    price: 40000,
    duration: 60,
    rating: 4.8,
    sessions: 124,
    available: false,
    nextSlot: 'Lundi prochain',
    languages: ['Français', 'Anglais'],
    level: 'elite',
    indexScore: 810,
    specialty: 'Produit digital',
  },
  {
    id: 'm5',
    name: 'Christelle Ngo',
    initials: 'CN',
    title: 'Avocate d\'affaires & Juridique',
    bio: 'Avocate spécialisée en droit des affaires camerounais. 8 ans d\'expérience. Experte en création de sociétés, contrats commerciaux et propriété intellectuelle.',
    domains: ['Juridique', 'Droit des affaires', 'OHADA', 'IP'],
    price: 30000,
    duration: 60,
    rating: 4.9,
    sessions: 68,
    available: true,
    nextSlot: 'Aujourd\'hui 17h',
    languages: ['Français'],
    level: 'platinum',
    indexScore: 712,
    specialty: 'Droit des affaires',
  },
  {
    id: 'm6',
    name: 'Marcus Tchouake',
    initials: 'MT',
    title: 'Expert AgriTech & Agriculture',
    bio: 'Agronome de formation, entrepreneur depuis 10 ans. Fondateur d\'AgriSolutions, 200 agriculteurs accompagnés. Expert en chaînes de valeur agricoles et financement rural.',
    domains: ['AgriTech', 'Agriculture', 'Financement rural', 'Supply chain'],
    price: 20000,
    duration: 45,
    rating: 4.6,
    sessions: 31,
    available: true,
    nextSlot: 'Mercredi 9h',
    languages: ['Français'],
    level: 'platinum',
    indexScore: 668,
    specialty: 'Agri & rural',
  },
]

const DOMAINS = ['Tous', 'Finance', 'Tech/Digital', 'Marketing', 'Santé', 'AgriTech', 'Juridique', 'Startup', 'Produit', 'Export']
const AVAIL_FILTERS = ['Tous', 'Disponible maintenant', 'Cette semaine', 'Disponible']

const LEVEL_CFG = {
  elite:    { color: '#DCF763', bg: 'rgba(220,247,99,0.12)', label: 'Elite ⚡' },
  platinum: { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', label: 'Platinum 💎' },
}

const HOW_IT_WORKS = [
  { num: '01', title: 'Choisis ton mentor', desc: 'Filtre par domaine, disponibilité et budget. Lis les avis des autres entrepreneurs.' },
  { num: '02', title: 'Réserve ta session', desc: 'Choisis un créneau disponible en quelques clics depuis l\'app ou le site.' },
  { num: '03', title: 'Paie en Mobile Money', desc: 'Paiement sécurisé via MTN MoMo ou Orange Money. Débité uniquement après confirmation.' },
  { num: '04', title: 'Session 1-to-1', desc: 'Vidéo call intégré dans l\'app YouthIn. 45 ou 60 min selon le mentor choisi.' },
  { num: '05', title: 'Avis vérifié + points', desc: 'Tu laisses un avis et gagnes +15 pts sur ton YouthIn Index™ automatiquement.' },
]

const BECOME_PERKS = [
  { icon: '💰', title: 'Tarif libre', desc: 'De 10 000 à 100 000 FCFA par session — tu fixes ton prix.' },
  { icon: '📅', title: 'Disponibilités flexibles', desc: 'De 1h à 20h par semaine. Ton agenda, tes règles.' },
  { icon: '📲', title: 'Paiement automatique', desc: 'Mobile Money crédité directement après chaque session confirmée.' },
  { icon: '⚡', title: 'Badge Mentor Vérifié', desc: 'Badge visible sur ton profil public et +25 pts Index™ par session donnée.' },
]

// ── Composants ─────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < Math.floor(rating) ? 'fill-[#DCF763] text-[#DCF763]' : 'text-zinc-700'}
        />
      ))}
    </div>
  )
}

function MentorCard({ mentor }: { mentor: Mentor }) {
  const lvl = LEVEL_CFG[mentor.level]

  return (
    <div className="group bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden
                    hover:border-zinc-700 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]
                    transition-all duration-300 flex flex-col">

      {/* Header coloré */}
      <div className="relative px-6 pt-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center
                            font-black text-lg text-black bg-[#DCF763]">
              {mentor.initials}
            </div>
            {mentor.available && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500
                               border-2 border-[#0A0A0A]" />
            )}
          </div>

          {/* Level badge */}
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ backgroundColor: lvl.bg, color: lvl.color }}>
              {lvl.label}
            </span>
            <span className="text-xs text-zinc-600">{mentor.indexScore} pts</span>
          </div>
        </div>

        {/* Identité */}
        <h3 className="text-lg font-black text-white mb-0.5">{mentor.name}</h3>
        <p className="text-zinc-500 text-sm mb-3">{mentor.title}</p>

        {/* Note */}
        <div className="flex items-center gap-2">
          <StarRating rating={mentor.rating} />
          <span className="text-sm font-bold text-white">{mentor.rating}</span>
          <span className="text-zinc-600 text-sm">· {mentor.sessions} sessions</span>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 pb-4">
        <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">{mentor.bio}</p>
      </div>

      {/* Domaines */}
      <div className="px-6 pb-4 flex flex-wrap gap-1.5">
        {mentor.domains.slice(0, 3).map(d => (
          <span key={d} className="text-xs bg-zinc-800 text-zinc-400 border border-zinc-700
                                   px-2.5 py-1 rounded-lg">
            {d}
          </span>
        ))}
        {mentor.domains.length > 3 && (
          <span className="text-xs text-zinc-600 px-2 py-1">+{mentor.domains.length - 3}</span>
        )}
      </div>

      {/* Infos tarif */}
      <div className="mx-6 mb-4 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-black text-white">
            {mentor.price.toLocaleString('fr-FR')}
            <span className="text-sm font-semibold text-zinc-500 ml-1">FCFA</span>
          </span>
          <span className="flex items-center gap-1.5 text-zinc-500 text-xs">
            <Clock size={11} />
            {mentor.duration} min
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${mentor.available ? 'bg-emerald-500' : 'bg-zinc-600'}`} />
            <span className={`text-xs font-medium ${mentor.available ? 'text-emerald-400' : 'text-zinc-600'}`}>
              {mentor.available ? 'Disponible' : 'Non disponible'}
            </span>
          </div>
          <span className="text-xs text-zinc-600">
            {mentor.nextSlot}
          </span>
        </div>
      </div>

      {/* Langues */}
      <div className="px-6 mb-5 flex items-center gap-1.5">
        <Globe size={11} className="text-zinc-600" />
        <span className="text-xs text-zinc-600">{mentor.languages.join(' · ')}</span>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6 mt-auto">
        <button
          className={`
            w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200
            ${mentor.available
              ? 'bg-[#DCF763] text-black hover:bg-[#DCF763]/90 hover:shadow-[0_0_20px_rgba(220,247,99,0.25)]'
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }
          `}
          disabled={!mentor.available}
        >
          {mentor.available ? 'Réserver une session' : 'Voir les prochains créneaux'}
        </button>
      </div>
    </div>
  )
}

// ── Page principale ────────────────────────────────────────
export default function MentorsPage() {
  const [activeDomain, setActiveDomain] = useState('Tous')
  const [activeAvail, setActiveAvail] = useState('Tous')

  const filtered = MENTORS.filter(m => {
    const domainOk = activeDomain === 'Tous' || m.domains.some(d => d.includes(activeDomain))
    const availOk  = activeAvail === 'Tous'
      || (activeAvail === 'Disponible maintenant' && m.available && m.nextSlot.includes('Aujourd'))
      || (activeAvail === 'Disponible' && m.available)
      || activeAvail === 'Cette semaine'
    return domainOk && availOk
  })

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <Header />

      {/* ══ HERO ══ */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Fond */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[500px]
                          bg-[#DCF763]/[0.03] rounded-full blur-[100px]" />
          <div className="absolute top-20 left-0 w-[400px] h-[400px]
                          bg-[#DCF763]/[0.02] rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <div className="inline-flex items-center gap-2 bg-[#DCF763]/10 border border-[#DCF763]/20
                              rounded-full px-4 py-2 mb-8">
                <span className="text-base">👨‍🏫</span>
                <span className="text-[#DCF763] text-sm font-bold uppercase tracking-widest">
                  Mentor Market
                </span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-black leading-[0.92] mb-6 tracking-tight">
                Ton mentor est là.{' '}
                <span className="text-[#DCF763]">Il t'attend.</span>
              </h1>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-lg">
                Experts vérifiés dans tous les secteurs. Sessions 1-to-1, 45 à 60 min,
                payées en Mobile Money. Des entrepreneurs qui ont déjà fait le chemin.
              </p>

              <div className="flex flex-wrap gap-8 mb-10">
                {[
                  { val: '200+', lbl: 'Mentors vérifiés' },
                  { val: '1 342', lbl: 'Sessions ce mois' },
                  { val: '4.8/5', lbl: 'Note moyenne' },
                ].map(({ val, lbl }) => (
                  <div key={lbl}>
                    <p className="text-3xl font-black text-[#DCF763]">{val}</p>
                    <p className="text-sm text-zinc-500 mt-0.5">{lbl}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="bg-[#DCF763] text-black font-bold px-8 py-4 rounded-2xl
                                   hover:bg-[#DCF763]/90 transition-all hover:scale-[1.02]
                                   hover:shadow-[0_0_30px_rgba(220,247,99,0.3)]
                                   flex items-center gap-2 text-base">
                  Trouver mon mentor
                  <ArrowRight size={18} />
                </button>
                <button className="border border-zinc-700 text-zinc-300 font-semibold px-8 py-4 rounded-2xl
                                   hover:border-zinc-600 hover:text-white transition-colors text-base">
                  Devenir mentor
                </button>
              </div>
            </div>

            {/* Cartes déco hero */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: 'Mentors vérifiés', desc: 'Chaque mentor est validé par l\'équipe YouthIn avant d\'être publié.' },
                { icon: Zap, title: 'YouthIn Index™', desc: '+15 pts sur ton score après chaque session complétée.' },
                { icon: CheckCircle, title: 'Paiement sécurisé', desc: 'MTN MoMo et Orange Money. Débité après confirmation.' },
                { icon: TrendingUp, title: 'Avis vérifiés', desc: 'Seuls les participants ayant fait une session peuvent laisser un avis.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5
                             hover:border-zinc-700 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-[#DCF763]/10 flex items-center justify-center mb-3">
                    <Icon size={16} className="text-[#DCF763]" />
                  </div>
                  <p className="font-bold text-white text-sm mb-1">{title}</p>
                  <p className="text-zinc-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FILTRES ══ */}
      <section className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-sm
                          border-b border-zinc-800 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4">

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-zinc-600 font-semibold uppercase tracking-wider flex-shrink-0">
              Domaine
            </span>
            <div className="flex flex-wrap gap-2">
              {DOMAINS.map(d => (
                <button
                  key={d}
                  onClick={() => setActiveDomain(d)}
                  className={`
                    text-xs font-semibold px-3 py-1.5 rounded-lg transition-all
                    ${activeDomain === d
                      ? 'bg-[#DCF763] text-black'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                    }
                  `}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:ml-auto">
            <span className="text-xs text-zinc-600 font-semibold uppercase tracking-wider flex-shrink-0">
              Dispo
            </span>
            <div className="flex flex-wrap gap-2">
              {AVAIL_FILTERS.map(a => (
                <button
                  key={a}
                  onClick={() => setActiveAvail(a)}
                  className={`
                    text-xs font-semibold px-3 py-1.5 rounded-lg transition-all
                    ${activeAvail === a
                      ? 'bg-[#DCF763] text-black'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:border-zinc-700'
                    }
                  `}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ GRILLE MENTORS ══ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-zinc-500 text-sm">
              <span className="text-white font-bold">{filtered.length}</span> mentor{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
            </p>
            <p className="text-xs text-zinc-600">Trié par disponibilité · note</p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(m => <MentorCard key={m.id} mentor={m} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-zinc-400 font-semibold mb-2">Aucun mentor trouvé</p>
              <p className="text-zinc-600 text-sm">Essaie un autre filtre ou reviens bientôt — de nouveaux mentors arrivent chaque semaine.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══ COMMENT ÇA MARCHE ══ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#DCF763] text-sm font-bold uppercase tracking-widest mb-3">Processus</p>
            <h2 className="text-5xl font-black text-white">Comment fonctionne une session</h2>
          </div>

          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-8 top-8 bottom-8 w-px bg-zinc-800 hidden sm:block" />

            <div className="space-y-4">
              {HOW_IT_WORKS.map((s, i) => (
                <div key={i}
                  className="relative flex gap-6 bg-zinc-900/40 border border-zinc-800
                             rounded-2xl p-6 hover:border-zinc-700 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-700
                                  flex items-center justify-center font-black text-xs text-[#DCF763] z-10">
                    {s.num}
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-white mb-1">{s.title}</p>
                    <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ DEVENIR MENTOR ══ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden">

            {/* Accent top */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#DCF763] to-transparent" />

            <div className="p-10 lg:p-14">
              <div className="grid lg:grid-cols-2 gap-12 items-center">

                <div>
                  <p className="text-[#DCF763] text-sm font-bold uppercase tracking-widest mb-4">Pour les experts</p>
                  <h2 className="text-4xl font-black text-white mb-4 leading-tight">
                    Tu as de l'expérience ?{' '}
                    <span className="text-[#DCF763]">Partage-la.</span>
                  </h2>
                  <p className="text-zinc-400 leading-relaxed mb-8">
                    Rejoins les 200+ mentors YouthIn. Génère un revenu complémentaire
                    en aidant la prochaine génération d'entrepreneurs camerounais.
                    Ton expertise a de la valeur — monétise-la.
                  </p>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-[#DCF763]/15 flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={13} className="text-[#DCF763]" />
                      </div>
                      <span className="text-zinc-300 text-sm">Niveau Gold minimum sur le YouthIn Index™</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-[#DCF763]/15 flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={13} className="text-[#DCF763]" />
                      </div>
                      <span className="text-zinc-300 text-sm">Validation par l'équipe YouthIn (profil + compétences)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-[#DCF763]/15 flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={13} className="text-[#DCF763]" />
                      </div>
                      <span className="text-zinc-300 text-sm">Badge Mentor Vérifié sur le profil public</span>
                    </div>
                  </div>

                  <button className="mt-10 border border-[#DCF763]/40 text-[#DCF763] font-bold
                                     px-8 py-4 rounded-2xl hover:bg-[#DCF763]/10 transition-colors
                                     flex items-center gap-2">
                    Devenir mentor
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {BECOME_PERKS.map(({ icon, title, desc }) => (
                    <div key={title}
                      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5
                                 hover:border-zinc-700 transition-colors">
                      <span className="text-2xl block mb-3">{icon}</span>
                      <p className="font-bold text-white text-sm mb-1.5">{title}</p>
                      <p className="text-zinc-500 text-xs leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}