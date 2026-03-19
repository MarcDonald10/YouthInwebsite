'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

interface PaymentMethodSelectorProps {
  value: 'mtn' | 'orange' | ''
  onChange: (method: 'mtn' | 'orange') => void
}

export function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-foreground">
        Payment Method
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* MTN Option */}
        <button
          onClick={() => onChange('mtn')}
          className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
            value === 'mtn'
              ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20'
              : 'border-border hover:border-accent/50 bg-card'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-start gap-2">
              <div className="w-12 h-8 bg-yellow-400 rounded-md flex items-center justify-center font-bold text-sm text-black">
                MTN
              </div>
              <span className="text-sm font-medium text-foreground">
                MTN Mobile Money
              </span>
              <span className="text-xs text-muted-foreground">
                Fast & Secure
              </span>
            </div>
            {value === 'mtn' && (
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Check size={16} className="text-primary-foreground" />
              </div>
            )}
          </div>
        </button>

        {/* Orange Option */}
        <button
          onClick={() => onChange('orange')}
          className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
            value === 'orange'
              ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20'
              : 'border-border hover:border-accent/50 bg-card'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-start gap-2">
              <div className="w-12 h-8 bg-orange-500 rounded-md flex items-center justify-center font-bold text-sm text-white">
                O+
              </div>
              <span className="text-sm font-medium text-foreground">
                Orange Money
              </span>
              <span className="text-xs text-muted-foreground">
                Easy & Reliable
              </span>
            </div>
            {value === 'orange' && (
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Check size={16} className="text-primary-foreground" />
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}
