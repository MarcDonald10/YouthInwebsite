'use client'

// import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CheckCircle, Copy, Download, Share2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ConfirmationPage() {
  // const searchParams = useSearchParams()
  // const type = searchParams.get('type') || 'project'
  // const transactionId = searchParams.get('tx') || 'TXN_12345678'
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    // navigator.clipboard.writeText(transactionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const confirmationData = {
    project: {
      title: 'Project Submission Confirmed',
      icon: '📝',
      details: [
        { label: 'Type', value: 'Project Submission' },
        { label: 'Cost', value: '10,000 FCFA' },
        { label: 'Status', value: 'Payment Confirmed' },
        {
          label: 'Next Step',
          value: 'Your project will be verified within 24 hours',
        },
      ],
      actions: [
        { label: 'View Your Projects', href: '/dashboard', icon: '→' },
        { label: 'Vote for Other Projects', href: '/voter', icon: '→' },
      ],
    },
    vote: {
      title: 'Vote Recorded Successfully',
      icon: '💜',
      details: [
        { label: 'Type', value: 'Project Vote' },
        { label: 'Cost', value: '75 FCFA' },
        { label: 'Status', value: 'Vote Confirmed' },
        { label: 'Votes Remaining', value: 'You can vote for other projects' },
      ],
      actions: [
        { label: 'Vote for More Projects', href: '/voter', icon: '→' },
        { label: 'View My Dashboard', href: '/dashboard', icon: '→' },
      ],
    },
  }

  const config =  confirmationData.project

  return (
    
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-16">
        <section className="px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            {/* Success Animation */}
            <div className="text-center mb-8 animate-pop">
              <div className="inline-block mb-6">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-accent/5 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CheckCircle
                      size={80}
                      className="text-accent animate-pulse-glow"
                    />
                  </div>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-3">
                {config.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                Your transaction has been processed successfully
              </p>
            </div>

            {/* Transaction Details */}
            <div className="glass p-8 rounded-2xl mb-8 space-y-6">
              <div className="border-b border-border pb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Transaction ID
                </p>
                <div className="flex items-center justify-between gap-4 p-4 bg-card rounded-lg">
                  <code className="font-mono text-accent font-semibold">
                    {/* {transactionId} */}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-accent/20 rounded-lg transition-colors"
                    title="Copy transaction ID"
                  >
                    <Copy
                      size={18}
                      className={`${copied ? 'text-green-500' : 'text-muted-foreground'}`}
                    />
                  </button>
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-4">
                {config.details.map((detail, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{detail.label}</span>
                    <span className="font-semibold text-foreground">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-green-400 font-medium">
                  Transaction Confirmed
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-8">
              {config.actions.map((action, i) => (
                <Link
                  key={i}
                  href={action.href}
                  className="block p-4 glass rounded-xl hover-lift transition-all flex items-center justify-between group"
                >
                  <span className="font-semibold text-foreground">
                    {action.label}
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-accent group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              ))}
            </div>

            {/* Download Receipt */}
            <button className="w-full p-4 border border-border rounded-xl hover:bg-card/50 transition-colors flex items-center justify-center gap-2 text-foreground font-semibold mb-8">
              <Download size={18} />
              Download Receipt
            </button>

            {/* Share */}
            <button className="w-full p-4 border border-border rounded-xl hover:bg-card/50 transition-colors flex items-center justify-center gap-2 text-foreground font-semibold">
              <Share2 size={18} />
              Share on Social Media
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 md:px-6 mt-16 bg-card/50 py-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'When will my project be verified?',
                  a: "Projects are typically verified within 24 hours. You'll receive an email notification once verification is complete.",
                },
                {
                  q: 'Can I cancel my transaction?',
                  a: 'No, all transactions are final. However, you can contact support if you have issues.',
                },
                {
                  q: 'Is there a receipt I can download?',
                  a: 'Yes! Click the "Download Receipt" button above to get your transaction receipt in PDF format.',
                },
                {
                  q: 'How do I check my transaction status?',
                  a: 'Visit your dashboard to view all your submissions, votes, and transaction history.',
                },
                {
                  q: 'What if my payment fails?',
                  a: "If payment fails, you'll see an error message. Please try again with the same or different payment method.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="glass p-4 rounded-lg group cursor-pointer"
                >
                  <summary className="font-medium text-foreground flex items-center justify-between">
                    {faq.q}
                    <span className="ml-2 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="text-muted-foreground mt-3 text-sm">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
