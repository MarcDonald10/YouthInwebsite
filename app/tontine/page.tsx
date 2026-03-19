'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function TontinePage() {
  const steps = [
    {
      number: 1,
      title: 'Crée ou rejoins un groupe',
      icon: '👥',
      description: 'Invite jusqu\'à 20 membres. Définis le montant de cotisation, la fréquence (hebdomadaire ou mensuelle) et la durée du cycle.'
    },
    {
      number: 2,
      title: 'Cotise via Mobile Money',
      icon: '💳',
      description: 'MTN Mobile Money ou Orange Money. Chaque cotisation est enregistrée instantanément. Tout le groupe voit qui a payé en temps réel.'
    },
    {
      number: 3,
      title: 'Reçois ta mise',
      icon: '💰',
      description: 'L\'ordre de passage est défini ensemble ou tiré au sort. Quand c\'est ton tour, la totalité de la caisse tombe directement dans ton Mobile Money.'
    },
    {
      number: 4,
      title: 'Suis tout en temps réel',
      icon: '📊',
      description: 'Tableau de bord complet : historique des cotisations, statut de chaque membre (À jour / En retard / En attente), progression du cycle, et chat de groupe intégré.'
    }
  ]

  const benefits = [
    'Aucune banque requise — juste un téléphone et Mobile Money',
    'Transparence totale — tout le groupe voit tout, en temps réel',
    'Rappels automatiques avant chaque échéance de cotisation',
    'Chat de groupe intégré pour coordonner et garder la cohésion',
    'Historique complet et exportable',
    '0% de frais cachés — YouthIn ne prend aucune commission sur les fonds'
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <Badge className="bg-accent/20 text-accent hover:bg-accent/30 px-4 py-2">
            💰 TONTINE SMART — ÉPARGNE COMMUNAUTAIRE
          </Badge>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          La solidarité financière de tes ancêtres, version numérique.
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Crée ou rejoins un groupe d&apos;épargne entre entrepreneurs. Cotise via Mobile Money. Reçois ta mise en temps voulu. 100% transparent, 0% banque.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Button className="bg-accent text-primary-foreground hover:bg-accent/90 px-8 py-6 text-lg">
            Créer mon groupe Tontine
          </Button>
          <Link href="#" className="text-accent hover:text-accent/80 font-semibold flex items-center gap-2">
            Déjà membre ? Accès à mon groupe <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Les 4 Étapes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Comment ça marche — 4 Étapes</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-3 w-6 h-0.5 bg-accent/30"></div>
              )}
              <div className="bg-card border border-border rounded-2xl p-8 h-full">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Étape {step.number}</h3>
                <p className="text-base font-semibold text-foreground mb-3">{step.title}</p>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pourquoi Tontine Smart */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12">Pourquoi Tontine Smart</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="text-accent text-2xl flex-shrink-0 mt-1">✓</div>
              <p className="text-foreground text-lg">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Chiffres Clés</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">850+</div>
              <div className="text-muted-foreground">Groupes actifs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">6 400</div>
              <div className="text-muted-foreground">Membres</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">125M</div>
              <div className="text-muted-foreground">FCFA collectés ce mois</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">0</div>
              <div className="text-muted-foreground">Litiges non résolus</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-foreground mb-8">Prêt(e) à épargner en communauté ?</h2>
        <Button className="bg-accent text-primary-foreground hover:bg-accent/90 px-8 py-6 text-lg">
          Commencer maintenant
        </Button>
      </section>

      <Footer />
    </main>
  )
}
