import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <article className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-foreground mb-4">Politique de Confidentialité</h1>
        <p className="text-muted-foreground mb-12">Dernière mise à jour : March 2026</p>

        <div className="space-y-8 prose prose-invert max-w-none">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground">
              YouthIn Cameroun (« nous », « notre » ou « YouthIn ») s'engage à protéger ta vie privée. Cette Politique de Confidentialité explique nos pratiques en matière de collecte, d'utilisation et de protection de tes informations personnelles.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">2. Informations que nous collectons</h2>
            <p className="text-muted-foreground mb-4">Nous collectons les informations suivantes :</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Informations de compte : nom, email, numéro de téléphone, OTP SMS</li>
              <li>• Informations de profil : photos, bio, secteur d'activité</li>
              <li>• Données d'activité : votes, participations, interactions communautaires</li>
              <li>• Informations de paiement : transactions Mobile Money (nous ne stockons pas les détails)</li>
              <li>• Données de localisation : ville/quartier (optionnel)</li>
              <li>• Données techniques : adresse IP, type d'appareil, navigateur</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">3. Comment nous utilisons tes informations</h2>
            <p className="text-muted-foreground mb-4">Nous utilisons tes informations pour :</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Créer et gérer ton compte YouthIn</li>
              <li>• Traiter tes participations au concours et votes</li>
              <li>• Calculer ton YouthIn Index</li>
              <li>• Te connecter avec la communauté</li>
              <li>• T'envoyer des mises à jour et notifications</li>
              <li>• Améliorer la plateforme</li>
              <li>• Respecter la loi camerounaise</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">4. Partage de tes données</h2>
            <p className="text-muted-foreground">
              Nous ne vendons jamais tes données personnelles. Nous pouvons partager :
            </p>
            <ul className="space-y-2 text-muted-foreground mt-4">
              <li>• Informations publiques (profil, participations publiques) avec la communauté</li>
              <li>• Données avec nos partenaires de paiement Mobile Money (MTN, Orange)</li>
              <li>• Données si légalement requis par les autorités camerounaises</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">5. Sécurité des données</h2>
            <p className="text-muted-foreground">
              Nous mettons en œuvre des mesures de sécurité strictes :
            </p>
            <ul className="space-y-2 text-muted-foreground mt-4">
              <li>• Authentification OTP par SMS (pas de mots de passe faibles)</li>
              <li>• Stockage chiffré des données sensibles</li>
              <li>• Serveurs sécurisés conformes à la loi camerounaise</li>
              <li>• Accès restreint à tes données au sein de l'équipe YouthIn</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">6. Tes droits</h2>
            <p className="text-muted-foreground">
              Tu as le droit de :
            </p>
            <ul className="space-y-2 text-muted-foreground mt-4">
              <li>• Accéder à tes données personnelles</li>
              <li>• Corriger les informations inexactes</li>
              <li>• Demander la suppression de ton compte et tes données</li>
              <li>• Télécharger une copie de tes données</li>
              <li>• Retirer ton consentement à tout moment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">7. Cookies</h2>
            <p className="text-muted-foreground">
              Nous utilisons des cookies essentiels pour maintenir ton authentification et améliorer ton expérience. Tu peux contrôler les cookies dans tes paramètres de navigateur.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">8. Politique enfants</h2>
            <p className="text-muted-foreground">
              YouthIn est réservé aux 18 ans et plus. Nous ne collectons intentionnellement pas de données de mineurs. Si tu découvres que un mineur a fourni des informations, contacte-nous à support@youthin.cm.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">9. Modifications de cette politique</h2>
            <p className="text-muted-foreground">
              Nous pouvons mettre à jour cette politique de temps en temps. Les changements significatifs seront annoncés sur la plateforme. Ta utilisation continue de YouthIn après les modifications signifie ton acceptation des nouveaux termes.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">10. Contact</h2>
            <p className="text-muted-foreground">
              Pour les questions sur cette Politique de Confidentialité ou tes données personnelles, contacte-nous :
            </p>
            <ul className="space-y-2 text-muted-foreground mt-4">
              <li>📧 support@youthin.cm</li>
              <li>📍 Douala, Cameroun</li>
            </ul>
          </section>

          <section className="bg-card border border-border rounded-2xl p-8 mt-12">
            <p className="text-sm text-muted-foreground">
              © 2026 YouthIn Cameroun. Tous droits réservés. Nous respectons ta vie privée et ta confiance.
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  )
}
