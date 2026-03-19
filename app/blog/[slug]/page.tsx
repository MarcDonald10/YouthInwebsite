'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import {
    ArrowLeft, Clock, Share2, Bookmark, Heart,
    MessageCircle, ArrowRight, ChevronRight,
    Copy, Check, Twitter, Facebook, Linkedin,
} from 'lucide-react'

// ══ IMPORT ARTICLES (même source que BlogPage) ═════════════
// En production : import { ARTICLES } from '@/data/articles'
// Ici on redéfinit le même tableau pour autonomie complète

type ContentBlock =
    | { type: 'intro' | 'paragraph' | 'conclusion'; text: string }
    | { type: 'h2'; text: string }
    | { type: 'callout'; emoji: string; color: string; title: string; text: string }
    | { type: 'quote'; text: string; author: string }
    | { type: 'image'; src: string; caption: string }
    | { type: 'list'; title?: string; items: string[] }

type FullArticle = {
    id: number
    slug: string
    title: string
    subtitle: string
    date: string
    category: string
    categoryColor: string
    readTime: string
    likes: number
    author: { name: string; initials: string; color: string; role: string; indexScore: number; level: string; bio: string }
    image: string
    tags: string[]
    content: ContentBlock[]
}

const ARTICLE: FullArticle = {
    id: 1,
    slug: '5-erreurs-fatales-entreprise-cameroun',
    title: '5 Erreurs Fatales à Éviter quand on Crée son Entreprise au Cameroun',
    subtitle: 'Basé sur les expériences réelles de 12 847 membres YouthIn — des erreurs de financement à la structure légale en passant par les pièges des partenariats.',
    date: '15 Mars 2026',
    category: 'Entrepreneuriat',
    categoryColor: '#DCF763',
    readTime: '5 min',
    likes: 847,
    author: {
        name: 'Marc Donald',
        initials: 'MD',
        color: '#DCF763',
        role: 'Fondateur & DG · YouthIn',
        indexScore: 642,
        level: 'Gold',
        bio: "Marc Donald est le fondateur de YouthIn, entrepreneur depuis 2022 et mentor de +50 jeunes entrepreneurs à Douala. Il partage régulièrement ses apprentissages sur la construction d'entreprises en Afrique subsaharienne.",
    },
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=85',
    tags: ['#Cameroun', '#Startup', '#Conseils', '#Entrepreneuriat'],
    content: [
        { type: 'intro', text: "Depuis le lancement de YouthIn, notre équipe a accompagné plus de 1 200 entrepreneurs camerounais. Nous avons observé les mêmes erreurs se répéter, coûtant du temps, de l'argent et parfois l'entreprise entière. Voici les 5 plus critiques — et comment les éviter dès maintenant." },
        { type: 'h2', text: 'Erreur 1 — Mélanger finances personnelles et professionnelles' },
        { type: 'paragraph', text: "C'est l'erreur numéro un, et elle est fatale. Beaucoup de jeunes entrepreneurs utilisent le même compte bancaire pour leurs dépenses personnelles et leur activité. Résultat : impossible de savoir si l'entreprise est rentable, impossible de présenter des comptes à une banque, et très difficile de gérer une croissance." },
        { type: 'paragraph', text: "La solution est simple : dès ton premier client, ouvre un compte séparé pour ton activité. Même si c'est un compte personnel au départ, l'important c'est la séparation. Quand tu paieras tes fournisseurs ou encaisseras tes clients, tout sera tracé et justifiable." },
        { type: 'callout', emoji: '💡', color: '#DCF763', title: 'Conseil pratique', text: "Utilise MTN MoMo ou Orange Money avec un numéro dédié à ton activité. C'est gratuit, instantané, et tu as un historique complet de toutes tes transactions — parfait pour justifier tes revenus auprès d'une banque." },
        { type: 'h2', text: 'Erreur 2 — Ne pas formaliser les accords avec les partenaires' },
        { type: 'paragraph', text: "Au Cameroun, beaucoup d'accords se font verbalement ou sur WhatsApp. C'est culturellement normal — mais professionnellement dangereux. Nous avons vu des co-fondateurs se séparer en désaccord complet sur la répartition des actions, des fournisseurs nier des engagements de prix, des clients contester des services rendus." },
        { type: 'paragraph', text: "Un contrat n'a pas besoin d'être compliqué. Un email récapitulatif signé par les deux parties, ou même un message WhatsApp avec confirmation explicite, vaut mieux que rien. Pour les accords importants — associations, partenariats commerciaux significatifs — investis dans un avocat." },
        { type: 'quote', text: "J'ai perdu 6 mois de travail et 800 000 FCFA parce que mon partenaire et moi n'avions rien signé. Depuis, tout passe par écrit, même les petits accords.", author: 'Entrepreneur YouthIn · Gold · Douala' },
        { type: 'h2', text: 'Erreur 3 — Ignorer la structure légale jusqu\'à ce qu\'il soit trop tard' },
        { type: 'paragraph', text: 'Beaucoup d\'entrepreneurs repoussent la création légale de leur entreprise. "Je le ferai quand ça marchera mieux." Le problème : sans structure légale, tu ne peux pas ouvrir un compte professionnel, signer certains contrats, accéder à des marchés publics, ou convaincre des investisseurs sérieux.' },
        {
            type: 'list', title: 'Options légales au Cameroun', items: [
                'Entreprise Individuelle : ~50 000 FCFA, 2 à 3 semaines — idéal pour démarrer seul',
                'SARL : capital minimum 100 000 FCFA — recommandée dès qu\'on est 2 associés',
                'SA : pour les projets ambitieux avec plusieurs investisseurs',
            ]
        },
        { type: 'callout', emoji: '⚡', color: '#8B5CF6', title: 'YouthIn Index™ et légalité', text: 'Les membres YouthIn qui ont une structure légale formelle reçoivent +15 pts sur leur YouthIn Index™ dans le pilier Réputation. C\'est un signal fort de crédibilité pour les partenaires et les banques.' },
        { type: 'h2', text: 'Erreur 4 — Vouloir tout faire seul' },
        { type: 'paragraph', text: "L'entrepreneur solitaire est un mythe. Les projets qui réussissent au Cameroun sont presque toujours portés par une équipe complémentaire. Essayer de gérer seul la technique, la vente, la gestion, la communication et les partenariats mène directement à l'épuisement — souvent avant même d'avoir trouvé ton premier client." },
        { type: 'paragraph', text: "La solution n'est pas forcément d'embaucher dès le départ. C'est d'identifier tes forces réelles, et de déléguer ou d'associer quelqu'un sur tes faiblesses. C'est exactement pour ça que les Villages™ YouthIn existent — pour te connecter aux entrepreneurs complémentaires qui sont près de toi." },
        { type: 'image', src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1000&q=80', caption: "Une session de networking dans un Village™ YouthIn à Douala — la complémentarité des profils crée les vraies opportunités." },
        { type: 'h2', text: 'Erreur 5 — Négliger l\'acquisition client jusqu\'à la fin du développement produit' },
        { type: 'paragraph', text: "Beaucoup passent 6 mois à construire leur produit parfait avant de le montrer à un seul client potentiel. C'est une erreur classique. Tu construis pour des hypothèses, pas pour des besoins réels. Et quand tu montres enfin ton produit, tu découvres que les clients voulaient quelque chose de différent." },
        { type: 'paragraph', text: "La méthode qui marche : vends d'abord, construis ensuite. Trouve 3 clients potentiels dès cette semaine. Présente-leur ton idée. Demande-leur s'ils paieraient. Si oui, à quel prix ? Leurs réponses valent plus que 6 mois de développement." },
        { type: 'callout', emoji: '🎯', color: '#14B8A6', title: 'Prochaine étape', text: "Rejoins le Village™ YouthIn de ton secteur et poste une publication 'Je cherche' pour trouver tes premiers clients. La communauté répond en moins de 24h dans la plupart des Villages™ actifs." },
        { type: 'conclusion', text: "Ces 5 erreurs sont évitables avec les bonnes ressources et la bonne communauté. YouthIn est exactement cette ressource — le réseau, les mentors et l'écosystème qui manquaient aux jeunes entrepreneurs camerounais. Si tu reconnais une de ces erreurs dans ta situation actuelle, c'est le bon moment d'agir." },
    ],
}

// Articles liés
const RELATED = [
    { id: 3, slug: 'guide-complet-concours-youthin-2026', title: 'Guide Complet du Concours YouthIn 2026', category: 'Concours', categoryColor: '#F59E0B', readTime: '8 min', date: '10 Mars 2026', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80', authorInitials: 'FA', authorColor: '#8B5CF6' },
    { id: 4, slug: 'trouver-bon-mentor-startup-camerounaise', title: 'Trouver le Bon Mentor pour ta Startup Camerounaise', category: 'Mentorat', categoryColor: '#8B5CF6', readTime: '6 min', date: '8 Mars 2026', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80', authorInitials: 'AK', authorColor: '#DCF763' },
    { id: 5, slug: 'youthin-index-microcredit-sans-colateral', title: "YouthIn Index™ : Comment j'ai obtenu un microcrédit grâce à mon score", category: 'Success Story', categoryColor: '#22C55E', readTime: '6 min', date: '5 Mars 2026', image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&q=80', authorInitials: 'DB', authorColor: '#8B5CF6' },
]

// ══ BLOCS DE CONTENU ══════════════════════════════════════
function Block({ block }: { block: ContentBlock }) {
    switch (block.type) {
        case 'intro':
            return (
                <p className="text-xl text-zinc-300 leading-relaxed font-light border-l-2 border-[#DCF763]/40 pl-6 italic">
                    {block.text}
                </p>
            )
        case 'h2':
            return (
                <h2 className="text-2xl font-black text-white mt-14 mb-1 tracking-tight"
                    style={{ fontFamily: "'Clash Display',sans-serif" }}>
                    {block.text}
                </h2>
            )
        case 'paragraph':
            return (
                <p className="text-zinc-400 leading-[1.9] text-base font-light">{block.text}</p>
            )
        case 'callout':
            return (
                <div className="rounded-2xl border p-6 flex gap-4 my-2"
                    style={{ borderColor: `${block.color}25`, background: `${block.color}07` }}>
                    <span className="text-2xl flex-shrink-0 mt-0.5">{block.emoji}</span>
                    <div>
                        <p className="font-black text-sm mb-2" style={{ color: block.color }}>{block.title}</p>
                        <p className="text-zinc-400 text-sm leading-relaxed font-light">{block.text}</p>
                    </div>
                </div>
            )
        case 'quote':
            return (
                <blockquote className="relative border-l-4 border-[#DCF763]/50 pl-7 py-2 my-6">
                    <div className="absolute top-0 left-2 text-7xl font-black leading-none select-none"
                        style={{ color: 'rgba(220,247,99,.07)', fontFamily: "'Clash Display',sans-serif" }}>"</div>
                    <p className="text-zinc-200 text-lg italic leading-relaxed mb-3 relative z-10">"{block.text}"</p>
                    <p className="text-zinc-600 text-sm">— {block.author}</p>
                </blockquote>
            )
        case 'image':
            return (
                <div className="rounded-2xl overflow-hidden my-4">
                    <img src={block.src} alt={block.caption} className="w-full object-cover max-h-80" />
                    <p className="text-zinc-600 text-xs mt-2 text-center italic">{block.caption}</p>
                </div>
            )
        case 'list':
            return (
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 my-2">
                    {block.title && <p className="text-white font-black text-sm mb-4">{block.title}</p>}
                    <ul className="space-y-3">
                        {block.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed font-light">
                                <span className="text-[#DCF763] font-black mt-0.5 flex-shrink-0">0{i + 1}</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        case 'conclusion':
            return (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 mt-6">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 rounded-full bg-[#DCF763]" />
                        <span className="text-[#DCF763] text-xs font-black uppercase tracking-[2px]">Conclusion</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed font-light text-base">{block.text}</p>
                </div>
            )
        default:
            return null
    }
}

// ══ PAGE ══════════════════════════════════════════════════
export default function BlogDetailPage() {
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(ARTICLE.likes)
    const [bookmarked, setBookmarked] = useState(false)
    const [copied, setCopied] = useState(false)

    function handleLike() {
        setLiked(v => !v)
        setLikeCount(c => liked ? c - 1 : c + 1)
    }

    function handleCopy() {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <main className="min-h-screen bg-[#080808] text-white">
            <style>{`@import url('https://api.fontshare.com/v2/css?f[]=clash-display@700,600&display=swap');`}</style>
            <Header />

            {/* ── HERO IMAGE ── */}
            <div className="relative h-[58vh] min-h-[420px] overflow-hidden">
                <img src={ARTICLE.image} alt={ARTICLE.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(8,8,8,.25) 0%,rgba(8,8,8,.55) 50%,rgba(8,8,8,1) 100%)' }} />
                <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.15) 2px,rgba(0,0,0,.15) 4px)' }} />

                {/* Breadcrumb */}
                <div className="absolute top-28 left-0 right-0 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <Link href="/blog">
                            <div className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium
                              bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/60 rounded-full px-4 py-2">
                                <ArrowLeft size={14} />
                                Retour au blog
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Meta bas de l'image */}
                <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                            <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-xl"
                                style={{ color: ARTICLE.categoryColor, background: `${ARTICLE.categoryColor}20`, border: `1px solid ${ARTICLE.categoryColor}30` }}>
                                {ARTICLE.category}
                            </span>
                            <span className="flex items-center gap-1.5 text-zinc-400 text-xs">
                                <Clock size={11} />{ARTICLE.readTime} de lecture
                            </span>
                            <span className="text-zinc-600 text-xs">{ARTICLE.date}</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.92] tracking-tight max-w-3xl"
                            style={{ fontFamily: "'Clash Display',sans-serif" }}>
                            {ARTICLE.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* ── CORPS ── */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-[1fr_72px] gap-12 items-start">

                    {/* ── Contenu ── */}
                    <div>
                        {/* Sous-titre */}
                        <p className="text-lg text-zinc-500 mb-10 leading-relaxed font-light border-b border-zinc-800 pb-10">
                            {ARTICLE.subtitle}
                        </p>

                        {/* Auteur + partage */}
                        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base text-black"
                                    style={{ background: ARTICLE.author.color }}>
                                    {ARTICLE.author.initials}
                                </div>
                                <div>
                                    <p className="font-black text-white">{ARTICLE.author.name}</p>
                                    <p className="text-zinc-500 text-sm">{ARTICLE.author.role}</p>
                                </div>
                                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/50">
                                    <span className="text-xs font-bold" style={{ color: '#F59E0B' }}>⚡</span>
                                    <span className="text-xs text-zinc-400">{ARTICLE.author.level} · {ARTICLE.author.indexScore} pts</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {([Twitter, Facebook, Linkedin] as any[]).map((Icon, i) => (
                                    <button key={i} className="w-9 h-9 rounded-xl border border-zinc-800 bg-zinc-900/50
                                             flex items-center justify-center text-zinc-500
                                             hover:text-white hover:border-zinc-700 transition-all">
                                        <Icon size={14} />
                                    </button>
                                ))}
                                <button onClick={handleCopy}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/50
                             text-xs font-semibold text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
                                    {copied ? <><Check size={12} className="text-emerald-400" />Copié !</> : <><Copy size={12} />Copier le lien</>}
                                </button>
                            </div>
                        </div>

                        {/* Contenu de l'article */}
                        <div className="space-y-6">
                            {ARTICLE.content.map((block, i) => <Block key={i} block={block} />)}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-zinc-800">
                            {ARTICLE.tags.map(tag => (
                                <span key={tag} className="text-sm text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl
                                           hover:border-zinc-700 hover:text-zinc-300 cursor-pointer transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Réactions */}
                        <div className="flex items-center gap-3 mt-8 pt-8 border-t border-zinc-800 flex-wrap">
                            <button onClick={handleLike}
                                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border transition-all duration-200 font-semibold text-sm"
                                style={{ borderColor: liked ? 'rgba(239,68,68,.4)' : 'rgba(255,255,255,.08)', background: liked ? 'rgba(239,68,68,.08)' : 'rgba(255,255,255,.03)', color: liked ? '#EF4444' : '#9CA3AF' }}>
                                <Heart size={16} style={{ fill: liked ? '#EF4444' : 'transparent' }} />
                                {likeCount.toLocaleString('fr-FR')} j'aime
                            </button>
                            <button onClick={() => setBookmarked(v => !v)}
                                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border transition-all duration-200 font-semibold text-sm"
                                style={{ borderColor: bookmarked ? 'rgba(220,247,99,.4)' : 'rgba(255,255,255,.08)', background: bookmarked ? 'rgba(220,247,99,.08)' : 'rgba(255,255,255,.03)', color: bookmarked ? '#DCF763' : '#9CA3AF' }}>
                                <Bookmark size={16} style={{ fill: bookmarked ? '#DCF763' : 'transparent' }} />
                                {bookmarked ? 'Sauvegardé' : 'Sauvegarder'}
                            </button>
                            <button className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-zinc-800 bg-zinc-900/30
                                 font-semibold text-sm text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 transition-all">
                                <MessageCircle size={16} />
                                Commenter
                            </button>
                        </div>

                        {/* Card auteur */}
                        <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8">
                            <p className="text-xs font-black uppercase tracking-[3px] text-zinc-600 mb-5">À propos de l'auteur</p>
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-black flex-shrink-0"
                                    style={{ background: ARTICLE.author.color }}>
                                    {ARTICLE.author.initials}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 flex-wrap mb-1.5">
                                        <p className="font-black text-white text-lg" style={{ fontFamily: "'Clash Display',sans-serif" }}>{ARTICLE.author.name}</p>
                                        <span className="text-xs font-bold px-2.5 py-1 rounded-xl" style={{ color: '#F59E0B', background: 'rgba(245,158,11,.12)' }}>
                                            {ARTICLE.author.level} · {ARTICLE.author.indexScore} pts
                                        </span>
                                    </div>
                                    <p className="text-zinc-500 text-sm mb-4">{ARTICLE.author.role}</p>
                                    <p className="text-zinc-400 text-sm leading-relaxed font-light">{ARTICLE.author.bio}</p>
                                </div>
                            </div>
                        </div>

                        {/* ── ARTICLES RECOMMANDÉS ── */}
                        <div className="mt-20 pt-16 border-t border-zinc-800">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <p className="text-[#DCF763] text-xs font-black uppercase tracking-[3px] mb-2">À lire aussi</p>
                                    <h2 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: "'Clash Display',sans-serif" }}>
                                        Articles recommandés
                                    </h2>
                                </div>
                                <Link href="/blog">
                                    <button className="hidden sm:flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-white transition-colors">
                                        Voir tout <ArrowRight size={14} />
                                    </button>
                                </Link>
                            </div>
                            <div className="grid md:grid-cols-3 gap-5">
                                {RELATED.map(article => (
                                    <Link key={article.id} href={`/blog/${article.slug}`}>
                                        <article className="group bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden
                                        hover:border-zinc-700 hover:-translate-y-1
                                        hover:shadow-[0_20px_50px_rgba(0,0,0,.5)]
                                        transition-all duration-400 cursor-pointer">
                                            <div className="relative h-44 overflow-hidden">
                                                <img src={article.image} alt={article.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(9,9,11,.8),transparent 60%)' }} />
                                                <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg"
                                                    style={{ color: article.categoryColor, background: 'rgba(9,9,11,.85)', border: `1px solid ${article.categoryColor}30` }}>
                                                    {article.category}
                                                </span>
                                            </div>
                                            <div className="p-5">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="flex items-center gap-1 text-zinc-600 text-xs"><Clock size={10} />{article.readTime}</span>
                                                    <span className="text-zinc-700">·</span>
                                                    <span className="text-zinc-600 text-xs">{article.date}</span>
                                                </div>
                                                <h3 className="font-black text-white text-sm leading-tight mb-4 group-hover:text-[#DCF763] transition-colors tracking-tight"
                                                    style={{ fontFamily: "'Clash Display',sans-serif" }}>
                                                    {article.title}
                                                </h3>
                                                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                                    <div className="w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs text-black"
                                                        style={{ background: article.authorColor }}>
                                                        {article.authorInitials}
                                                    </div>
                                                    <span className="text-zinc-600 hover:text-[#DCF763] transition-colors text-xs font-bold flex items-center gap-1">
                                                        Lire <ChevronRight size={12} />
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="mt-20">
                            <div className="relative rounded-3xl border border-[#DCF763]/15 overflow-hidden" style={{ background: 'linear-gradient(135deg,rgba(220,247,99,.06),transparent)' }}>
                                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(220,247,99,.5),transparent)' }} />
                                <div className="px-8 sm:px-12 py-12 text-center">
                                    <p className="text-[#DCF763] text-xs font-black uppercase tracking-[3px] mb-3">Newsletter</p>
                                    <h2 className="text-3xl font-black text-white mb-3 tracking-tight" style={{ fontFamily: "'Clash Display',sans-serif" }}>
                                        Ne manque aucun article.
                                    </h2>
                                    <p className="text-zinc-500 mb-8 max-w-md mx-auto font-light">
                                        Un email par semaine avec les meilleures histoires d'entrepreneurs camerounais.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                        <input type="email" placeholder="ton@email.com"
                                            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3.5 text-white
                                 placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-600 transition-colors" />
                                        <button className="bg-[#DCF763] text-black font-black text-sm px-7 py-3.5 rounded-2xl
                                       hover:bg-[#DCF763]/90 hover:scale-[1.02] transition-all flex-shrink-0">
                                            S'abonner →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── SIDEBAR STICKY ── */}
                    <div className="hidden lg:flex flex-col items-center gap-3 sticky top-28">
                        <button onClick={handleLike}
                            className="w-12 h-12 rounded-2xl border flex flex-col items-center justify-center gap-0.5 transition-all duration-200"
                            style={{ borderColor: liked ? 'rgba(239,68,68,.35)' : 'rgba(255,255,255,.08)', background: liked ? 'rgba(239,68,68,.08)' : 'rgba(255,255,255,.03)' }}>
                            <Heart size={16} style={{ color: liked ? '#EF4444' : '#555', fill: liked ? '#EF4444' : 'transparent' }} />
                            <span className="text-[10px] font-bold" style={{ color: liked ? '#EF4444' : '#444' }}>
                                {likeCount > 999 ? `${(likeCount / 1000).toFixed(1)}k` : likeCount}
                            </span>
                        </button>
                        <button onClick={() => setBookmarked(v => !v)}
                            className="w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-200"
                            style={{ borderColor: bookmarked ? 'rgba(220,247,99,.35)' : 'rgba(255,255,255,.08)', background: bookmarked ? 'rgba(220,247,99,.08)' : 'rgba(255,255,255,.03)' }}>
                            <Bookmark size={16} style={{ color: bookmarked ? '#DCF763' : '#555', fill: bookmarked ? '#DCF763' : 'transparent' }} />
                        </button>
                        <button onClick={handleCopy}
                            className="w-12 h-12 rounded-2xl border border-zinc-800 bg-zinc-900/30 flex items-center justify-center
                         text-zinc-600 hover:text-white hover:border-zinc-700 transition-all">
                            {copied ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} />}
                        </button>
                        <div className="w-px h-6 bg-zinc-800 rounded-full" />
                        <button className="w-12 h-12 rounded-2xl bg-zinc-900/30 border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-zinc-400 transition-all">
                            <MessageCircle size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
