import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Télécharger YouthIn App — iOS & Android Cameroun',
  description: 'Télécharge l\'app YouthIn gratuitement sur iOS et Android. Fonctionne en 2G/3G/4G. Accès complet à tous les services : concours, mentors, communauté. 12 847 entrepreneurs t\'attendent.',
  keywords: 'télécharger youthin app, app store google play cameroun, youthin ios android',
}

export default function TelechargerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
