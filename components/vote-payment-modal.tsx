'use client'

import { useState } from 'react'
import { X, Loader, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PhoneInput } from './phone-input'
import { PaymentMethodSelector } from './payment-method-selector'
import {
  initiateMTNPayment,
  initiateOrangePayment,
  generateTransactionReference,
  verifyPaymentStatus,
} from '@/lib/payment-service'
import { validateVotePayment, type VotePaymentData } from '@/lib/payment-validation'

interface VotePaymentModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
  projectTitle: string
  onSuccess: () => void
}

export function VotePaymentModal({
  isOpen,
  onClose,
  projectId,
  projectTitle,
  onSuccess,
}: VotePaymentModalProps) {
  const [step, setStep] = useState<'phone' | 'payment' | 'verifying' | 'success'>('phone')
  const [formData, setFormData] = useState<Partial<VotePaymentData>>({
    projectId,
    paymentMethod: 'mtn',
    voteAmount: 75,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionId, setTransactionId] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState('')

  if (!isOpen) return null

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const validationErrors = validateVotePayment({
      ...formData,
      voteAmount: 75,
    })

    if (validationErrors.length > 0) {
      const errorMap: { [key: string]: string } = {}
      validationErrors.forEach((err) => {
        errorMap[err.field] = err.message
      })
      setErrors(errorMap)
      return
    }

    setStep('payment')
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setErrors({})

    try {
      const ref = generateTransactionReference('VOTE')

      const paymentResult =
        formData.paymentMethod === 'mtn'
          ? await initiateMTNPayment({
              provider: 'mtn',
              phoneNumber: formData.voterPhone || '',
              amount: 75,
              currency: 'XAF',
              reference: ref,
              description: `Vote for: ${projectTitle}`,
              type: 'vote',
            })
          : await initiateOrangePayment({
              provider: 'orange',
              phoneNumber: formData.voterPhone || '',
              amount: 75,
              currency: 'XAF',
              reference: ref,
              description: `Vote for: ${projectTitle}`,
              type: 'vote',
            })

      if (paymentResult.success && paymentResult.transactionId) {
        setTransactionId(paymentResult.transactionId)
        setStep('verifying')

        // Verify payment after delay
        await new Promise((resolve) => setTimeout(resolve, 3000))

        const verification = await verifyPaymentStatus(
          formData.paymentMethod || 'mtn',
          paymentResult.transactionId
        )

        if (verification.success) {
          setSuccessMessage('Vote recorded successfully!')
          setStep('success')
          setTimeout(() => {
            onSuccess()
            handleClose()
          }, 2000)
        } else {
          setErrors({
            payment: 'Payment verification failed. Please try again.',
          })
          setStep('payment')
        }
      } else {
        setErrors({
          payment: paymentResult.error || 'Payment failed',
        })
      }
    } catch (error) {
      setErrors({
        payment: error instanceof Error ? error.message : 'An error occurred',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    setStep('phone')
    setFormData({
      projectId,
      paymentMethod: 'mtn',
      voteAmount: 75,
    })
    setErrors({})
    setTransactionId('')
    setSuccessMessage('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl max-w-md w-full max-h-96 overflow-y-auto glass border border-border/50 shadow-2xl shadow-accent/20">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border/50 p-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Vote for Project</h2>
            <p className="text-sm text-muted-foreground mt-1">{projectTitle}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-accent/20 rounded-lg transition-colors"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Vote costs <span className="text-accent font-bold">75 FCFA</span>
              </p>

              <PhoneInput
                name="voterPhone"
                placeholder="+237 6XX XXX XXX"
                value={formData.voterPhone || ''}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    voterPhone: e.target.value,
                  }))
                  if (errors.voterPhone) {
                    setErrors((prev) => ({
                      ...prev,
                      voterPhone: '',
                    }))
                  }
                }}
                error={errors.voterPhone}
                hint="Your payment confirmation will be sent here"
              />

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-primary-foreground"
              >
                Continue to Payment
              </Button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              {errors.payment && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-2">
                  <AlertCircle size={18} className="text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{errors.payment}</p>
                </div>
              )}

              <PaymentMethodSelector
                value={formData.paymentMethod || 'mtn'}
                onChange={(method) => {
                  setFormData((prev) => ({
                    ...prev,
                    paymentMethod: method,
                  }))
                  if (errors.paymentMethod) {
                    setErrors((prev) => ({
                      ...prev,
                      paymentMethod: '',
                    }))
                  }
                }}
              />

              <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg text-sm">
                <p className="text-foreground font-semibold">
                  Amount: 75 FCFA
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  This vote will be recorded on your phone number
                </p>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-accent hover:bg-accent/90 text-primary-foreground"
              >
                {isProcessing ? (
                  <>
                    <Loader size={16} className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Pay & Vote'
                )}
              </Button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-accent hover:text-accent/80 font-medium text-sm"
              >
                Back
              </button>
            </form>
          )}

          {step === 'verifying' && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-accent/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 border-4 border-accent border-t-accent/30 rounded-full animate-spin"></div>
              </div>
              <p className="text-center text-foreground font-medium">
                Verifying payment...
              </p>
              <p className="text-xs text-muted-foreground text-center">
                Transaction: {transactionId}
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-pop">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <p className="text-center text-foreground font-bold text-lg">
                {successMessage}
              </p>
              <p className="text-sm text-muted-foreground text-center">
                Your vote has been recorded successfully. Redirecting...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
