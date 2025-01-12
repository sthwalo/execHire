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

## 🛠️ Tech Stack

- **Frontend**
  - Next.js 13 (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - Redux Toolkit

- **Backend**
  - Node.js
  - Prisma ORM
  - PostgreSQL
  - NextAuth.js

- **APIs & Services**
  - REST API
  - Resend (Email)
  - Image Optimization
  - Video Streaming

## 📦 Installation

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
   Fill in your environment variables in `.env`

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/execuhire"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="re_xxxx_your_api_key_here"
```

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

## 🚀 Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 🐛 Bug Reports

If you discover any bugs, please create an issue in the [issue tracker](https://github.com/yourusername/execuhire/issues).

## 📞 Support

For support, email support@execuhire.com or join our Slack channel.