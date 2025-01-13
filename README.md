# ExecuHire - Premium Vehicle Rental Platform

ExecuHire is a modern, full-stack vehicle rental platform built with Next.js 13, TypeScript, and Prisma. It offers a seamless experience for renting luxury vehicles with features like real-time availability, secure payments, and email notifications.

## 🚀 Features

- **Authentication & Authorization**
  - Secure user authentication with NextAuth.js
  - Role-based access control (Admin/User)
  - Protected API routes and admin dashboard

- **Vehicle Management**
  - Real-time vehicle availability tracking
  - Dynamic pricing based on duration
  - Comprehensive vehicle details and specifications
  - Image galleries and video showcases

- **Booking System**
  - Interactive booking calendar
  - Real-time availability checks
  - Automated confirmation emails
  - Booking history and status tracking

- **Payment Integration**
  - Secure payment processing
  - Multiple payment methods
  - Automated payment receipts
  - Payment status tracking

- **User Experience**
  - Responsive design for all devices
  - Modern UI with Tailwind CSS
  - Real-time notifications
  - Interactive vehicle gallery

## 📋 Prerequisites

- Node.js 18.x or higher
- PostgreSQL 14.x or higher
- Stripe account for payments
- AWS S3 bucket for image storage (optional)

## 🛠 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/execuhire.git
cd execuhire
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
```

## 🔐 Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/execuhire"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# AWS S3 (Optional)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="your-region"
AWS_BUCKET_NAME="your-bucket-name"
```

## 🚀 Deployment

### Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Deployment Platforms

- **Vercel** (Recommended):
  - Connect your GitHub repository
  - Configure environment variables
  - Deploy automatically

- **AWS/DigitalOcean**:
  - Set up a Ubuntu 20.04 LTS server
  - Install Node.js and PostgreSQL
  - Use PM2 for process management
  - Configure Nginx as reverse proxy

## 🔄 Caching Strategy

1. **Browser Caching**:
   - Static assets cached for 1 year
   - API responses cached based on Cache-Control headers

2. **Server Caching**:
   - Database query results cached using Redis
   - Session data cached in Redis
   - Static pages cached at build time

## 📚 API Documentation

### Authentication

```typescript
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Vehicles

```typescript
GET /api/vehicles
GET /api/vehicles/:id
POST /api/vehicles (Admin)
PUT /api/vehicles/:id (Admin)
DELETE /api/vehicles/:id (Admin)
```

### Bookings

```typescript
GET /api/bookings
POST /api/bookings
GET /api/bookings/:id
PUT /api/bookings/:id
DELETE /api/bookings/:id
```

## 🔍 Performance Optimization

1. **Image Optimization**:
   - Next.js Image component with automatic optimization
   - WebP format support
   - Responsive sizes
   - Lazy loading

2. **Code Optimization**:
   - Route-based code splitting
   - Tree shaking
   - Minification
   - Compression

3. **Data Fetching**:
   - Server-side rendering for SEO
   - Incremental Static Regeneration
   - SWR for client-side data fetching

## 📈 Monitoring

1. **Error Tracking**:
   - Sentry integration
   - Custom error boundaries
   - API error logging

2. **Performance Monitoring**:
   - Next.js Analytics
   - Custom performance metrics
   - Real user monitoring

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📚 Documentation

- [API Documentation](docs/api.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Troubleshooting](TROUBLESHOOTING.md)

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run e2e tests:
```bash
npm run test:e2e
```

## 👥 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 🐛 Bug Reports

If you discover any bugs, please create an issue in the [issue tracker](https://github.com/yourusername/execuhire/issues).

## 📞 Support

For support, email support@execuhire.com or join our Slack channel.