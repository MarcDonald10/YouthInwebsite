'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { ArrowRight, Clock, ChevronRight, Search } from 'lucide-react'

// ══ DONNÉES ════════════════════════════════════════════════
export type Article = {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  categoryColor: string
  readTime: string
  author: string
  authorInitials: string
  authorColor: string
  image: string
  featured?: boolean
  tags: string[]
}

export const ARTICLES: Article[] = [
  {
    id: 1,
    slug: '5-erreurs-fatales-entreprise-cameroun',
    featured: true,
    title: '5 Erreurs Fatales à Éviter quand on Crée son Entreprise au Cameroun',
    excerpt: 'Découvre les pièges courants que commettent les jeunes entrepreneurs et comment les éviter. Basé sur les expériences réelles de nos 12 847 membres YouthIn — des erreurs de financement à la structure légale.',
    date: '15 Mars 2026',
    category: 'Entrepreneuriat',
    categoryColor: '#DCF763',
    readTime: '5 min',
    author: 'Marc Donald',
    authorInitials: 'MD',
    authorColor: '#DCF763',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1000&q=80',
    tags: ['#Cameroun', '#Startup', '#Conseils'],
  },
  {
    id: 2,
    slug: 'agriconnect-3847-votes-30-jours',
    title: 'Comment AgriConnect a obtenu 3 847 votes en 30 jours',
    excerpt: 'Fatima Mbarga partage sa stratégie complète pour mobiliser sa communauté, optimiser sa page projet et utiliser les Villages™ YouthIn pour maximiser la visibilité de son projet AgriTech.',
    date: '12 Mars 2026',
    category: 'Success Story',
    categoryColor: '#22C55E',
    readTime: '7 min',
    author: 'Fatima Mbarga',
    authorInitials: 'FM',
    authorColor: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
    tags: ['#AgriTech', '#Concours', '#Stratégie'],
  },
  {
    id: 3,
    slug: 'guide-complet-concours-youthin-2026',
    title: 'Guide Complet du Concours YouthIn 2026 — Tout ce que tu dois savoir',
    excerpt: 'Règles, phases, stratégies et erreurs à éviter. Un guide écrit par l\'équipe YouthIn pour maximiser tes chances de passer de la soumission à la Grande Finale de Douala.',
    date: '10 Mars 2026',
    category: 'Concours',
    categoryColor: '#F59E0B',
    readTime: '8 min',
    author: 'Farelle',
    authorInitials: 'FA',
    authorColor: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    tags: ['#Concours2026', '#YouthIn', '#Guide'],
  },
  {
    id: 4,
    slug: 'trouver-bon-mentor-startup-camerounaise',
    title: 'Trouver le Bon Mentor pour ta Startup Camerounaise',
    excerpt: 'Comment choisir un mentor qui convient à tes besoins réels ? Guide pratique pour naviguer le Mentor Market YouthIn et tirer le maximum de chaque session de 45 à 60 minutes.',
    date: '8 Mars 2026',
    category: 'Mentorat',
    categoryColor: '#8B5CF6',
    readTime: '6 min',
    author: 'Arnauld Kodo',
    authorInitials: 'AK',
    authorColor: '#DCF763',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    tags: ['#Mentorat', '#Startup', '#Finance'],
  },
  {
    id: 5,
    slug: 'youthin-index-microcredit-sans-colateral',
    title: 'YouthIn Index™ : Comment j\'ai obtenu un microcrédit grâce à mon score',
    excerpt: 'Donald Baliaba explique comment il a fait passer son YouthIn Index™ de 280 à 642 pts en 8 mois — et comment une banque partenaire lui a accordé un prêt sans collatéral.',
    date: '5 Mars 2026',
    category: 'Success Story',
    categoryColor: '#22C55E',
    readTime: '6 min',
    author: 'Donald Baliaba',
    authorInitials: 'DB',
    authorColor: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80',
    tags: ['#Index', '#Financement', '#BTP'],
  },
  {
    id: 6,
    slug: '4-types-villages-youthin-propulser-activite',
    title: 'Les 4 Types de Villages™ YouthIn et comment chacun peut te propulser',
    excerpt: 'National, Ville, Quartier ou Secteur — chaque Village™ a ses propres règles du jeu. Comment tirer le meilleur de chacun pour faire décoller ton activité entrepreneuriale.',
    date: '2 Mars 2026',
    category: 'Communauté',
    categoryColor: '#14B8A6',
    readTime: '5 min',
    author: 'Farelle',
    authorInitials: 'FA',
    authorColor: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    tags: ['#Villages', '#Communauté', '#Réseau'],
  },
  {
    id: 7,
    slug: 'agritech-cameroun-7-startups-agriculture-locale',
    title: 'AgriTech au Cameroun : 7 Startups qui changent l\'agriculture locale',
    excerpt: 'De Bafoussam à Garoua, une nouvelle génération d\'entrepreneurs transforme l\'agriculture camerounaise avec des solutions digitales accessibles même sans connexion permanente.',
    date: '28 Fév 2026',
    category: 'Écosystème',
    categoryColor: '#EC4899',
    readTime: '9 min',
    author: 'Frank',
    authorInitials: 'FK',
    authorColor: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?w=800&q=80',
    tags: ['#AgriTech', '#Innovation', '#Cameroun'],
  },
  {
    id: 8,
    slug: 'youthin-index-regulierite-resultats-reseau-reputation',
    title: 'Les 4R du YouthIn Index™ : comprendre et maximiser chaque pilier',
    excerpt: 'Régularité, Résultats, Réseau, Réputation — chaque pilier joue un rôle précis dans ton score. Ce guide te montre comment optimiser chacun sans gaming artificiel.',
    date: '25 Fév 2026',
    category: 'Entrepreneuriat',
    categoryColor: '#DCF763',
    readTime: '7 min',
    author: 'Valérie',
    authorInitials: 'VL',
    authorColor: '#14B8A6',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    tags: ['#Index', '#YouthIn', '#Score'],
  },
]

const CATEGORIES = ['Tous', 'Entrepreneuriat', 'Success Story', 'Concours', 'Mentorat', 'Communauté', 'Écosystème']

// ══ PAGE ══════════════════════════════════════════════════
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = ARTICLES.filter(a => {
    const matchCat = activeCategory === 'Tous' || a.category === activeCategory
    const q = searchQuery.toLowerCase()
    const matchSearch = !q ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    return matchCat && matchSearch
  })

  const featured = filtered.find(a => a.featured) ?? filtered[0]
  const rest = filtered.filter(a => a.id !== featured?.id)

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <style>{`@import url('https://api.fontshare.com/v2/css?f[]=clash-display@700,600&display=swap');`}</style>
      <Header />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#DCF763]/[0.04] rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[.025]" style={{backgroundImage:'linear-gradient(rgba(220,247,99,1) 1px,transparent 1px),linear-gradient(90deg,rgba(220,247,99,1) 1px,transparent 1px)',backgroundSize:'72px 72px'}} />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-5 rounded-full bg-[#DCF763]" />
            <span className="text-[#DCF763] text-xs font-black uppercase tracking-[3px]">Histoires & Apprentissages</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-end mb-12">
            <div>
              <h1 className="text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight mb-5" style={{fontFamily:"'Clash Display',sans-serif"}}>
                Apprends des<br /><span className="text-[#DCF763]">meilleurs.</span>
              </h1>
              <p className="text-xl text-zinc-400 leading-relaxed max-w-lg" style={{fontWeight:300}}>
                Articles, conseils et histoires d'entrepreneurs camerounais. Partage ton expérience, grandis avec la communauté YouthIn.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {[{v:String(ARTICLES.length),l:'Articles publiés'},{v:'6',l:'Catégories'},{v:'1 200+',l:'Abonnés newsletter'}].map(({v,l})=>(
                <div key={l} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl px-5 py-4">
                  <p className="text-2xl font-black text-[#DCF763]" style={{fontFamily:"'Clash Display',sans-serif"}}>{v}</p>
                  <p className="text-zinc-600 text-xs mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recherche */}
          <div className="relative max-w-lg">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un article, un auteur, un tag..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-4 py-3.5
                         text-white placeholder-zinc-600 text-sm
                         focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ── FILTRES STICKY ── */}
      <div className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-sm border-b border-zinc-900 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={()=>setActiveCategory(cat)}
              className="flex-shrink-0 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all duration-200"
              style={{
                background: activeCategory===cat ? '#DCF763' : 'rgba(255,255,255,.04)',
                color: activeCategory===cat ? '#000' : 'rgba(255,255,255,.4)',
                border: `1px solid ${activeCategory===cat ? 'transparent' : 'rgba(255,255,255,.07)'}`,
              }}>
              {cat}
            </button>
          ))}
          {filtered.length > 0 && (
            <span className="ml-auto flex-shrink-0 text-xs text-zinc-600">
              {filtered.length} article{filtered.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* ── ARTICLE FEATURED ── */}
        {featured && (
          <Link href={`/blog/${featured.slug}`}>
            <div className="group relative rounded-3xl overflow-hidden border border-zinc-800
                            hover:border-zinc-700 transition-all duration-500 hover:-translate-y-1
                            hover:shadow-[0_30px_80px_rgba(0,0,0,.6)] cursor-pointer">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto min-h-[360px] overflow-hidden">
                  <img src={featured.image} alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{background:'linear-gradient(to right,transparent 60%,rgba(9,9,11,1) 100%)'}} />
                  <div className="absolute inset-0 lg:hidden" style={{background:'linear-gradient(to top,rgba(9,9,11,1) 0%,transparent 60%)'}} />
                  <div className="absolute top-5 left-5 flex items-center gap-2 bg-[#DCF763] text-black text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-xl">
                    ✦ À la Une
                  </div>
                </div>
                <div className="relative p-8 sm:p-10 lg:p-12 flex flex-col justify-center" style={{background:'rgba(9,9,11,.95)'}}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-xl"
                      style={{color:featured.categoryColor,background:`${featured.categoryColor}15`,border:`1px solid ${featured.categoryColor}25`}}>
                      {featured.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-600 text-xs">
                      <Clock size={11} />{featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-5 tracking-tight" style={{fontFamily:"'Clash Display',sans-serif"}}>
                    {featured.title}
                  </h2>
                  <p className="text-zinc-400 leading-relaxed mb-8 text-base" style={{fontWeight:300}}>{featured.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featured.tags.map(tag=>(
                      <span key={tag} className="text-xs text-zinc-600 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-lg">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-black" style={{background:featured.authorColor}}>{featured.authorInitials}</div>
                      <div>
                        <p className="text-white font-semibold text-sm">{featured.author}</p>
                        <p className="text-zinc-600 text-xs">{featured.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-sm group-hover:translate-x-1 transition-transform" style={{color:featured.categoryColor}}>
                      Lire l'article <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* ── GRILLE ── */}
        {rest.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-white tracking-tight" style={{fontFamily:"'Clash Display',sans-serif"}}>
                {activeCategory === 'Tous' ? 'Tous les articles' : activeCategory}
                <span className="text-zinc-700 font-normal text-lg ml-3">({rest.length})</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map(article=>(
                <Link key={article.id} href={`/blog/${article.slug}`}>
                  <article className="group bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden
                                      hover:border-zinc-700 hover:-translate-y-1.5
                                      hover:shadow-[0_20px_50px_rgba(0,0,0,.5)]
                                      transition-all duration-400 cursor-pointer h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <img src={article.image} alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0" style={{background:'linear-gradient(to top,rgba(9,9,11,.8) 0%,transparent 60%)'}} />
                      <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg"
                        style={{color:article.categoryColor,background:'rgba(9,9,11,.85)',border:`1px solid ${article.categoryColor}30`}}>
                        {article.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="flex items-center gap-1.5 text-zinc-600 text-xs"><Clock size={11} />{article.readTime}</span>
                        <span className="text-zinc-700">·</span>
                        <span className="text-zinc-600 text-xs">{article.date}</span>
                      </div>
                      <h3 className="text-lg font-black text-white leading-tight mb-3 flex-1
                                     group-hover:text-[#DCF763] transition-colors duration-200 tracking-tight" style={{fontFamily:"'Clash Display',sans-serif"}}>
                        {article.title}
                      </h3>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-5 line-clamp-2" style={{fontWeight:300}}>{article.excerpt}</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {article.tags.slice(0,2).map(tag=>(
                          <span key={tag} className="text-[10px] text-zinc-600 bg-zinc-900 border border-zinc-800/80 px-2 py-0.5 rounded-md">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 mt-auto">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs text-black flex-shrink-0" style={{background:article.authorColor}}>{article.authorInitials}</div>
                          <span className="text-zinc-400 text-xs font-medium">{article.author}</span>
                        </div>
                        <span className="text-zinc-600 group-hover:text-[#DCF763] transition-colors text-xs font-bold flex items-center gap-1">
                          Lire <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-zinc-400 font-semibold text-lg mb-2">Aucun résultat</p>
            <p className="text-zinc-600 text-sm mb-6">Essaie un autre terme ou réinitialise les filtres.</p>
            <button onClick={()=>{setActiveCategory('Tous');setSearchQuery('')}}
              className="text-[#DCF763] text-sm font-bold hover:underline">
              Voir tous les articles
            </button>
          </div>
        )}
      </div>

      {/* ── NEWSLETTER ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative rounded-3xl border border-[#DCF763]/15 overflow-hidden" style={{background:'linear-gradient(135deg,rgba(220,247,99,.06),transparent)'}}>
          <div className="absolute top-0 left-0 right-0 h-[1px]" style={{background:'linear-gradient(90deg,transparent,rgba(220,247,99,.5),transparent)'}} />
          <div className="px-8 sm:px-14 py-14 text-center">
            <p className="text-[#DCF763] text-xs font-black uppercase tracking-[3px] mb-4">Newsletter</p>
            <h2 className="text-4xl font-black text-white mb-3 tracking-tight" style={{fontFamily:"'Clash Display',sans-serif"}}>
              Reçois nos meilleurs articles.
            </h2>
            <p className="text-zinc-500 mb-10 max-w-md mx-auto leading-relaxed" style={{fontWeight:300}}>
              Zéro spam. Un email par semaine avec les meilleures histoires d'entrepreneurs camerounais et les opportunités YouthIn.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="ton@email.com"
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3.5 text-white
                           placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-600 transition-colors" />
              <button className="bg-[#DCF763] text-black font-black text-sm px-7 py-3.5 rounded-2xl
                                 hover:bg-[#DCF763]/90 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(220,247,99,.3)]
                                 transition-all duration-200 flex-shrink-0 whitespace-nowrap">
                S'abonner →
              </button>
            </div>
            <p className="text-zinc-700 text-xs mt-4">Déjà <span className="text-zinc-500">1 200+</span> entrepreneurs abonnés</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
