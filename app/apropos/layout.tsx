import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À Propos de YouthIn — La Plateforme des Entrepreneurs Camerounais',
  description: 'Découvre YouthIn : mission, vision et valeurs. Comment nous résolvons 3 problèmes clés de l\'entrepreneuriat au Cameroun. Rencontre notre équipe fondatrice de Douala.',
  keywords: 'à propos youthin, mission youthin, entrepreneurs cameroun, entrepreneuriat cameroun',
}

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
