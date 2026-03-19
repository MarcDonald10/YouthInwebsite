import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentor Market — +200 Mentors Vérifiés au Cameroun',
  description: '+200 mentors vérifiés en Finance, Tech, Marketing, BTP, Santé et plus. Sessions 1-to-1, 45-60 min, payées en Mobile Money. À partir de 10 000 FCFA. Apprends des meilleurs entrepreneurs.',
  keywords: 'mentor cameroun, business coaching cameroun, mentoring startup, expertise entrepreneuriale',
}

export default function MentorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
