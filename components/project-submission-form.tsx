'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { PaymentMethodSelector } from './payment-method-selector'
import { PhoneInput } from './phone-input'
import {
  validateProjectSubmission,
  type ProjectSubmissionData,
} from '@/lib/payment-validation'
import {
  initiateMTNPayment,
  initiateOrangePayment,
  generateTransactionReference,
} from '@/lib/payment-service'
import {
  Upload,
  AlertCircle,
  CheckCircle,
  Loader,
  X,
  Image as ImageIcon,
} from 'lucide-react'

interface FormErrors {
  [key: string]: string
}

export function ProjectSubmissionForm() {
  const [formData, setFormData] = useState<Partial<ProjectSubmissionData>>({
    paymentMethod: 'mtn',
    images: [],
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedImages, setUploadedImages] = useState<
    { file: File; preview: string }[]
  >([])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    files.forEach((file) => {
      if (uploadedImages.length + files.length > 5) {
        setErrors((prev) => ({
          ...prev,
          images: 'Maximum 5 images allowed',
        }))
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImages((prev) => [
          ...prev,
          {
            file,
            preview: event.target?.result as string,
          },
        ])
        setFormData((prev) => ({
          ...prev,
          images: [...(prev.images || []), file],
        }))
      }
      reader.readAsDataURL(file)
    })

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setSuccess(false)

    try {
      // Validate form
      const validationErrors = validateProjectSubmission(formData)

      if (validationErrors.length > 0) {
        const errorMap: FormErrors = {}
        validationErrors.forEach((error) => {
          errorMap[error.field] = error.message
        })
        setErrors(errorMap)
        setIsSubmitting(false)
        return
      }

      // Initiate payment
      const ref = generateTransactionReference('PROJECT')

      const paymentResult =
        formData.paymentMethod === 'mtn'
          ? await initiateMTNPayment({
              provider: 'mtn',
              phoneNumber: formData.founderPhone || '',
              amount: 10000, // Cost of project submission
              currency: 'XAF',
              reference: ref,
              description: `Project submission: ${formData.title}`,
              type: 'project-submission',
            })
          : await initiateOrangePayment({
              provider: 'orange',
              phoneNumber: formData.founderPhone || '',
              amount: 10000,
              currency: 'XAF',
              reference: ref,
              description: `Project submission: ${formData.title}`,
              type: 'project-submission',
            })

      if (paymentResult.success) {
        setSuccess(true)
        setSuccessMessage(
          `Payment initiated! Transaction: ${paymentResult.transactionId}`
        )
        setFormData({
          paymentMethod: 'mtn',
          images: [],
        })
        setUploadedImages([])
      } else {
        setErrors({
          submit: paymentResult.error || 'Payment failed',
        })
      }
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'An error occurred',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start gap-3 animate-pop">
          <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-500">{successMessage}</p>
            <p className="text-sm text-green-400/70">
              Your project submission has been submitted successfully!
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errors.submit && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl flex items-start gap-3">
          <AlertCircle size={20} className="text-destructive mt-0.5 flex-shrink-0" />
          <p className="text-sm text-destructive">{errors.submit}</p>
        </div>
      )}

      {/* Section 1: Project Information */}
      <div className="glass p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-accent mb-4">
            Project Information
          </h3>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ''}
            onChange={handleInputChange}
            placeholder="e.g., YouthTech Platform"
            className={`w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
              errors.title ? 'border-destructive focus:ring-destructive' : ''
            }`}
          />
          {errors.title && (
            <p className="text-xs text-destructive mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Project Category *
          </label>
          <select
            name="category"
            value={formData.category || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
              errors.category ? 'border-destructive focus:ring-destructive' : ''
            }`}
          >
            <option value="">Select a category</option>
            <option value="tech">Technology</option>
            <option value="agri">Agriculture</option>
            <option value="fintech">Fintech</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="ecommerce">E-Commerce</option>
            <option value="other">Other</option>
          </select>
          {errors.category && (
            <p className="text-xs text-destructive mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Project Description *
          </label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            placeholder="Tell us about your project... (20-2000 characters)"
            rows={5}
            className={`w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none ${
              errors.description
                ? 'border-destructive focus:ring-destructive'
                : ''
            }`}
          />
          {errors.description && (
            <p className="text-xs text-destructive mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Budget (FCFA) *
          </label>
          <input
            type="number"
            name="budget"
            value={formData.budget || ''}
            onChange={handleInputChange}
            placeholder="100000"
            className={`w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
              errors.budget ? 'border-destructive focus:ring-destructive' : ''
            }`}
          />
          {errors.budget && (
            <p className="text-xs text-destructive mt-1">{errors.budget}</p>
          )}
        </div>
      </div>

      {/* Section 2: Founder Information */}
      <div className="glass p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-accent mb-4">
            Founder Information
          </h3>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Full Name *
          </label>
          <input
            type="text"
            name="founderName"
            value={formData.founderName || ''}
            onChange={handleInputChange}
            placeholder="Your full name"
            className={`w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
              errors.founderName
                ? 'border-destructive focus:ring-destructive'
                : ''
            }`}
          />
          {errors.founderName && (
            <p className="text-xs text-destructive mt-1">{errors.founderName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Email *
          </label>
          <input
            type="email"
            name="founderEmail"
            value={formData.founderEmail || ''}
            onChange={handleInputChange}
            placeholder="your@email.com"
            className={`w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
              errors.founderEmail
                ? 'border-destructive focus:ring-destructive'
                : ''
            }`}
          />
          {errors.founderEmail && (
            <p className="text-xs text-destructive mt-1">{errors.founderEmail}</p>
          )}
        </div>

        <PhoneInput
          name="founderPhone"
          value={formData.founderPhone || ''}
          onChange={handleInputChange}
          error={errors.founderPhone}
          hint="Format: +237XXXXXXXXX or 6XXXXXXXXX"
        />

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Business Phone
          </label>
          <input
            type="tel"
            name="businessPhone"
            value={formData.businessPhone || ''}
            onChange={handleInputChange}
            placeholder="+237 6XX XXX XXX"
            className={`w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
              errors.businessPhone
                ? 'border-destructive focus:ring-destructive'
                : ''
            }`}
          />
          {errors.businessPhone && (
            <p className="text-xs text-destructive mt-1">
              {errors.businessPhone}
            </p>
          )}
        </div>
      </div>

      {/* Section 3: Project Images */}
      <div className="glass p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-accent mb-4">
            Project Images (1-5 images) *
          </h3>
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover-glow transition-all"
        >
          <ImageIcon
            size={40}
            className="mx-auto mb-3 text-accent/50"
          />
          <p className="text-foreground font-medium mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-muted-foreground">
            PNG, JPG, WebP (max 5MB per image)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {errors.images && (
          <p className="text-xs text-destructive">{errors.images}</p>
        )}

        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedImages.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img.preview}
                  alt={`Project ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-destructive/90 hover:bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 4: Payment Method */}
      <div className="glass p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-accent mb-4">
            Payment Method
          </h3>
        </div>

        <PaymentMethodSelector
          value={formData.paymentMethod || 'mtn'}
          onChange={(method) =>
            setFormData((prev) => ({
              ...prev,
              paymentMethod: method,
            }))
          }
        />

        <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
          <p className="text-sm text-foreground">
            <span className="font-semibold">Cost: 10,000 FCFA</span>
            <br />
            <span className="text-muted-foreground">
              One-time fee to submit your project to the YouthIn contest
            </span>
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all hover-lift"
      >
        {isSubmitting ? (
          <>
            <Loader size={18} className="animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          <>
            <Upload size={18} className="mr-2" />
            Submit Project & Pay (10,000 FCFA)
          </>
        )}
      </Button>
    </form>
  )
}
