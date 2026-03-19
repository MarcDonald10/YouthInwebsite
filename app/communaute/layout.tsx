import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Communauté YouthIn — Villages Entrepreneurs Cameroun',
  description: 'Rejoins la communauté YouthIn. 12 847 entrepreneurs camerounais dans des Villages (national, ville, quartier, secteur). Partage, apprends, connecte-toi. Réseau social entrepreneurial.',
  keywords: 'communauté entrepreneurs cameroun, réseau entrepreneurs, villages startups, communauté entrepreneuriale',
}

export default function CommunauteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
