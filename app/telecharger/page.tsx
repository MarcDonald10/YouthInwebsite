'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'

export default function TelechargerPage() {
  const features = [
    'Profil entrepreneurial public (youthin.cm/@tonpseudo)',
    'Accès au fil d\'actualité et aux Villages',
    'Participation au concours (soumission de projet + vote)',
    'Création ou adhésion à un groupe',
    'Accès au Mentor Market',
    'YouthIn Index — ton score de crédibilité entrepreneuriale',
    '14 badges à débloquer + streak quotidien',
    'Code parrain — gagne des points en invitant tes amis'
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-center">
          YouthIn dans ta poche.
        </h1>
        <p className="text-2xl text-muted-foreground text-center mb-4">
          Gratuit. Rapide. Fait pour le Cameroun.
        </p>
        <p className="text-lg text-muted-foreground text-center mb-8">
          Android 8.0+ · iOS 13+ · Fonctionne en 2G/3G/4G
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button className="bg-accent text-primary-foreground hover:bg-accent/90 px-8 py-6 text-lg">
            Télécharger sur Google Play
          </Button>
          <Button className="bg-accent text-primary-foreground hover:bg-accent/90 px-8 py-6 text-lg">
            Télécharger sur App Store
          </Button>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">Ou scanne le code QR</p>
          <div className="w-32 h-32 bg-white rounded-lg mx-auto p-2">
            <div className="w-full h-full bg-gradient-to-br from-accent to-accent/50 rounded flex items-center justify-center">
              <span className="text-4xl">📱</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que tu obtiens */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-y border-border bg-card">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Ce que tu obtiens gratuitement</h2>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="text-accent text-2xl flex-shrink-0">✓</div>
              <p className="text-foreground text-lg">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fonctionnement Technique */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Pourquoi tu vas l\'adorer</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Ultra-rapide</h3>
            <p className="text-muted-foreground">Application React Native optimisée pour les connexions 2G/3G au Cameroun</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Sécurisée</h3>
            <p className="text-muted-foreground">Authentification OTP par SMS — aucun mot de passe à retenir. Conformité loi camerounaise</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Mobile Money intégré</h3>
            <p className="text-muted-foreground">Paiement direct avec MTN Mobile Money & Orange Money Cameroun</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Notifications en temps réel</h3>
            <p className="text-muted-foreground">Ne manque jamais une opportunité. Sois averti(e) dès qu\'il se passe quelque chose</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Questions Fréquentes</h2>

        <div className="space-y-6">
          {[
            {
              q: 'Est-ce vraiment gratuit ?',
              a: 'Oui, 100% gratuit pour accéder à la plateforme. Les paiements Mobile Money sont uniquement pour les services optionnels (mentor sessions).'
            },
            {
              q: 'J\'ai besoin d\'une banque ?',
              a: 'Non ! Juste un téléphone avec Mobile Money (MTN ou Orange). C\'est pensé spécifiquement pour les jeunes entrepreneurs camerounais sans accès bancaire.'
            },
            {
              q: 'Ça fonctionne hors ligne ?',
              a: 'Partiellement. Tu peux consulter du contenu en cache, mais les actions (vote, paiement) nécessitent une connexion internet.'
            },
            {
              q: 'Mes données sont-elles sécurisées ?',
              a: 'Absolument. Conformité totale avec la loi camerounaise sur la protection des données. Stockage sécurisé et authentification OTP.'
            },
            {
              q: 'Puis-je utiliser depuis mon ordinateur ?',
              a: 'En ce moment, YouthIn est app-first pour mobile. Mais le site web (youthin.cm) offre accès à la communauté et aux concours.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-card border border-border rounded-2xl p-8 hover:border-accent transition">
              <h3 className="text-lg font-semibold text-foreground mb-3">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center bg-card border-y border-border">
        <h2 className="text-4xl font-bold text-foreground mb-8">Prêt à rejoindre 12 000+ entrepreneurs ?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Commence ton aventure entrepreneuriale dès maintenant. C\'est gratuit.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-accent text-primary-foreground hover:bg-accent/90 px-8 py-6 text-lg">
            Télécharger sur Google Play
          </Button>
          <Button className="bg-accent text-primary-foreground hover:bg-accent/90 px-8 py-6 text-lg">
            Télécharger sur App Store
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
