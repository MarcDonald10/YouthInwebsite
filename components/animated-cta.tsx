import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface AnimatedCTAProps {
  title: string
  description: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  variant?: 'accent' | 'dark' | 'gradient'
}

export function AnimatedCTA({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  variant = 'accent',
}: AnimatedCTAProps) {
  const bgClass = {
    accent:
      'glass border border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5',
    dark: 'glass border border-border',
    gradient:
      'bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/20',
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-8 md:p-12 ${bgClass[variant]}`}
    >
      {/* Animated background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-30 animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '-2s' }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          {title}
        </h2>

        <p className="text-lg text-muted-foreground mb-8 max-w-xl">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={primaryCTA.href}>
            <button className="px-8 py-4 bg-accent text-primary-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all hover-lift flex items-center gap-2">
              {primaryCTA.text}
              <ArrowRight size={18} />
            </button>
          </Link>

          {secondaryCTA && (
            <Link href={secondaryCTA.href}>
              <button className="px-8 py-4 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-all flex items-center gap-2">
                {secondaryCTA.text}
                <ArrowRight size={18} />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
