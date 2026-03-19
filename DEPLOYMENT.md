# YouthIn Deployment Guide

## Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Git
- Vercel account (optional, for deployment)
- MTN/Orange payment API credentials

### Installation

1. **Clone and Setup**
```bash
# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Fill in your API credentials
nano .env.local
```

2. **Development Mode**
```bash
# Run development server
pnpm dev

# Open browser at http://localhost:3000
```

### Environment Variables

Add to `.env.local`:

```env
# MTN Mobile Money (Get from https://developer.mtn.cm)
MTN_PRIMARY_KEY=your_primary_key
MTN_SECONDARY_KEY=your_secondary_key
NEXT_PUBLIC_MTN_API_URL=https://api.mtn.cm

# Orange Money (Get from https://developer.orange.cm)
ORANGE_CLIENT_ID=your_client_id
ORANGE_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_ORANGE_API_URL=https://api.orange.cm

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial YouthIn commit"
git push origin main
```

2. **Deploy**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Domain Setup**
   - Add custom domain in Vercel dashboard
   - Update DNS records
   - SSL certificate auto-configured

**Deployment Time**: ~2 minutes

### Option 2: Docker

1. **Build Image**
```bash
docker build -t youthin:latest .

# Create Dockerfile if needed
cat > Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
EOF
```

2. **Run Container**
```bash
docker run -p 3000:3000 \
  -e MTN_PRIMARY_KEY=$MTN_PRIMARY_KEY \
  -e ORANGE_CLIENT_ID=$ORANGE_CLIENT_ID \
  youthin:latest
```

### Option 3: Traditional Server (Nginx + Node)

1. **Prepare Server**
```bash
# SSH into your server
ssh ubuntu@your-server-ip

# Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt-get install -y nginx
```

2. **Deploy Application**
```bash
# Clone repository
git clone https://github.com/your-username/youthin.git
cd youthin

# Install dependencies
npm install

# Build
npm run build

# Start (using PM2 for process management)
npm install -g pm2
pm2 start npm --name "youthin" -- start
pm2 save
```

3. **Configure Nginx**
```bash
sudo nano /etc/nginx/sites-available/default
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Enable SSL**
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Post-Deployment Setup

### 1. Payment Configuration

1. **MTN Mobile Money**
   - Register at https://developer.mtn.cm
   - Create OAuth application
   - Get Primary and Secondary API keys
   - Whitelist your domain
   - Set webhook URL to: `https://yourdomain.com/api/webhooks/payment`

2. **Orange Money**
   - Register at https://developer.orange.cm
   - Create application
   - Get Client ID and Secret
   - Whitelist your domain
   - Set webhook URL to: `https://yourdomain.com/api/webhooks/payment`

### 2. Database Setup (Optional)

If you want to persist data:

```bash
# Install database (PostgreSQL recommended)
sudo apt-get install -y postgresql

# Create database
createdb youthin

# Run migrations
npm run migrate
```

Add to `.env.local`:
```env
DATABASE_URL=postgresql://user:password@localhost/youthin
```

### 3. Email Notifications

For transactional emails, add SendGrid or similar:

```env
SENDGRID_API_KEY=your_sendgrid_key
```

### 4. Monitoring & Analytics

Add monitoring services:

```env
SENTRY_DSN=your_sentry_dsn
```

---

## Testing

### Run Tests
```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:coverage
```

### Payment Testing

1. **Demo Mode** (Default)
   - No real charges
   - 90% success rate
   - Instant confirmation

2. **Production Mode**
   - Real payment processing
   - Requires live credentials
   - Full transaction logging

### Test Scenarios
- [x] Project submission with valid data
- [x] Project submission with invalid data
- [x] Voting for a project
- [x] Duplicate vote prevention
- [x] Payment success flow
- [x] Payment failure handling
- [x] Dashboard display
- [x] Mobile responsiveness

---

## Monitoring & Maintenance

### Health Checks
```bash
# Check if server is running
curl https://yourdomain.com/api/health

# Check metrics
curl https://yourdomain.com/api/metrics
```

### Logs
```bash
# View application logs
pm2 logs youthin

# View Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Backups
```bash
# Daily backup at 2 AM
0 2 * * * pg_dump youthin > /backup/youthin_$(date +\%Y\%m\%d).sql

# Keep last 30 days
find /backup -name "youthin_*.sql" -mtime +30 -delete
```

### Updates
```bash
# Check for dependency updates
npm audit

# Update packages
npm update

# Run tests
npm test

# Deploy
git push origin main
```

---

## Troubleshooting

### Payment API Not Working

```bash
# Check if endpoints are accessible
curl -X POST https://api.mtn.cm/payment -H "Authorization: Bearer $MTN_PRIMARY_KEY"

# Verify API credentials
echo $MTN_PRIMARY_KEY
echo $ORANGE_CLIENT_ID

# Check rate limiting
curl -I https://yourdomain.com/api/payment
```

### High Server Load

```bash
# Check server resources
top -b -n 1 | head -20

# View active connections
netstat -an | grep ESTABLISHED | wc -l

# Restart application
pm2 restart youthin
```

### Database Issues

```bash
# Connect to database
psql -d youthin

# Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

# Backup before maintenance
pg_dump youthin > backup.sql
```

---

## Performance Optimization

### Caching
- Static assets cached for 1 year
- API responses cached for 5 minutes
- Database queries cached where appropriate

### Image Optimization
```bash
# Pre-compress images
find public -name "*.jpg" -exec jpegoptim -m90 {} \;
find public -name "*.png" -exec optipng -o2 {} \;
```

### Database Optimization
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at);
CREATE INDEX idx_votes_project_id ON votes(project_id);
CREATE INDEX idx_transactions_phone ON transactions(phone_number);
```

---

## Security Checklist

- [ ] Environment variables not committed to git
- [ ] HTTPS enforced on all routes
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] API authentication configured
- [ ] Database encrypted at rest
- [ ] Backups encrypted and tested
- [ ] Secrets rotated regularly
- [ ] Dependencies kept up to date
- [ ] Security headers configured
- [ ] WAF rules configured
- [ ] DDoS protection enabled

### Security Headers
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

---

## Scaling for Production

### Load Balancing
```bash
# Using HAProxy
apt-get install -y haproxy

# Configure multiple app instances
pm2 start npm --instances 4 --name "youthin" -- start
```

### CDN Setup
```env
# Cloudflare
CLOUDFLARE_API_KEY=your_key
CLOUDFLARE_ZONE_ID=your_zone_id
```

### Database Replication
```sql
-- Setup read replicas for high traffic
CREATE PUBLICATION production_replication FOR TABLE projects, votes, transactions;
```

---

## Disaster Recovery

### Recovery Procedures

1. **Application Crash**
   - PM2 auto-restart: `pm2 save && pm2 startup`
   - Manual restart: `pm2 restart youthin`

2. **Database Corruption**
   - Restore from backup: `psql youthin < backup.sql`
   - Point-in-time recovery: Use WAL archives

3. **Full Server Failure**
   - Spin up new instance
   - Restore from backup
   - Update DNS records
   - Verify payment webhooks

### Backup Strategy
- Daily automated backups
- Weekly full backup to S3
- Monthly disaster recovery test
- 30-day retention policy

---

## Support & Help

- **Documentation**: https://docs.youthin.cm
- **Status Page**: https://status.youthin.cm
- **Slack Community**: https://slack.youthin.cm
- **Email Support**: support@youthin.cm
- **Issues**: https://github.com/youthin/issues

---

**Deployment Version**: 2.0.0
**Last Updated**: March 17, 2026
**Next Review**: June 2026
