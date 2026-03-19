// MTN Mobile Money & Orange Money Payment Service
// Handles payment initiation and verification for YouthIn platform

export interface MobileMoneyPayment {
  provider: 'mtn' | 'orange'
  phoneNumber: string
  amount: number
  currency: string
  reference: string
  description: string
  type: 'project-submission' | 'vote'
}

export interface PaymentResponse {
  success: boolean
  transactionId?: string
  status?: 'pending' | 'completed' | 'failed'
  error?: string
  message?: string
}

// MTN Mobile Money Configuration
const MTN_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_MTN_API_URL || 'https://api.mtn.cm',
  primaryKey: process.env.MTN_PRIMARY_KEY || '',
  secondaryKey: process.env.MTN_SECONDARY_KEY || '',
  timeout: 30000,
}

// Orange Money Configuration
const ORANGE_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_ORANGE_API_URL || 'https://api.orange.cm',
  clientId: process.env.ORANGE_CLIENT_ID || '',
  clientSecret: process.env.ORANGE_CLIENT_SECRET || '',
  timeout: 30000,
}

// Initiate MTN Mobile Money Payment
export async function initiateMTNPayment(
  payment: MobileMoneyPayment
): Promise<PaymentResponse> {
  try {
    if (payment.provider !== 'mtn') {
      throw new Error('Invalid provider for MTN payment')
    }

    // Validate phone number (Cameroon format)
    if (!isValidCameroonPhone(payment.phoneNumber)) {
      return {
        success: false,
        error: 'Invalid phone number format',
        message: 'Please use a valid Cameroon phone number (e.g., +237671234567)',
      }
    }

    // In production, make actual API call to MTN
    // For now, return mock response
    const response = await mockMTNPaymentRequest(payment)
    return response
  } catch (error) {
    console.error('[Payment] MTN payment error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment failed',
    }
  }
}

// Initiate Orange Money Payment
export async function initiateOrangePayment(
  payment: MobileMoneyPayment
): Promise<PaymentResponse> {
  try {
    if (payment.provider !== 'orange') {
      throw new Error('Invalid provider for Orange payment')
    }

    // Validate phone number (Cameroon format)
    if (!isValidCameroonPhone(payment.phoneNumber)) {
      return {
        success: false,
        error: 'Invalid phone number format',
        message: 'Please use a valid Cameroon phone number (e.g., +237676543210)',
      }
    }

    // In production, make actual API call to Orange Money
    // For now, return mock response
    const response = await mockOrangePaymentRequest(payment)
    return response
  } catch (error) {
    console.error('[Payment] Orange payment error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment failed',
    }
  }
}

// Verify payment status
export async function verifyPaymentStatus(
  provider: 'mtn' | 'orange',
  transactionId: string
): Promise<PaymentResponse> {
  try {
    if (provider === 'mtn') {
      // Call MTN verification endpoint
      return await mockMTNVerification(transactionId)
    } else {
      // Call Orange verification endpoint
      return await mockOrangeVerification(transactionId)
    }
  } catch (error) {
    console.error('[Payment] Verification error:', error)
    return {
      success: false,
      error: 'Could not verify payment',
    }
  }
}

// Mock functions for development
async function mockMTNPaymentRequest(
  payment: MobileMoneyPayment
): Promise<PaymentResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `MTN_${Date.now()}`,
        status: 'pending',
        message: 'Payment initiated. Please complete the transaction on your phone.',
      })
    }, 1000)
  })
}

async function mockOrangePaymentRequest(
  payment: MobileMoneyPayment
): Promise<PaymentResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `ORANGE_${Date.now()}`,
        status: 'pending',
        message: 'Payment initiated. Please complete the transaction on your phone.',
      })
    }, 1000)
  })
}

async function mockMTNVerification(
  transactionId: string
): Promise<PaymentResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1 // 90% success rate for demo
      resolve({
        success: isSuccess,
        status: isSuccess ? 'completed' : 'failed',
        transactionId,
        message: isSuccess
          ? 'Payment completed successfully'
          : 'Payment verification failed',
      })
    }, 2000)
  })
}

async function mockOrangeVerification(
  transactionId: string
): Promise<PaymentResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1 // 90% success rate for demo
      resolve({
        success: isSuccess,
        status: isSuccess ? 'completed' : 'failed',
        transactionId,
        message: isSuccess
          ? 'Payment completed successfully'
          : 'Payment verification failed',
      })
    }, 2000)
  })
}

// Validate Cameroon phone number
function isValidCameroonPhone(phone: string): boolean {
  // Accept formats: +237XXXXXXXXX, 237XXXXXXXXX, 6XXXXXXXXX, +2376XXXXXXXX
  const cameroonPhoneRegex = /^(\+237|237)?[679]\d{8}$/
  return cameroonPhoneRegex.test(phone.replace(/\s+/g, ''))
}

// Format phone number to standard format
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.endsWith(cleaned.slice(-9))) {
    // 9 digits only
    return `+237${cleaned.slice(-9)}`
  }
  
  if (cleaned.startsWith('237')) {
    return `+${cleaned}`
  }
  
  if (cleaned.startsWith('237') === false && cleaned.length === 9) {
    return `+237${cleaned}`
  }
  
  return phone
}

// Generate unique transaction reference
export function generateTransactionReference(type: string): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${type.toUpperCase()}_${timestamp}_${random}`
}
