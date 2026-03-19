// Payment validation utilities for YouthIn platform

export interface ProjectSubmissionData {
  title: string
  description: string
  category: string
  founderName: string
  founderEmail: string
  founderPhone: string
  businessPhone: string
  budget: number
  images: File[]
  paymentMethod: 'mtn' | 'orange'
}

export interface VotePaymentData {
  projectId: string
  voterPhone: string
  paymentMethod: 'mtn' | 'orange'
  voteAmount: number
}

export interface ValidationError {
  field: string
  message: string
}

// Validate project submission form
export function validateProjectSubmission(
  data: Partial<ProjectSubmissionData>
): ValidationError[] {
  const errors: ValidationError[] = []

  // Title validation
  if (!data.title || data.title.trim().length < 5) {
    errors.push({
      field: 'title',
      message: 'Title must be at least 5 characters long',
    })
  }

  if (data.title && data.title.length > 100) {
    errors.push({
      field: 'title',
      message: 'Title must not exceed 100 characters',
    })
  }

  // Description validation
  if (!data.description || data.description.trim().length < 20) {
    errors.push({
      field: 'description',
      message: 'Description must be at least 20 characters long',
    })
  }

  if (data.description && data.description.length > 2000) {
    errors.push({
      field: 'description',
      message: 'Description must not exceed 2000 characters',
    })
  }

  // Category validation
  const validCategories = [
    'tech',
    'agri',
    'fintech',
    'healthcare',
    'education',
    'ecommerce',
    'other',
  ]
  if (!data.category || !validCategories.includes(data.category)) {
    errors.push({
      field: 'category',
      message: 'Please select a valid category',
    })
  }

  // Founder name validation
  if (!data.founderName || data.founderName.trim().length < 2) {
    errors.push({
      field: 'founderName',
      message: 'Founder name is required',
    })
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.founderEmail || !emailRegex.test(data.founderEmail)) {
    errors.push({
      field: 'founderEmail',
      message: 'Please provide a valid email address',
    })
  }

  // Phone validation
  const phoneRegex = /^(\+237|237)?[679]\d{8}$/
  if (
    !data.founderPhone ||
    !phoneRegex.test(data.founderPhone.replace(/\s+/g, ''))
  ) {
    errors.push({
      field: 'founderPhone',
      message: 'Please provide a valid Cameroon phone number',
    })
  }

  // Business phone validation
  if (
    data.businessPhone &&
    !phoneRegex.test(data.businessPhone.replace(/\s+/g, ''))
  ) {
    errors.push({
      field: 'businessPhone',
      message: 'Please provide a valid Cameroon phone number',
    })
  }

  // Budget validation
  if (!data.budget || data.budget < 100000) {
    errors.push({
      field: 'budget',
      message: 'Budget must be at least 100,000 FCFA',
    })
  }

  if (data.budget && data.budget > 100000000) {
    errors.push({
      field: 'budget',
      message: 'Budget must not exceed 100,000,000 FCFA',
    })
  }

  // Images validation
  if (!data.images || data.images.length === 0) {
    errors.push({
      field: 'images',
      message: 'Please upload at least one project image',
    })
  }

  if (data.images && data.images.length > 5) {
    errors.push({
      field: 'images',
      message: 'You can upload a maximum of 5 images',
    })
  }

  // Validate image files
  if (data.images) {
    data.images.forEach((file, index) => {
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        errors.push({
          field: `images[${index}]`,
          message: 'Only JPEG, PNG, and WebP images are allowed',
        })
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        errors.push({
          field: `images[${index}]`,
          message: 'Image size must not exceed 5MB',
        })
      }
    })
  }

  // Payment method validation
  if (!data.paymentMethod || !['mtn', 'orange'].includes(data.paymentMethod)) {
    errors.push({
      field: 'paymentMethod',
      message: 'Please select a valid payment method',
    })
  }

  return errors
}

// Validate vote payment
export function validateVotePayment(
  data: Partial<VotePaymentData>
): ValidationError[] {
  const errors: ValidationError[] = []

  // Project ID validation
  if (!data.projectId || data.projectId.trim().length === 0) {
    errors.push({
      field: 'projectId',
      message: 'Project ID is required',
    })
  }

  // Voter phone validation
  const phoneRegex = /^(\+237|237)?[679]\d{8}$/
  if (!data.voterPhone || !phoneRegex.test(data.voterPhone.replace(/\s+/g, ''))) {
    errors.push({
      field: 'voterPhone',
      message: 'Please provide a valid Cameroon phone number',
    })
  }

  // Vote amount validation (should be 75 FCFA)
  if (data.voteAmount !== 75) {
    errors.push({
      field: 'voteAmount',
      message: 'Vote amount must be exactly 75 FCFA',
    })
  }

  // Payment method validation
  if (!data.paymentMethod || !['mtn', 'orange'].includes(data.paymentMethod)) {
    errors.push({
      field: 'paymentMethod',
      message: 'Please select a valid payment method',
    })
  }

  return errors
}

// Check for duplicate submissions (simple check, should use DB in production)
export function isDuplicateSubmission(
  email: string,
  recentSubmissions: string[]
): boolean {
  const maxSubmissionsPerHour = 3
  const emailSubmissions = recentSubmissions.filter((s) => s === email)
  return emailSubmissions.length >= maxSubmissionsPerHour
}

// Check vote frequency (max 1 vote per user per 24 hours per project)
export function canUserVote(
  userId: string,
  projectId: string,
  lastVoteTime?: Date
): boolean {
  if (!lastVoteTime) return true

  const now = new Date()
  const timeDifference = now.getTime() - lastVoteTime.getTime()
  const hoursDifference = timeDifference / (1000 * 60 * 60)

  return hoursDifference >= 24
}
