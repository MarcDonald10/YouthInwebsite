'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  Trophy, Users, Zap, CheckCircle, ArrowRight,
  Upload, X, ChevronDown, ChevronUp, AlertCircle,
  Loader2, FileText, Image as ImageIcon, Video,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// ── Types ──────────────────────────────────────────────────
type Sector =
  | '' | 'AgriTech & Agro-Alimentaire' | 'Tech & Digital'
  | 'Commerce & Distribution' |'Éducation & Formation'|'Culturel'

type Stage = '' | 'Idée' | 'Prototype' | 'Pilote en cours' | 'Déjà lancé'

interface FormData {
  // Projet
  title: string
  accroche: string
  sector: Sector
  stage: Stage
  city: string
  teamSize: string
  // Description
  problem: string
  solution: string
  impact: string
  description: string
  // Porteur
  firstName: string
  lastName: string
  phone: string
  email: string
  // Médias
  coverFile: File | null
  videoUrl: string
}

const SECTORS: Sector[] = [
  '', 'AgriTech & Agro-Alimentaire', 'Tech & Digital', 
  'Commerce & Distribution', 'Éducation & Formation','Culturel' 
]

const STAGES: Stage[] = ['', 'Idée', 'Prototype']

const CITIES = [
  '', 'Douala', 'Yaoundé', 'Bafoussam', 'Garoua', 'Maroua',
  'Ngaoundéré', 'Bertoua', 'Ebolowa', 'Limbe', 'Buea', 'Autre',
]

// ── Avantages ──────────────────────────────────────────────
const BENEFITS = [
  {
    icon: Trophy,
    title: 'Jusqu\'à 2 000 000 FCFA',
    desc: 'Grand Prix + mentorat intensif 6 mois',
  },
  {
    icon: Users,
    title: 'Mentors experts',
    desc: 'Accompagnement de leaders d\'industrie camerounais',
  },
  {
    icon: Zap,
    title: 'Visibilité nationale',
    desc: 'Couverture presse, investisseurs, réseau YouthIn',
  },
  {
    icon: CheckCircle,
    title: 'YouthIn Index™ boosté',
    desc: '+20 à +300 pts sur ton score selon ta progression',
  },
]

// ── Étapes ─────────────────────────────────────────────────
const STEPS_INFO = [
  {
    num: '01',
    title: 'Remplis le formulaire',
    desc: 'Décris ton projet, le problème résolu et ton impact visé.',
  },
  {
    num: '02',
    title: 'Soumets gratuitement',
    desc: 'Aucun frais. La soumission est ouverte à tous les membres YouthIn.',
  },
  {
    num: '03',
    title: 'Validation sous 48h',
    desc: 'L\'équipe YouthIn vérifie ton dossier et confirme par SMS.',
  },
  {
    num: '04',
    title: 'La communauté vote',
    desc: 'Ton projet est visible par tous. Mobilise ton réseau pour voter.',
  },
]

// ── FAQ ────────────────────────────────────────────────────
const FAQ = [
  {
    q: 'La soumission est-elle gratuite ?',
    a: 'Oui, la soumission est entièrement gratuite pour tous les jeunes de 18 à 28 ans.',
  },
  {
    q: 'Puis-je soumettre plusieurs projets ?',
    a: 'Non, 1 seul projet par participant. Concentre toute ton énergie sur ton meilleur projet.',
  },
  {
    q: 'Quand commence le vote public ?',
    a: 'Le vote commence dès que ton projet est validé par l\'équipe YouthIn, généralement sous 48h après soumission.',
  },
  {
    q: 'Dois-je déjà avoir une entreprise existante ?',
    a: 'Non. Les projets en phase d\'idée ou prototype uniquement sont  acceptés. Ce qui compte c\'est la pertinence du problème résolu et la viabilité de ta solution.',
  },
  {
    q: 'Comment sont sélectionnés les finalistes ?',
    a: 'Les Top 50 du vote public passent devant le jury qui sélectionne les 20 demi-finalistes, puis les 5 finalistes, évalués sur pertinence, viabilité et impact local.',
  },
  {
    q: 'Puis-je modifier mon dossier après soumission ?',
    a: 'Oui, jusqu\'à la clôture des soumissions. Une fois en phase de vote, le dossier est figé.',
  },
]

// ── Composants utilitaires ────────────────────────────────

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-zinc-200 mb-2">
      {children}
      {required && <span className="text-[#DCF763] ml-1">*</span>}
    </label>
  )
}

function Input({
  value, onChange, placeholder, maxLength, type = 'text',
}: {
  value: string; onChange: (v: string) => void
  placeholder?: string; maxLength?: number; type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3
                 text-white placeholder-zinc-600 text-sm
                 focus:outline-none focus:border-[#DCF763]/60 focus:ring-1 focus:ring-[#DCF763]/20
                 transition-colors"
    />
  )
}

function Textarea({
  value, onChange, placeholder, maxLength, rows = 4,
}: {
  value: string; onChange: (v: string) => void
  placeholder?: string; maxLength?: number; rows?: number
}) {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3
                   text-white placeholder-zinc-600 text-sm resize-none
                   focus:outline-none focus:border-[#DCF763]/60 focus:ring-1 focus:ring-[#DCF763]/20
                   transition-colors"
      />
      {maxLength && (
        <span className="absolute bottom-3 right-4 text-xs text-zinc-600">
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  )
}

function Select<T extends string>({
  value, onChange, options, placeholder,
}: {
  value: T; onChange: (v: T) => void; options: T[]; placeholder?: string
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value as T)}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3
                   text-sm appearance-none cursor-pointer
                   focus:outline-none focus:border-[#DCF763]/60 focus:ring-1 focus:ring-[#DCF763]/20
                   transition-colors
                   [&>option]:bg-zinc-900
                   text-white"
      >
        {options.map(o => (
          <option key={o} value={o} disabled={o === ''} className="text-white">
            {o === '' ? (placeholder ?? 'Choisir...') : o}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
    </div>
  )
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <div className={`
            h-1.5 flex-1 rounded-full transition-all duration-500
            ${i < step ? 'bg-[#DCF763]' : i === step - 1 ? 'bg-[#DCF763]/60' : 'bg-zinc-800'}
          `} />
        </div>
      ))}
      <span className="text-xs text-zinc-500 flex-shrink-0">{step}/{total}</span>
    </div>
  )
}

// ── Formulaire principal ───────────────────────────────────
function ProjectForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState<FormData>({
    title: '', accroche: '', sector: '', stage: '', city: '', teamSize: '',
    problem: '', solution: '', impact: '',
    firstName: '', lastName: '', phone: '', email: '',
    coverFile: null, videoUrl: '',description: '',
  })

  const set = (field: keyof FormData) => (v: any) =>
    setForm(prev => ({ ...prev, [field]: v }))

  function scrollTop() {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function goNext() { setStep(s => s + 1); scrollTop() }
  function goPrev() { setStep(s => s - 1); scrollTop() }

  function canNext() {
    if (step === 1) return form.title.length >= 5 && form.accroche.length >= 20 && form.sector && form.stage && form.city
    if (step === 2) return form.description.length >= 100 &&  form.problem.length >= 80 && form.solution.length >= 80 && form.impact.length >= 40
    if (step === 3) return form.firstName && form.lastName && form.phone.length >= 9
    return true
  }

  async function handleSubmit() {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1800))
    setSubmitting(false)
    setSubmitted(true)
  }

  // ── Succès ──
  if (submitted) {
    return (
      <div className="text-center py-16 px-8">
        <div className="w-20 h-20 rounded-3xl bg-[#DCF763]/15 border border-[#DCF763]/30
                        flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} className="text-[#DCF763]" />
        </div>
        <h3 className="text-3xl font-black text-white mb-3">Projet soumis ! 🎉</h3>
        <p className="text-zinc-400 mb-2 text-lg">
          <span className="text-white font-semibold">{form.title}</span> est en cours de validation.
        </p>
        <p className="text-zinc-500 mb-8">
          Tu recevras un SMS de confirmation sous 48h sur le <span className="text-zinc-300">{form.phone}</span>.
        </p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm mx-auto mb-8 text-left space-y-3">
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-4">Prochaines étapes</p>
          {['Validation sous 48h par l\'équipe YouthIn', 'Ton projet apparaît dans le classement', 'Mobilise ton Village™ pour voter', 'Atteins le Top 50 pour aller en demi-finale'].map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[#DCF763] font-black text-sm mt-0.5">0{i + 1}</span>
              <span className="text-zinc-300 text-sm">{s}</span>
            </div>
          ))}
        </div>
        <Button
          className="bg-[#DCF763] text-black hover:bg-[#DCF763]/90 font-bold px-8 py-5 rounded-2xl"
          onClick={() => window.location.href = '/voter'}
        >
          Voir les projets en lice <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    )
  }

  return (
    <div ref={topRef}>
      <ProgressBar step={step} total={4} />

      {/* ── Étape 1 — Projet ── */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-black text-white mb-1">Présente ton projet</h3>
            <p className="text-zinc-500 text-sm">Les informations de base qui identifient ton projet.</p>
          </div>

          <div>
            <Label required>Nom du projet</Label>
            <Input
              value={form.title}
              onChange={set('title')}
              placeholder="Ex : AgriConnect Cameroun"
              maxLength={80}
            />
            <p className="text-xs text-zinc-600 mt-1.5">Court, mémorable, évocateur. Max 80 caractères.</p>
          </div>

          <div>
            <Label required>Accroche</Label>
            <Textarea
              value={form.accroche}
              onChange={set('accroche')}
              placeholder="Ex : Nous connectons directement les agriculteurs ruraux aux acheteurs urbains, éliminant les intermédiaires et doublant les revenus paysans."
              maxLength={200}
              rows={3}
            />
            <p className="text-xs text-zinc-600 mt-1.5">1 à 2 phrases qui donnent envie d'en savoir plus. Min 20 caractères.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label required>Secteur d'activité</Label>
              <Select
                value={form.sector}
                onChange={set('sector')}
                options={SECTORS}
                placeholder="Choisir un secteur"
              />
            </div>
            <div>
              <Label required>Stade du projet</Label>
              <Select
                value={form.stage}
                onChange={set('stage')}
                options={STAGES}
                placeholder="Où en es-tu ?"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label required>Ville principale</Label>
              <Select
                value={form.city}
                onChange={set('city')}
                options={CITIES}
                placeholder="Ta ville"
              />
            </div>
            <div>
              <Label>Taille de l'équipe</Label>
              <Select
                value={form.teamSize}
                onChange={set('teamSize')}
                options={['', 'Solo', '2 personnes', '3-5 personnes', '6-10 personnes', 'Plus de 10']}
                placeholder="Nombre de membres"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Étape 2 — Description ── */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-black text-white mb-1">Décris ton projet</h3>
            <p className="text-zinc-500 text-sm">C'est ce que le jury et la communauté liront. Sois concret et précis.</p>
          </div>

          <div>
            <Label required>Description  générale</Label>
            <Textarea
              value={form.description}
              onChange={set('description')}
              placeholder="Mon projet consiste à ..."
              maxLength={600}
              rows={5}
            />
            <div className="flex justify-between mt-1.5">
              <p className="text-xs text-zinc-600">Min 100 caractères — sois précis et factuel.</p>
              {form.description.length < 100 && form.description.length > 0 && (
                <p className="text-xs text-amber-500">Encore {100 - form.description.length} car.</p>
              )}
            </div>
          </div>

          <div>
            <Label required>Le problème que tu résous</Label>
            <Textarea
              value={form.problem}
              onChange={set('problem')}
              placeholder="Quel problème concret tu adresses ? Pour qui exactement ? Quelle est l'ampleur du problème au Cameroun ? Des chiffres si possible."
              maxLength={600}
              rows={5}
            />
            <div className="flex justify-between mt-1.5">
              <p className="text-xs text-zinc-600">Min 80 caractères — sois précis et factuel.</p>
              {form.problem.length < 80 && form.problem.length > 0 && (
                <p className="text-xs text-amber-500">Encore {80 - form.problem.length} car.</p>
              )}
            </div>
          </div>
          <div>
            <Label required>Ta solution</Label>
            <Textarea
              value={form.solution}
              onChange={set('solution')}
              placeholder="Comment tu résous ce problème ? Qu'est-ce qui rend ta solution unique ? Pourquoi maintenant ? Pourquoi toi ?"
              maxLength={600}
              rows={5}
            />
            <div className="flex justify-between mt-1.5">
              <p className="text-xs text-zinc-600">Min 80 caractères — explique ce qui te différencie.</p>
              {form.solution.length < 80 && form.solution.length > 0 && (
                <p className="text-xs text-amber-500">Encore {80 - form.solution.length} car.</p>
              )}
            </div>
          </div>

          <div>
            <Label required>Impact & résultats obtenus</Label>
            <Textarea
              value={form.impact}
              onChange={set('impact')}
              placeholder="Quel impact concret dans 1 an ? Dans 3 ans ? Combien de personnes, d'emplois, de revenus ? Pense local et mesurable."
              maxLength={400}
              rows={4}
            />
            <p className="text-xs text-zinc-600 mt-1.5">Des chiffres concrets valent mieux que des généralités.</p>
          </div>
        </div>
      )}

      {/* ── Étape 3 — Porteur ── */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-black text-white mb-1">Tes informations</h3>
            <p className="text-zinc-500 text-sm">Pour te contacter et valider ton identité YouthIn.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label required>Prénom</Label>
              <Input value={form.firstName} onChange={set('firstName')} placeholder="Ton prénom" />
            </div>
            <div>
              <Label required>Nom</Label>
              <Input value={form.lastName} onChange={set('lastName')} placeholder="Ton nom de famille" />
            </div>
          </div>

          <div>
            <Label required>Numéro de téléphone</Label>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 flex-shrink-0">
                <span className="text-lg">🇨🇲</span>
                <span className="text-zinc-400 text-sm font-medium">+237</span>
              </div>
              <Input
                value={form.phone}
                onChange={set('phone')}
                placeholder="6XX XXX XXX"
                type="tel"
                maxLength={9}
              />
            </div>
            <p className="text-xs text-zinc-600 mt-1.5">Un SMS de confirmation sera envoyé à ce numéro.</p>
          </div>

          <div>
            <Label>Email (optionnel)</Label>
            <Input
              value={form.email}
              onChange={set('email')}
              placeholder="ton@email.com"
              type="email"
            />
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <AlertCircle size={16} className="text-[#DCF763] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-zinc-300 font-medium mb-1">Compte YouthIn requis</p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Tu dois avoir un compte YouthIn avec numéro vérifié pour soumettre.
                  Ton YouthIn Index™ sera crédité de <span className="text-[#DCF763]">+20 pts</span> dès validation du dossier.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Étape 4 — Médias ── */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-black text-white mb-1">Médias du projet</h3>
            <p className="text-zinc-500 text-sm">Une image et une vidéo augmentent considérablement tes chances de votes.</p>
          </div>

          {/* Upload image */}
          <div>
            <Label>Photo principale du projet</Label>
            <div
              className={`
                border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors
                ${form.coverFile
                  ? 'border-[#DCF763]/40 bg-[#DCF763]/5'
                  : 'border-zinc-700 hover:border-zinc-600 bg-zinc-900/50'
                }
              `}
              onClick={() => fileRef.current?.click()}
            >
              {form.coverFile ? (
                <div className="flex items-center justify-center gap-3">
                  <ImageIcon size={20} className="text-[#DCF763]" />
                  <span className="text-[#DCF763] font-semibold text-sm">{form.coverFile.name}</span>
                  <button
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                    onClick={e => { e.stopPropagation(); set('coverFile')(null) }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload size={28} className="text-zinc-600 mx-auto mb-3" />
                  <p className="text-zinc-400 text-sm font-medium">Clique pour uploader une photo</p>
                  <p className="text-zinc-600 text-xs mt-1">JPG, PNG — max 5 Mo. Ratio 16:9 recommandé.</p>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={e => set('coverFile')(e.target.files?.[0] ?? null)}
            />
          </div>

          {/* URL vidéo */}
          <div>
            <Label>Lien vidéo de présentation</Label>
            <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3">
              <Video size={16} className="text-zinc-500 flex-shrink-0" />
              <input
                type="url"
                value={form.videoUrl}
                onChange={e => set('videoUrl')(e.target.value)}
                placeholder="https://youtube.com/... ou https://youtu.be/..."
                className="flex-1 bg-transparent text-white placeholder-zinc-600 text-sm focus:outline-none"
              />
            </div>
            <p className="text-xs text-zinc-600 mt-1.5">YouTube ou Google Drive. Max 3 min recommandé. Optionnel mais fortement conseillé.</p>
          </div>

          {/* Récap */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-3">
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-4">Récapitulatif</p>
            {[
              { label: 'Projet', value: form.title },
              { label: 'Secteur', value: form.sector },
              { label: 'Ville', value: form.city },
              { label: 'Porteur', value: `${form.firstName} ${form.lastName}` },
              { label: 'Téléphone', value: `+237 ${form.phone}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-zinc-500">{label}</span>
                <span className="text-zinc-200 font-medium truncate max-w-[60%] text-right">{value || '—'}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-zinc-800 flex justify-between text-sm">
              <span className="text-zinc-500">Frais de soumission</span>
              <span className="text-[#DCF763] font-bold">Gratuit</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Navigation ── */}
      <div className="flex gap-4 mt-8 pt-6 border-t border-zinc-800">
        {step > 1 && (
          <button
            onClick={goPrev}
            className="px-6 py-3 rounded-2xl border border-zinc-700 text-zinc-400
                       hover:border-zinc-600 hover:text-zinc-200 font-semibold text-sm transition-colors"
          >
            ← Retour
          </button>
        )}
        {step < 4 ? (
          <button
            onClick={goNext}
            disabled={!canNext()}
            className={`
              flex-1 py-4 rounded-2xl font-bold text-sm transition-all duration-200
              ${canNext()
                ? 'bg-[#DCF763] text-black hover:bg-[#DCF763]/90 hover:scale-[1.01]'
                : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              }
            `}
          >
            Continuer →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 py-4 rounded-2xl bg-[#DCF763] text-black font-bold text-sm
                       hover:bg-[#DCF763]/90 disabled:opacity-60 disabled:cursor-not-allowed
                       transition-all flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Soumission en cours...
              </>
            ) : (
              <>
                Soumettre mon projet
                <ArrowRight size={16} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

// ── FAQ accordion ──────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`
        border rounded-2xl overflow-hidden transition-colors cursor-pointer
        ${open ? 'border-zinc-700 bg-zinc-900/80' : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'}
      `}
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between p-5 gap-4">
        <p className="font-semibold text-zinc-200 text-sm leading-relaxed">{q}</p>
        <div className={`flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown size={16} className="text-zinc-500" />
        </div>
      </div>
      {open && (
        <div className="px-5 pb-5">
          <div className="h-px bg-zinc-800 mb-4" />
          <p className="text-zinc-400 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

// ── PAGE PRINCIPALE ────────────────────────────────────────
export default function SubmitProjectPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Header />

      <main className="pt-28 pb-24">

        {/* ══ HERO ══ */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20 relative overflow-hidden">
          {/* Fond */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]
                            bg-[#DCF763]/[0.04] rounded-full blur-[100px]" />
          </div>

          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#DCF763]/10 border border-[#DCF763]/20
                            rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#DCF763] animate-pulse" />
              <span className="text-[#DCF763] text-sm font-bold uppercase tracking-widest">
                Soumission gratuite · Concours YouthIn 2026
              </span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-[0.92] mb-6 tracking-tight">
              Ton projet peut{' '}
              <span className="text-[#DCF763]">changer</span>{' '}
              le Cameroun.
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
              Rejoins les 847 entrepreneurs déjà inscrits. Soumets ton projet,
              mobilise ta communauté, et gagne jusqu'à 2 000 000 FCFA.
            </p>

            {/* Avantages */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {BENEFITS.map(({ icon: Icon, title, desc }) => (
                <div key={title}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 text-left
                             hover:border-zinc-700 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#DCF763]/10 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#DCF763]" />
                  </div>
                  <p className="font-bold text-white text-sm mb-1">{title}</p>
                  <p className="text-zinc-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CORPS ══ */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_420px] gap-10 items-start">

            {/* ── Formulaire ── */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 lg:p-10">
              <ProjectForm />
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6">

              {/* Étapes */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
                <p className="text-xs text-[#DCF763] font-bold uppercase tracking-widest mb-6">
                  Comment ça marche
                </p>
                <div className="space-y-5">
                  {STEPS_INFO.map((s, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center
                                      flex-shrink-0 font-black text-xs text-[#DCF763]">
                        {s.num}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm mb-0.5">{s.title}</p>
                        <p className="text-zinc-500 text-xs leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Règles clés */}
              <div className="bg-[#DCF763]/5 border border-[#DCF763]/20 rounded-3xl p-8">
                <p className="text-xs text-[#DCF763] font-bold uppercase tracking-widest mb-5">
                  Conditions de participation
                </p>
                <ul className="space-y-3">
                  {[
                    '18 à 28 ans au 1er janvier 2026',
                    'Nationalité camerounaise ou résidence légale et être disponible',
                    '1 seul projet par participant',
                    'Etre disponible pour assister aux formations',
                    'Le projet doit répondre à un besoin réel au Cameroun',
                    'Dossier complet obligatoire',
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-[#DCF763] mt-0.5 flex-shrink-0">✦</span>
                      <span className="text-zinc-300">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Index boost */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-5">
                  Impact sur ton YouthIn Index™
                </p>
                <div className="space-y-3">
                  {[
                    { label: 'Projet soumis & validé', pts: '+20 pts' },
                    { label: 'Top 50 du classement', pts: '+40 pts' },
                    { label: 'Sélection demi-finale', pts: '+130 pts' },
                    { label: 'Sélection finale', pts: '+180 pts' },
                    { label: 'Victoire du concours', pts: '+300 pts' },
                  ].map(({ label, pts }) => (
                    <div key={label} className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400">{label}</span>
                      <span className="text-[#DCF763] font-bold">{pts}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="px-4 sm:px-6 lg:px-8 mt-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#DCF763] text-sm font-bold uppercase tracking-widest mb-3">Questions fréquentes</p>
              <h2 className="text-4xl font-black text-white">Tu as des questions ?</h2>
            </div>
            <div className="space-y-3">
              {FAQ.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}