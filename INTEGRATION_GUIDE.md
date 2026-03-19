# YouthIn Payment Integration Guide

## Overview

YouthIn supports payments via MTN Mobile Money and Orange Money for:
- **Project Submission**: 10,000 FCFA
- **Public Voting**: 75 FCFA per vote

## Environment Setup

### Required Environment Variables

Create a `.env.local` file with the following variables:

```env
# MTN Mobile Money
MTN_PRIMARY_KEY=your_mtn_primary_key
MTN_SECONDARY_KEY=your_mtn_secondary_key
NEXT_PUBLIC_MTN_API_URL=https://api.mtn.cm

# Orange Money
ORANGE_CLIENT_ID=your_orange_client_id
ORANGE_CLIENT_SECRET=your_orange_client_secret
NEXT_PUBLIC_ORANGE_API_URL=https://api.orange.cm
```

## MTN Mobile Money Integration

### 1. Get API Credentials

1. Visit [MTN Money Developer Portal](https://developer.mtn.cm)
2. Create a developer account
3. Register your application
4. Get your Primary and Secondary API keys
5. Whitelist your domain

### 2. Implementation Details

**Endpoint**: `POST /api/payment/mtn`

```typescript
{
  phoneNumber: "+237671234567",
  amount: 10000,
  currency: "XAF",
  reference: "PROJECT_123456_ABC",
  description: "Project submission: YouthTech Platform"
}
```

**Response**:
```json
{
  "success": true,
  "transactionId": "MTN_1234567890",
  "status": "pending",
  "message": "Payment initiated"
}
```

### 3. Verification

**Endpoint**: `POST /api/payment/verify`

```typescript
{
  provider: "mtn",
  transactionId: "MTN_1234567890"
}
```

## Orange Money Integration

### 1. Get API Credentials

1. Visit [Orange Money Developer Portal](https://developer.orange.cm)
2. Create a developer account
3. Register your application
4. Get your Client ID and Secret
5. Setup OAuth callbacks

### 2. Implementation Details

**Endpoint**: `POST /api/payment/orange`

```typescript
{
  phoneNumber: "+237676543210",
  amount: 10000,
  currency: "XAF",
  reference: "PROJECT_123456_ABC",
  description: "Project submission: YouthTech Platform"
}
```

**Response**:
```json
{
  "success": true,
  "transactionId": "ORANGE_1234567890",
  "status": "pending",
  "message": "Payment initiated"
}
```

## Payment Service Usage

### Initiating a Payment

```typescript
import { initiateMTNPayment } from '@/lib/payment-service'

const result = await initiateMTNPayment({
  provider: 'mtn',
  phoneNumber: '+237671234567',
  amount: 10000,
  currency: 'XAF',
  reference: 'PROJECT_2026_ABC123',
  description: 'Project submission: My Startup',
  type: 'project-submission'
})

if (result.success) {
  // Redirect to confirmation page
  window.location.href = `/confirmation?type=project&tx=${result.transactionId}`
} else {
  // Show error
  console.error(result.error)
}
```

### Verifying Payment Status

```typescript
import { verifyPaymentStatus } from '@/lib/payment-service'

const verification = await verifyPaymentStatus('mtn', transactionId)

if (verification.success && verification.status === 'completed') {
  // Payment successful
  // Update database and grant access
} else {
  // Payment failed or pending
}
```

## Testing Payment Flow

### Development Mode

By default, the payment service runs in **mock/demo mode**. All payments will:
- Simulate successful transactions with 90% success rate
- Return mock transaction IDs (MTN_*, ORANGE_*)
- Show real UI/UX without actual charges

### Production Mode

To enable real payments:

1. Add real API credentials to environment variables
2. Update `lib/payment-service.ts` to call actual APIs instead of mock functions
3. Implement webhook handlers for payment confirmations
4. Add transaction logging and audit trails

## Validation Rules

### Phone Number Validation

- **Format**: `+237XXXXXXXXX`, `237XXXXXXXXX`, or `6XXXXXXXXX`
- **Cameroon digits**: 6, 7, 9 (first digit after country code)
- **Length**: 9 digits after country code (237)

**Examples**:
- ✅ +237671234567
- ✅ +237676543210
- ✅ 6XXXXXXXXX
- ✅ 237671234567
- ❌ +1234567890 (wrong country)
- ❌ +237123456 (too short)

### Amount Validation

- **Project Submission**: Exactly 10,000 FCFA
- **Voting**: Exactly 75 FCFA
- **No partial payments**

## Webhook Setup

### Configure Webhooks

Add webhook URL in your payment provider dashboard:

```
https://yourdomain.com/api/webhooks/payment
```

### Webhook Payload Example

```json
{
  "event": "payment.completed",
  "transactionId": "MTN_1234567890",
  "status": "completed",
  "amount": 10000,
  "phoneNumber": "+237671234567",
  "reference": "PROJECT_2026_ABC123",
  "timestamp": "2026-03-17T10:30:00Z"
}
```

## Error Handling

### Common Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| `INSUFFICIENT_BALANCE` | Not enough credit | Try different method |
| `INVALID_PHONE` | Wrong number format | Verify number |
| `NETWORK_ERROR` | Connection issue | Retry |
| `TRANSACTION_DECLINED` | Payment declined | Contact provider |
| `INVALID_CREDENTIALS` | API keys wrong | Check env vars |

## Security Best Practices

1. **Never log sensitive data** (phone numbers, transaction IDs in plain text)
2. **Use HTTPS only** for payment endpoints
3. **Validate on backend** even if validated on frontend
4. **Store transaction IDs securely** (hashed)
5. **Implement rate limiting** to prevent abuse
6. **Use CSRF tokens** for state changes
7. **Verify webhook signatures** from payment providers
8. **Use environment variables** for all credentials

## Rate Limiting

- **Max 3 submissions per hour per user**
- **Max 1 vote per project per user per 24 hours**
- **Max 10 API calls per minute per IP**

## Support

For integration issues:
- Email: developers@youthin.cm
- Slack: [YouthIn Developer Community](https://slack.youthin.cm)
- Documentation: [YouthIn API Docs](https://docs.youthin.cm)

## Additional Resources

- [MTN Mobile Money API Documentation](https://api.mtn.cm/docs)
- [Orange Money API Documentation](https://api.orange.cm/docs)
- [Cameroon Mobile Payment Standards](https://www.beac.int)
- [YouthIn API Postman Collection](https://postman.youthin.cm)
