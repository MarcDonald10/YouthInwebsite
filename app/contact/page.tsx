'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react'

export default function ContactPage() {
  const contacts = [
    {
      icon: Mail,
      title: 'Support Client',
      description: 'Pour des questions sur ton compte ou la plateforme',
      value: 'support@youthin.cm',
      action: 'Envoyer un email'
    },
    {
      icon: Mail,
      title: 'Partenariats',
      description: 'Intéressé par un partenariat avec YouthIn ?',
      value: 'partners@youthin.cm',
      action: 'Contacter'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      description: 'Notre siège social',
      value: 'Douala, Cameroun',
      action: 'Voir la localisation'
    },
    {
      icon: MessageSquare,
      title: 'Chat Support',
      description: 'Support en direct disponible 24/7 sur l\'app',
      value: 'YouthIn Community',
      action: 'Ouvrir le chat'
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          Nous sommes là pour t&apos;aider.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Des questions ? Des suggestions ? Une opportunité de partenariat ? Contacte-nous. On répond rapidement.
        </p>
      </section>

      {/* Contact Options */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map((contact, idx) => {
            const Icon = contact.icon
            return (
              <div key={idx} className="bg-card border border-border rounded-2xl p-8 hover:border-accent transition">
                <Icon className="text-accent mb-4" size={32} />
                <h3 className="text-lg font-semibold text-foreground mb-2">{contact.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{contact.description}</p>
                <p className="text-accent font-semibold mb-4">{contact.value}</p>
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 text-sm">
                  {contact.action}
                </Button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto bg-card border-y border-border">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Envoie-nous un message</h2>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Prénom & Nom</label>
              <input
                type="text"
                placeholder="Ton nom"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                placeholder="ton.email@example.com"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Sujet</label>
            <input
              type="text"
              placeholder="Quel est ton sujet ?"
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Message</label>
            <textarea
              placeholder="Raconte-nous..."
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent resize-none"
            />
          </div>

          <Button className="w-full bg-accent text-primary-foreground hover:bg-accent/90 py-3 text-lg">
            Envoyer le message
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Nous répondons à tous les messages en moins de 24 heures.
          </p>
        </form>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-8">Besoin d&apos;aide rapide ?</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: '❓', title: 'FAQ', desc: 'Trouvez les réponses aux questions courantes' },
            { icon: '📖', title: 'Guide d\'Utilisation', desc: 'Apprenez à utiliser YouthIn étape par étape' },
            { icon: '🎓', title: 'Tutoriels', desc: 'Regardez nos vidéos explicatives' }
          ].map((item, idx) => (
            <button key={idx} className="p-6 border border-border rounded-2xl hover:border-accent transition group">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-foreground group-hover:text-accent transition mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </button>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
