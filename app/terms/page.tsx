import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <article className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-foreground mb-4">Conditions Générales d'Utilisation</h1>
        <p className="text-muted-foreground mb-12">Dernière mise à jour : March 2026</p>

        <div className="space-y-8 prose prose-invert max-w-none">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">1. Acceptation des conditions</h2>
            <p className="text-muted-foreground">
              En accédant et en utilisant YouthIn Cameroun (la « Plateforme »), tu acceptes d'être lié par ces Conditions Générales d'Utilisation. Si tu n'acceptes pas ces conditions, tu n'es pas autorisé à utiliser la plateforme.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">2. Admissibilité</h2>
            <p className="text-muted-foreground">
              Pour utiliser YouthIn, tu dois :
            </p>
            <ul className="space-y-2 text-muted-foreground mt-4">
              <li>• Avoir au minimum 18 ans</li>
              <li>• Être de nationalité camerounaise ou résider légalement au Cameroun</li>
              <li>• Avoir un numéro de téléphone valide pour vérification OTP</li>
              <li>• Ne pas être banni de la plateforme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">3. Compte & Authentification</h2>
            <p className="text-muted-foreground">
              Tu es responsable de :
            </p>
            <ul className="space-y-2 text-muted-foreground mt-4">
              <li>• Garder confidentiel ton code OTP SMS</li>
              <li>• Fournir des informations exactes et à jour</li>
              <li>• Toutes les activités sur ton compte</li>
              <li>• Notifier YouthIn de tout accès non autorisé</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">4. Concours Entrepreneurial</h2>
            <p className="text-muted-foreground mb-4">Règles du concours :</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• 1 projet par participant</li>
              <li>• Projet original — pas de triche (disqualification définitive)</li>
              <li>• Les votes sont non-remboursables</li>
              <li>• Dossier complet obligatoire</li>
              <li>• Respect du calendrier (phases strictes)</li>
              <li>• Prix accordés selon les critères du jury</li>
            </ul>
          </section>

         
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">5. Mentor Market</h2>
            <p className="text-muted-foreground">
              Pour les sessions mentorat :
            </p>
            <ul className="space-y-2 text-muted-foreground mt-4">
              <li>• Les mentors fixent leurs propres tarifs</li>
              <li>• Les sessions sont confidentielles</li>
              <li>• Aucune garantie de résultat</li>
              <li>• Les avis doivent être honnêtes et constructifs</li>
              <li>• Les annulations doivent être faites 24h avant</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">6. Contenu & Comportement</h2>
            <p className="text-muted-foreground">
              Tu ne dois pas :
            </p>
            <ul className="space-y-2 text-muted-foreground mt-4">
              <li>• Poster du contenu illégal, haineux ou offensant</li>
              <li>• Harceler ou menacer d'autres utilisateurs</li>
              <li>• Spammer ou inonder la plateforme</li>
              <li>• Tenter de hacker ou de contourner la sécurité</li>
              <li>• Voler la propriété intellectuelle d'autrui</li>
              <li>• Usurper l'identité d'une autre personne</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">7. Propriété Intellectuelle</h2>
            <p className="text-muted-foreground">
              Tout contenu sur YouthIn (design, logo, fonctionnalités) est la propriété de YouthIn Cameroun. Tu peux utiliser ton propre contenu (projets, posts) à titre personnel, mais tu acceptes que YouthIn puisse le partager avec la communauté.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">9. Limitation de Responsabilité</h2>
            <p className="text-muted-foreground">
              YouthIn fournit la plateforme « telle quelle ». Nous ne sommes pas responsables de :
            </p>
            <ul className="space-y-2 text-muted-foreground mt-4">
              <li>• Pertes financières découlant de ta participation</li>
              <li>• Litiges avec d'autres utilisateurs ou mentors</li>
              <li>• Données perdues en cas de défaillance technique</li>
              <li>• Interruptions ou erreurs de service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">10. Résiliation</h2>
            <p className="text-muted-foreground">
              YouthIn se réserve le droit de suspendre ou de supprimer ton compte si tu violes ces conditions. Tu peux supprimer ton compte à tout moment en contactant support@youthin.cm.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">11. Modifications des conditions</h2>
            <p className="text-muted-foreground">
              Nous pouvons mettre à jour ces conditions. Les modifications importantes seront annoncées. La continuation de l'utilisation signifie ton acceptation.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">12. Loi applicable</h2>
            <p className="text-muted-foreground">
              Ces conditions sont régies par les lois de la République du Cameroun. Tout litige sera résolu selon la loi camerounaise.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">13. Contact</h2>
            <p className="text-muted-foreground">
              Pour les questions sur ces conditions :
            </p>
            <ul className="space-y-2 text-muted-foreground mt-4">
              <li>📧 support@youthin.cm</li>
              <li>📍 Douala, Cameroun</li>
            </ul>
          </section>

          <section className="bg-card border border-border rounded-2xl p-8 mt-12">
            <p className="text-sm text-muted-foreground">
              © 2026 YouthIn Cameroun. Tous droits réservés. Merci de respecter ces conditions et de faire partie de notre communauté responsable.
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  )
}
