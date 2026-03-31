'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArrowRight, Heart, Upload, Trophy, Zap, Users, Clock, ChevronDown, CheckCircle } from 'lucide-react'
import Link from 'next/link'

// ══ STYLES ═══════════════════════════════════════════════
const G = `
  @import url('https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
  .fd{font-family:'Clash Display',sans-serif}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
  @keyframes pulseRing{0%,100%{box-shadow:0 0 0 0 rgba(220,247,99,0)}50%{box-shadow:0 0 0 8px rgba(220,247,99,.08)}}
  @keyframes shimmer{from{background-position:-200% center}to{background-position:200% center}}
  @keyframes countUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
  .h1{animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .05s both}
  .h2{animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .18s both}
  .hs{animation:fadeUp .8s ease .35s both}
  .hc{animation:fadeUp .8s ease .5s both}
  .rv{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}
  .rv.on{opacity:1;transform:none}
`

// ══ COUNTDOWN ════════════════════════════════════════════
const DEADLINE = new Date('2026-04-15T23:59:59').getTime()

function useCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = DEADLINE - Date.now()
      if (diff <= 0) return
      setT({ d: Math.floor(diff/86400000), h: Math.floor((diff%86400000)/3600000), m: Math.floor((diff%3600000)/60000), s: Math.floor((diff%60000)/1000) })
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [])
  return t
}

// ══ REVEAL HOOK ══════════════════════════════════════════
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') }), { threshold: .08 })
    els.forEach(el => obs.observe(el)); return () => obs.disconnect()
  }, [])
}

// ══ DONNÉES ══════════════════════════════════════════════

const PHASES = [
  {
    n: 1, name: "Appel à l'Histoire", icon: "📖", color: "#22C55E",
    status: "TERMINÉ" as const,
    period: "1 — 28 Février 2026",
    tagline: "Tu ne soumets pas un dossier. Tu racontes une histoire.",
    details: [
      "Vidéo pitch de 90 secondes maximum, filmée au téléphone — l'authenticité prime sur la production",
      "3 photos de ton environnement réel : ton lieu de travail, tes premiers utilisateurs, ton quotidien",
      "Réponse à une seule question : « Quel problème tu résous, pour qui exactement, et pourquoi toi ? »",
      "Projets acceptés : phase idée ou prototype uniquement — si tu as déjà des revenus stables, ce n'est pas pour toi",
      "Soumission 100 % gratuite, sans frais, sans dossier administratif complexe",
    ],
  },
  {
    n: 2, name: "Sélection des 50", icon: "🔎", color: "#F59E0B",
    status: "TERMINÉ" as const,
    period: "1 — 7 Mars 2026",
    tagline: "Le pays découvre 50 histoires. L'attachement commence.",
    details: [
      "Le jury YouthIn examine chaque dossier sur 4 critères : précision du problème (35 %), lien personnel avec ce problème (30 %), faisabilité avec les moyens du bord (20 %), YouthIn Index™ (15 %)",
      "L'annonce est publique, ville par ville, avec la photo de chaque candidat retenu — pas un simple email",
      "847 candidatures reçues — 50 histoires sélectionnées",
      "Les Villages™ YouthIn des candidats retenus reçoivent une notification — la mobilisation locale commence",
    ],
  },
  {
    n: 3, name: "Mise en Lumière", icon: "🎬", color: "#DCF763",
    status: "EN COURS" as const,
    period: "8 — 21 Mars 2026",
    tagline: "La phase que personne d'autre ne fait — et c'est là que tout se joue.",
    details: [
      "Pendant 2 semaines, l'équipe YouthIn produit pour chaque candidat : Jour 1 — son histoire personnelle (d'où il vient, ce qui l'a amené là) · Jour 3 — son projet en action (photos terrain, personnes concernées, réalité brute) · Jour 5 — son rêve (ce que ça changerait pour son quartier, sa famille, son secteur)",
      "Format « Avant / Maintenant » : deux photos, zéro texte — le format le plus viral qui soit",
      "Session live dans le Village™ de quartier du candidat : 30 minutes, questions brutes de la communauté, sans script ni filtre",
      "À la fin de ces 2 semaines, le Cameroun connaît 50 entrepreneurs par leur prénom, leur visage et leur histoire",
    ],
  },
  {
    n: 4, name: "Vote Public", icon: "🗳️", color: "#8B5CF6",
    status: "À VENIR" as const,
    period: "22 Mars — 15 Avril 2026",
    tagline: "Le vote est puissant parce que le public connaît déjà les candidats.",
    details: [
      "Dans l'app YouthIn : gratuit, 1 vote par membre vérifié et par projet",
      "Sur le site web : 75 FCFA par vote via MTN MoMo ou Orange Money, ouvert au grand public sans compte requis",
      "Partager le profil d'un candidat sur WhatsApp génère un vote symbolique supplémentaire pour lui",
      "Un candidat dans ton Village™ = notification push immédiate à tous ses membres",
      "Classement en temps réel visible par tous — mis à jour à chaque vote",
      "Toute tentative de manipulation (faux comptes, bots) entraîne la disqualification définitive",
    ],
  },
  {
    n: 5, name: "Défis Terrain", icon: "⚔️", color: "#EC4899",
    status: "À VENIR" as const,
    period: "16 — 30 Avril 2026",
    tagline: "Le spectacle commence. Seul le terrain compte.",
    details: [
      "Top 20 candidats. 3 défis publics sur 2 semaines, jugés par la communauté et le jury",
      "Défi 1 — Le Pitch Réel : convaincs un inconnu dans la rue en moins de 2 minutes, filme-le, publie la vidéo sans montage",
      "Défi 2 — La Preuve Terrain : montre un résultat concret cette semaine — nouveau contact client, test réalisé, prototype amélioré. Pas de slides, des preuves",
      "Défi 3 — La Résolution : un problème concret est posé publiquement, tu as 48 heures pour proposer ta stratégie avec 500 000 FCFA fictifs",
      "Lives hebdomadaires : les candidats débattent, les mentors Elite commentent en direct, la communauté réagit avec les 5 réactions YouthIn",
    ],
  },
  {
    n: 6, name: "Grande Finale", icon: "🏆", color: "#F59E0B",
    status: "À VENIR" as const,
    period: "30 Avril 2026 · Douala",
    tagline: "Un vrai show. Pas une salle de conférence.",
    details: [
      "18h00 — Ouverture : résumé vidéo du parcours complet de chaque finaliste. 10 minutes par candidat. Les images parlent seules",
      "19h30 — Pitch : 7 minutes de présentation + 8 minutes de questions cash du jury. Pas de pitié, pas de politesse forcée",
      "21h00 — Vote final : 30 minutes, public présent + audience en ligne, comptage en direct sur écran géant",
      "21h30 — Remise des prix en direct, retransmis en live sur l'app YouthIn et les réseaux sociaux",
      "Jury composé de : 1 entrepreneur qui a échoué et recommencé, 1 investisseur, 1 mentor Elite YouthIn, 1 représentant banque partenaire",
    ],
  },
  {
    n: 7, name: "L'Après", icon: "🚀", color: "#14B8A6",
    status: "À VENIR" as const,
    period: "Mai — Octobre 2026",
    tagline: "Le concours ne s'arrête pas le 30 avril.",
    details: [
      "Les prix sont débloqués par tranches conditionnées à des livrables validés — pas d'argent donné sans suivi",
      "J+30 : chaque lauréat publie un bilan transparent de l'utilisation de sa première tranche",
      "J+180 : série « Où en sont-ils ? » — mêmes portraits, même format que la Phase 3, pour mesurer l'impact réel",
      "Les non-lauréats entrent automatiquement dans le programme d'accompagnement YouthIn",
      "Boost YouthIn Index™ pour tous les participants selon leur niveau de progression pendant le concours",
    ],
  },
]

const PRIZES = [
  {
    rank: "1er Prix", emoji: "🥇",
    amount: "2 000 000", currency: "FCFA",
    highlight: true,
    structure: "500 000 FCFA immédiat · 1 500 000 FCFA sur 6 mois contre livrables",
    perks: ["6 mois de mentorat hebdomadaire avec un mentor Elite", "Accompagnement juridique et financier complet", "Accès réseau investisseurs YouthIn", "Couverture presse et médias partenaires"],
  },
  {
    rank: "2e Prix", emoji: "🥈",
    amount: "1 000 000", currency: "FCFA",
    highlight: false,
    structure: "Débloqué en 2 tranches contre livrables validés",
    perks: ["3 mois de mentorat intensif", "Kit communication YouthIn", "Visibilité partenaires nationaux"],
  },
  {
    rank: "3e Prix", emoji: "🥉",
    amount: "500 000", currency: "FCFA",
    highlight: false,
    structure: "Débloqué en 2 tranches",
    perks: ["1 mois de mentorat", "Badge Finaliste permanent", "Kit communication YouthIn"],
  },
  {
    rank: "Coup de Cœur", emoji: "❤️",
    amount: "250 000", currency: "FCFA",
    highlight: false,
    structure: "Versement unique",
    perks: ["Badge Coup de Cœur permanent", "Mise en avant communauté", "Session mentor offerte"],
  },
]

const ELIGIBILITY = [
  { icon: "👤", title: "Âge", desc: "18 à 28 ans au 1er janvier 2026" },
  { icon: "🇨🇲", title: "Nationalité", desc: "Camerounais ou résident légal au Cameroun" },
  { icon: "📱", title: "Compte", desc: "Compte YouthIn actif avec numéro vérifié (OTP SMS)" },
  { icon: "💡", title: "Stade du projet", desc: "Idée ou prototype uniquement — pas d'entreprise déjà en activité" },
  { icon: "🤝", title: "Disponibilité", desc: "Être disponible pour les sessions de coaching et de formation" },
  { icon: "✨", title: "Originalité", desc: "Projet inédit, non financé par un autre programme concurrent" },
]

const RULES_GROUPS = [
  {
    cat: "Dossier de candidature", icon: "📋",
    rules: [
      "Soumission 100 % gratuite — aucun frais à aucune étape",
      "1 seul projet par participant — concentre toute ton énergie sur ton meilleur projet",
      "Vidéo pitch obligatoire de 90 secondes maximum, filmée au téléphone (pas de studio requis)",
      "3 photos minimum de terrain : ton environnement réel, pas des images générées ou téléchargées",
      "Réponse à la question unique : « Quel problème tu résous, pour qui exactement, et pourquoi toi ? »",
      "Tout plagiat ou fraude entraîne une disqualification permanente et un badge visible sur le profil YouthIn",
    ],
  },
  {
    cat: "Système de vote", icon: "🗳️",
    rules: [
      "App YouthIn : gratuit, 1 vote par membre vérifié et par projet",
      "Site web : 75 FCFA par vote via MTN MoMo ou Orange Money, ouvert au grand public",
      "Les deux systèmes de vote sont cumulés dans le même classement en temps réel",
      "Toute manipulation (faux comptes, bots, achats de votes) entraîne la disqualification définitive du projet concerné",
    ],
  },
  {
    cat: "Sélection et jury", icon: "⚖️",
    rules: [
      "Le jury sélectionne les 50 dossiers sur : précision du problème (35 %), lien personnel (30 %), faisabilité (20 %), YouthIn Index™ (15 %)",
      "Les Top 20 du vote public passent en phase Défis Terrain",
      "Les 5 finalistes sont sélectionnés par le jury sur les performances aux 3 défis",
      "Les finalistes sont invités à pitcher en personne à Douala le 30 avril 2026",
      "En cas d'égalité, le jury a le dernier mot — sa décision est définitive",
      "Les lauréats doivent être joignables dans les 72 heures suivant l'annonce des résultats",
    ],
  },
  {
    cat: "Prix et accompagnement", icon: "🏆",
    rules: [
      "Les prix sont débloqués par tranches conditionnées à des livrables validés par l'équipe YouthIn",
      "Chaque lauréat bénéficie d'un accompagnement mensuel obligatoire pendant la durée du programme",
      "J+30 après la finale : publication publique de l'utilisation de la première tranche par chaque lauréat",
      "Les non-lauréats reçoivent automatiquement un boost YouthIn Index™ et l'accès au programme d'accompagnement",
    ],
  },
  {
    cat: "YouthIn Index™", icon: "⚡",
    rules: [
      "La participation génère automatiquement des points : Soumission +20 pts · Top 50 +40 pts · Phase Défis +80 pts · Finale +150 pts · Victoire +300 pts",
      "Un dossier disqualifié entraîne la perte de tous les points associés",
    ],
  },
]

const STATS = [
  { v: "847",    l: "Projets soumis" },
  { v: "12 847", l: "Membres actifs" },
  { v: "7",      l: "Phases" },
  { v: "3,75M",  l: "FCFA en jeu" },
]

// ══ PAGE ═════════════════════════════════════════════════
export default function ConcourPage() {
  useReveal()
  const t = useCountdown()
  const [openPhase, setOpenPhase] = useState<number | null>(2)  // phase 3 (index 2) ouverte par défaut
  const [openRule, setOpenRule] = useState<number | null>(null)

  const currentPhase = PHASES.find(p => p.status === "EN COURS")

  return (
    <main className="min-h-screen bg-[#030303] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{G}</style>
      <Header />

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden">
        {/* Fond */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px]"
            style={{ background: "radial-gradient(ellipse, rgba(220,247,99,.055) 0%, transparent 65%)" }} />
          <div className="absolute top-0 right-0 w-[400px] h-[400px]"
            style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(139,92,246,.04) 0%, transparent 60%)" }} />
          <div className="absolute inset-0 opacity-[.025]" style={{ backgroundImage: "linear-gradient(rgba(220,247,99,1) 1px,transparent 1px),linear-gradient(90deg,rgba(220,247,99,1) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
          <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, #030303, transparent)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          {/* Badge statut */}
          <div className="h1 flex items-center gap-3 mb-10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 text-sm font-bold uppercase tracking-[3px]">
              Phase 3 en cours · Mise en Lumière
            </span>
          </div>

          <div className="grid lg:grid-cols-[1fr_460px] gap-16 items-center">
            {/* Titre */}
            <div>
              <h1 className="fd mb-6" style={{ fontSize: "clamp(48px,7vw,96px)", fontWeight: 700, lineHeight: .9, letterSpacing: "-.03em" }}>
                <span className="text-white">Le plus grand concours</span><br />
                <span style={{ color: "#DCF763" }}>entrepreneurial</span><br />
                <span className="text-white">du Cameroun.</span>
              </h1>

              <p className="text-xl text-zinc-400 leading-relaxed mb-4 max-w-lg" style={{ fontWeight: 300 }}>
                Ton idée ou prototype suffit. Soumets ton projet, la communauté vote,
                les meilleurs remportent cash, mentorat et visibilité nationale.
              </p>

              {/* Pills éligibilité */}
              <div className="flex flex-wrap items-center gap-2 mb-10">
                <span className="flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-xl border"
                  style={{ color: "#DCF763", background: "rgba(220,247,99,.08)", borderColor: "rgba(220,247,99,.2)" }}>
                  💡 Phase idée
                </span>
                <span className="text-zinc-700 text-sm">+</span>
                <span className="flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-xl border border-zinc-700 text-zinc-300 bg-zinc-900/50">
                  🔧 Prototype
                </span>
                <span className="text-zinc-600 text-xs ml-1">uniquement acceptés</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link href="/soumettre">
                  <button className="group relative flex items-center gap-3 fd font-semibold text-black text-base px-9 py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(220,247,99,.35)]"
                    style={{ background: "#DCF763" }}>
                    <span className="relative z-10">Soumettre mon projet</span>
                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/voter">
                  <button className="flex items-center gap-2 text-zinc-300 font-semibold text-base px-8 py-4 rounded-2xl border border-zinc-800 hover:border-zinc-600 hover:text-white transition-all">
                    Voir les candidats
                  </button>
                </Link>
              </div>
            </div>

            {/* Bloc droit — Countdown + stats */}
            <div className="flex flex-col gap-5 hs">
              {/* Countdown */}
              <div className="rounded-3xl border border-zinc-800 p-7" style={{ background: "rgba(255,255,255,.025)" }}>
                <p className="text-zinc-600 text-xs font-bold uppercase tracking-[3px] mb-5">Clôture des votes dans</p>
                <div className="grid grid-cols-4 gap-3">
                  {[{ v: t.d, l: "Jours" }, { v: t.h, l: "Heures" }, { v: t.m, l: "Min" }, { v: t.s, l: "Sec" }].map(({ v, l }) => (
                    <div key={l} className="flex flex-col items-center gap-2">
                      <div className="w-full aspect-square rounded-2xl flex items-center justify-center border"
                        style={{ background: "rgba(220,247,99,.07)", borderColor: "rgba(220,247,99,.2)" }}>
                        <span className="fd font-semibold tabular-nums" style={{ fontSize: "clamp(24px,3.5vw,38px)", color: "#DCF763", letterSpacing: "-.04em" }}>
                          {String(v).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-zinc-600 text-[10px] uppercase tracking-widest">{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {STATS.map(({ v, l }) => (
                  <div key={l} className="rounded-2xl border border-zinc-800 px-5 py-4"
                    style={{ background: "rgba(255,255,255,.02)" }}>
                    <p className="fd font-semibold text-white text-2xl leading-none mb-1">{v}</p>
                    <p className="text-zinc-600 text-xs">{l}</p>
                  </div>
                ))}
              </div>

              {/* Phase actuelle */}
              {currentPhase && (
                <div className="rounded-2xl border px-5 py-4"
                  style={{ background: `${currentPhase.color}08`, borderColor: `${currentPhase.color}25` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: currentPhase.color }} />
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: currentPhase.color }} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: currentPhase.color }}>En cours</span>
                  </div>
                  <p className="fd font-semibold text-white text-sm">Phase {currentPhase.n} — {currentPhase.name}</p>
                  <p className="text-zinc-600 text-xs mt-0.5">{currentPhase.period}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONCEPT ══════════════════════════════════════ */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 border-y" style={{ borderColor: "rgba(255,255,255,.04)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" >
            {[
              { icon: "🎬", h: "Une expérience", p: "7 phases qui construisent une histoire nationale — du pitch vidéo à l'impact réel 6 mois après la finale." },
              { icon: "❤️", h: "Une émotion", p: "Le public ne vote pas pour des projets. Il vote pour des personnes qu'il connaît, dont il a suivi le parcours." },
              { icon: "⚔️", h: "Une compétition vraie", p: "Défis terrain filmés, battles publiques, pitch devant jury. Seule la preuve réelle compte." },
            ].map(({ icon, h, p }, i) => (
              <div key={i} className="rv px-8 py-8" style={{ transitionDelay: `${i * .1}s` }}>
                <span className="text-2xl block mb-4">{icon}</span>
                <h3 className="fd font-semibold text-white mb-2">{h}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed" style={{ fontWeight: 300 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PHASES ═══════════════════════════════════════ */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rv text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-1 h-4 rounded-full" style={{ background: "#DCF763" }} />
              <span className="text-xs font-black uppercase tracking-[3px]" style={{ color: "rgba(220,247,99,.6)" }}>Déroulement</span>
              <div className="w-1 h-4 rounded-full" style={{ background: "#DCF763" }} />
            </div>
            <h2 className="fd text-white mb-4" style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, letterSpacing: "-.03em" }}>
              Les 7 phases<br /><span style={{ color: "#DCF763" }}>du concours.</span>
            </h2>
            <p className="text-zinc-500 max-w-lg mx-auto" style={{ fontWeight: 300 }}>
              Chaque phase a un objectif précis. Ensemble, elles construisent une expérience nationale — pas juste un concours.
            </p>
          </div>

          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-[27px] top-6 bottom-6 w-px hidden sm:block"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(220,247,99,.15), rgba(220,247,99,.08), transparent)" }} />

            <div className="space-y-3">
              {PHASES.map((phase, i) => {
                const isCurrent = phase.status === "EN COURS"
                const isDone = phase.status === "TERMINÉ"
                const isOpen = openPhase === i

                return (
                  <div key={i} className="rv relative" style={{ transitionDelay: `${i * .06}s` }}>
                    <div
                      className="relative rounded-2xl border overflow-hidden transition-all duration-300"
                      style={{
                        background: isCurrent
                          ? `linear-gradient(135deg, ${phase.color}09, rgba(3,3,3,.9))`
                          : "rgba(255,255,255,.025)",
                        borderColor: isCurrent ? `${phase.color}35` : isOpen ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.06)",
                      }}>

                      {isCurrent && (
                        <div className="absolute top-0 left-0 right-0 h-[1.5px]"
                          style={{ background: `linear-gradient(90deg, transparent, ${phase.color}, transparent)` }} />
                      )}

                      {/* Header cliquable */}
                      <button
                        className="w-full flex items-center gap-5 px-6 py-5 text-left transition-all"
                        onClick={() => setOpenPhase(isOpen ? null : i)}>

                        {/* Numéro */}
                        <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center fd font-semibold text-sm transition-all"
                          style={{
                            background: isCurrent ? phase.color : isDone ? "rgba(34,197,94,.15)" : "rgba(255,255,255,.05)",
                            color: isCurrent ? "#000" : isDone ? "#22C55E" : "#888",
                          }}>
                          {isDone ? <CheckCircle size={16} /> : phase.n}
                        </div>

                        {/* Infos */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2.5 mb-1">
                            <span className="text-base">{phase.icon}</span>
                            <span className="fd font-semibold text-white text-sm">{phase.name}</span>
                            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex-shrink-0
                              ${isCurrent ? "text-emerald-400 border border-emerald-500/25" : isDone ? "text-zinc-500 bg-zinc-800/60" : "text-zinc-600 bg-zinc-800/40"}`}
                              style={isCurrent ? { background: "rgba(34,197,94,.12)" } : {}}>
                              {phase.status}
                            </span>
                          </div>
                          <p className="text-zinc-600 text-xs flex items-center gap-1.5">
                            <Clock size={11} />{phase.period}
                          </p>
                        </div>

                        <ChevronDown size={15} className="text-zinc-700 flex-shrink-0 transition-transform duration-300"
                          style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
                      </button>

                      {/* Contenu dépliable */}
                      {isOpen && (
                        <div className="px-6 pb-6 border-t" style={{ borderColor: "rgba(255,255,255,.05)" }}>
                          <p className="text-sm font-semibold italic mt-5 mb-5 pl-14"
                            style={{ color: `${phase.color}CC` }}>
                            "{phase.tagline}"
                          </p>
                          <ul className="pl-14 space-y-3">
                            {phase.details.map((d, j) => (
                              <li key={j} className="flex items-start gap-3 text-sm text-zinc-400" style={{ fontWeight: 300 }}>
                                <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: phase.color }} />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ÉLIGIBILITÉ ══════════════════════════════════ */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 border-y" style={{ borderColor: "rgba(255,255,255,.04)", background: "rgba(255,255,255,.012)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="rv text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-1 h-4 rounded-full" style={{ background: "#DCF763" }} />
              <span className="text-xs font-black uppercase tracking-[3px]" style={{ color: "rgba(220,247,99,.6)" }}>Éligibilité</span>
              <div className="w-1 h-4 rounded-full" style={{ background: "#DCF763" }} />
            </div>
            <h2 className="fd text-white mb-4" style={{ fontSize: "clamp(32px,4vw,54px)", fontWeight: 700, letterSpacing: "-.03em" }}>
              Ce concours est fait pour toi si…
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 rv" style={{ transitionDelay: ".1s" }}>
            {ELIGIBILITY.map(({ icon, title, desc }, i) => (
              <div key={i} className="group flex gap-4 rounded-2xl border border-zinc-800 p-5 transition-all duration-200 hover:border-zinc-700"
                style={{ background: "rgba(255,255,255,.02)" }}>
                <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="fd font-semibold text-white text-sm mb-1">{title}</p>
                  <p className="text-zinc-500 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRIX ═════════════════════════════════════════ */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px]"
            style={{ background: "radial-gradient(ellipse, rgba(220,247,99,.04) 0%, transparent 60%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="rv text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-1 h-4 rounded-full" style={{ background: "#DCF763" }} />
              <span className="text-xs font-black uppercase tracking-[3px]" style={{ color: "rgba(220,247,99,.6)" }}>Récompenses</span>
              <div className="w-1 h-4 rounded-full" style={{ background: "#DCF763" }} />
            </div>
            <h2 className="fd text-white mb-4" style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, letterSpacing: "-.03em" }}>
              3 750 000 FCFA<br /><span style={{ color: "#DCF763" }}>à remporter.</span>
            </h2>
            <p className="text-zinc-500 max-w-lg mx-auto" style={{ fontWeight: 300 }}>
              Les prix sont débloqués par tranches conditionnées à des livrables. Parce qu'un accompagnement réel vaut plus qu'un chèque unique.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRIZES.map((p, i) => (
              <div key={i} className={`rv relative rounded-3xl border flex flex-col gap-5 p-7 transition-all duration-300 hover:-translate-y-1`}
                style={{
                  background: p.highlight ? "rgba(220,247,99,.05)" : "rgba(255,255,255,.025)",
                  borderColor: p.highlight ? "rgba(220,247,99,.3)" : "rgba(255,255,255,.07)",
                  transitionDelay: `${i * .08}s`,
                  boxShadow: p.highlight ? "0 0 50px rgba(220,247,99,.06)" : "none",
                }}>

                {p.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#DCF763] text-black text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
                      Grand Prix
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{p.emoji}</span>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: p.highlight ? "#DCF763" : "#666" }}>{p.rank}</span>
                  </div>
                  <p className="fd font-semibold leading-none mb-1" style={{ fontSize: "clamp(28px,3vw,36px)", color: p.highlight ? "#fff" : "#ccc" }}>
                    {p.amount}
                  </p>
                  <p className="text-zinc-600 text-sm">{p.currency}</p>
                </div>

                <div className="h-px" style={{ background: "rgba(255,255,255,.06)" }} />

                {p.structure && (
                  <p className="text-xs leading-relaxed" style={{ color: p.highlight ? "rgba(220,247,99,.7)" : "#555" }}>
                    💡 {p.structure}
                  </p>
                )}

                <ul className="space-y-2.5 flex-1">
                  {p.perks.map((perk, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-xs text-zinc-400" style={{ fontWeight: 300 }}>
                      <span className="flex-shrink-0 mt-1" style={{ color: p.highlight ? "#DCF763" : "#555" }}>✦</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RÈGLES ═══════════════════════════════════════ */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: "rgba(255,255,255,.04)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="rv text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-1 h-4 rounded-full" style={{ background: "#DCF763" }} />
              <span className="text-xs font-black uppercase tracking-[3px]" style={{ color: "rgba(220,247,99,.6)" }}>Conditions</span>
              <div className="w-1 h-4 rounded-full" style={{ background: "#DCF763" }} />
            </div>
            <h2 className="fd text-white" style={{ fontSize: "clamp(32px,4vw,54px)", fontWeight: 700, letterSpacing: "-.03em" }}>
              Règles de Participation
            </h2>
          </div>

          <div className="space-y-3 rv" style={{ transitionDelay: ".1s" }}>
            {RULES_GROUPS.map((g, gi) => (
              <div key={gi} className="rounded-2xl border overflow-hidden transition-all duration-200"
                style={{
                  background: openRule === gi ? "rgba(220,247,99,.03)" : "rgba(255,255,255,.025)",
                  borderColor: openRule === gi ? "rgba(220,247,99,.15)" : "rgba(255,255,255,.07)",
                }}>
                <button className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenRule(openRule === gi ? null : gi)}>
                  <span className="text-lg flex-shrink-0">{g.icon}</span>
                  <span className="fd font-semibold text-white text-sm flex-1">{g.cat}</span>
                  <ChevronDown size={14} className="text-zinc-600 flex-shrink-0 transition-transform duration-300"
                    style={{ transform: openRule === gi ? "rotate(180deg)" : "none" }} />
                </button>
                {openRule === gi && (
                  <div className="px-6 pb-6 border-t" style={{ borderColor: "rgba(255,255,255,.05)" }}>
                    <ul className="pt-5 space-y-4">
                      {g.rules.map((r, ri) => (
                        <li key={ri} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5"
                            style={{ background: "rgba(220,247,99,.08)", border: "1px solid rgba(220,247,99,.12)" }}>
                            <span className="text-[10px] font-black" style={{ color: "#DCF763" }}>{ri + 1}</span>
                          </div>
                          <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontWeight: 300 }}>{r}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="rv text-center mt-8" style={{ transitionDelay: ".3s" }}>
            <button className="text-zinc-500 text-sm font-semibold border border-zinc-800 px-5 py-2.5 rounded-xl hover:border-zinc-700 hover:text-zinc-300 transition-all">
              Télécharger le règlement complet (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ════════════════════════════════════ */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
            style={{ background: "radial-gradient(ellipse, rgba(220,247,99,.05) 0%, transparent 60%)" }} />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Soumettre */}
            <div className="rv group relative rounded-3xl border overflow-hidden p-10 flex flex-col gap-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,.6)]"
              style={{ borderColor: "rgba(220,247,99,.18)", background: "linear-gradient(135deg, rgba(220,247,99,.07), rgba(220,247,99,.02))" }}>
              <div className="absolute top-0 left-0 right-0 h-[1.5px]"
                style={{ background: "linear-gradient(90deg, transparent, rgba(220,247,99,.6), transparent)" }} />
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(220,247,99,.12)", border: "1px solid rgba(220,247,99,.2)" }}>
                <Upload className="text-[#DCF763]" size={20} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[3px] mb-3" style={{ color: "rgba(220,247,99,.6)" }}>Gratuit · Idée ou prototype</p>
                <h3 className="fd font-semibold text-white text-2xl mb-3 tracking-tight">Soumettre mon projet</h3>
                <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  Tu n'as pas besoin d'avoir déjà commencé. Une idée claire et une histoire authentique suffisent.
                </p>
              </div>
              <Link href="/soumettre" className="mt-auto">
                <button className="group/btn w-full flex items-center justify-center gap-3 fd font-semibold text-black py-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(220,247,99,.3)]"
                  style={{ background: "#DCF763" }}>
                  Soumettre maintenant
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            {/* Voter */}
            <div className="rv group relative rounded-3xl border border-zinc-800 overflow-hidden p-10 flex flex-col gap-6 transition-all duration-400 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-[0_24px_60px_rgba(0,0,0,.5)]"
              style={{ background: "rgba(255,255,255,.02)", transitionDelay: ".08s" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-zinc-800 border border-zinc-700">
                <Heart className="text-zinc-300" size={20} />
              </div>
              <div>
                <p className="text-zinc-600 text-xs font-black uppercase tracking-[3px] mb-3">Vote public ouvert</p>
                <h3 className="fd font-semibold text-white text-2xl mb-3 tracking-tight">Voter pour un projet</h3>
                <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  Découvre les 50 candidats sélectionnés. Vote dans l'app{" "}
                  <span className="text-[#DCF763] font-semibold">gratuitement</span>{" "}
                  ou sur le site à <span className="text-white font-semibold">75 FCFA / vote</span>.
                </p>
              </div>
              <Link href="/voter" className="mt-auto">
                <button className="w-full flex items-center justify-center gap-2 font-semibold text-white py-4 rounded-2xl border border-zinc-700 transition-all hover:bg-zinc-800 hover:border-zinc-600">
                  Voir les candidats
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}