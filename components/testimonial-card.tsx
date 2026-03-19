import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image: string
  rating: number
  highlight?: string
}

export function TestimonialCard({
  quote,
  author,
  role,
  image,
  rating,
  highlight,
}: TestimonialCardProps) {
  return (
    <div className="glass p-6 rounded-2xl hover-lift relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10 space-y-4">
        {/* Quote Icon */}
        <Quote size={24} className="text-accent/50" />

        {/* Rating */}
        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className="fill-accent text-accent"
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-foreground leading-relaxed">
          {highlight ? (
            <>
              {quote.substring(0, quote.indexOf(highlight))}
              <span className="text-accent font-semibold">
                {highlight}
              </span>
              {quote.substring(quote.indexOf(highlight) + highlight.length)}
            </>
          ) : (
            quote
          )}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={image}
              alt={author}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">
              {author}
            </p>
            <p className="text-muted-foreground text-xs">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
