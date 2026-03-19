import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tontine Smart — Épargne Communautaire Mobile Money Cameroun',
  description: 'Tontine Smart : l\'épargne communautaire numérique. Crée ou rejoins un groupe, cotise via Mobile Money MTN ou Orange. Transparent, sécurisé, 0% de frais. Pour les entrepreneurs camerounais.',
  keywords: 'tontine cameroun, épargne mobile money, tontine smart, épargne communautaire, mobile money mtm orange',
}

export default function TontineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
