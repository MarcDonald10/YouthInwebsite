'use client'

import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AlertCircle, ArrowRight, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default function PaymentErrorPage() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'project'
  const reason = searchParams.get('reason') || 'unknown'

  const errorDetails = {
    insufficient_balance: {
      title: 'Insufficient Balance',
      message:
        "Your account doesn't have enough credit to complete this transaction.",
      icon: '💳',
      suggestions: [
        'Check your account balance',
        'Try a different payment method',
        'Contact your bank or mobile operator',
      ],
    },
    network_error: {
      title: 'Network Error',
      message: 'Unable to connect to the payment provider. Please try again.',
      icon: '🌐',
      suggestions: [
        'Check your internet connection',
        'Try again in a few moments',
        'Use a different network if available',
      ],
    },
    invalid_credentials: {
      title: 'Invalid Credentials',
      message:
        'The payment information you provided is incorrect or invalid.',
      icon: '🔑',
      suggestions: [
        'Verify your phone number format',
        'Check your PIN/password',
        'Ensure your account is active',
      ],
    },
    transaction_declined: {
      title: 'Transaction Declined',
      message: 'Your payment was declined. Please check your account status.',
      icon: '⛔',
      suggestions: [
        'Contact your payment provider',
        'Try with a different account',
        'Ensure your service is active',
      ],
    },
  }

  const config =
    errorDetails[reason as keyof typeof errorDetails] ||
    errorDetails.network_error

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-16">
        <section className="px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            {/* Error Animation */}
            <div className="text-center mb-8">
              <div className="inline-block mb-6">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 bg-gradient-to-br from-destructive/30 to-destructive/5 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AlertCircle
                      size={80}
                      className="text-destructive animate-pulse"
                    />
                  </div>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-3">
                {config.title}
              </h1>
              <p className="text-lg text-muted-foreground">{config.message}</p>
            </div>

            {/* Error Details */}
            <div className="glass p-8 rounded-2xl mb-8 border border-destructive/20 bg-destructive/5">
              <div className="flex items-start gap-4">
                <AlertCircle
                  size={24}
                  className="text-destructive flex-shrink-0 mt-0.5"
                />
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    What you can do:
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    {config.suggestions.map((suggestion, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-destructive font-bold flex-shrink-0">
                          •
                        </span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-8">
              <Link
                href={type === 'vote' ? '/voter' : '/soumettre'}
                className="block p-4 glass rounded-xl hover-lift transition-all flex items-center justify-between group border border-border"
              >
                <span className="font-semibold text-foreground">
                  Try Again
                </span>
                <ArrowRight
                  size={18}
                  className="text-accent group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                href="/"
                className="block p-4 glass rounded-xl hover-lift transition-all flex items-center justify-between group border border-border"
              >
                <span className="font-semibold text-foreground">
                  Back to Home
                </span>
                <ArrowRight
                  size={18}
                  className="text-accent group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {/* Support */}
            <div className="glass p-6 rounded-xl border border-border text-center">
              <MessageSquare size={28} className="text-accent mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">
                Need help?
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Our support team is here to assist you with any issues.
              </p>
              <a
                href="mailto:support@youthin.cm"
                className="inline-block px-6 py-2 bg-accent hover:bg-accent/90 text-primary-foreground font-semibold rounded-lg transition-all"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
