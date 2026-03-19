import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Concours YouthIn 2026 — Le plus grand concours entrepreneurial du Cameroun',
  description: 'Soumets ton projet au concours YouthIn 2026. La communauté vote. Gagne cash, mentorat et visibilité nationale. 4 phases, du 1er février au 30 avril 2026.',
  keywords: 'concours entrepreneurial Cameroun, concours startup Cameroun, prix entrepreneuriat, concours 2026',
}

export default function ConcoursLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
