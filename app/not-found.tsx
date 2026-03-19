import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-9xl font-bold text-accent mb-4 animate-bounce">404</div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Oups ! Page introuvable</h1>
        <p className="text-lg text-muted-foreground mb-8">
          La page que tu cherches n&apos;existe pas ou a été déplacée. Retourne à l&apos;accueil pour continuer ton aventure entrepreneuriale.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-accent text-primary-foreground hover:bg-accent/90 px-8 py-6 text-lg w-full sm:w-auto">
              <ArrowLeft size={20} className="mr-2" />
              Retourner à l&apos;accueil
            </Button>
          </Link>
          <Link href="/communaute">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 px-8 py-6 text-lg w-full sm:w-auto">
              Rejoindre la communauté
            </Button>
          </Link>
        </div>

        <div className="mt-12 space-y-3">
          <p className="text-sm text-muted-foreground">Liens utiles :</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['/', '/concours', '/mentors', '/communaute', '/apropos'].map((href, idx) => (
              <Link key={idx} href={href} className="text-accent hover:text-accent/80 text-sm underline">
                {['Accueil', 'Concours', 'Mentors', 'Communauté', 'À propos'][idx]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
