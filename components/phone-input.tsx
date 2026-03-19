'use client'

import { forwardRef, InputHTMLAttributes } from 'react'
import { Phone } from 'lucide-react'

interface PhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  hint?: string
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ error, hint, className, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/\D/g, '')

      // Format: +237 XXX XXX XXX
      if (value.length > 0) {
        if (!value.startsWith('237') && !value.startsWith('237')) {
          if (value.length <= 9) {
            value = '237' + value
          }
        }
      }

      if (value.length >= 3 && !value.startsWith('+')) {
        value = '+' + value
      }

      e.target.value = value
      props.onChange?.(e)
    }

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Phone Number *
        </label>
        <div className="relative">
          <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            ref={ref}
            type="tel"
            placeholder="+237 6XX XXX XXX"
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all ${
              error ? 'border-destructive focus:ring-destructive' : ''
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-destructive flex items-center gap-1">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-muted-foreground">{hint}</p>
        )}
      </div>
    )
  }
)

PhoneInput.displayName = 'PhoneInput'
