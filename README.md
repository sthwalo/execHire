# ExecuHire - Luxury Car Hire Service

Experience luxury and sophistication with ExecuHire's premium car hire service.

## Features

- **Premium Fleet**: Access to a wide range of luxury vehicles
- **Easy Booking**: Simple and secure online booking system
- **Flexible Rentals**: Daily, weekly, and monthly rental options
- **Professional Service**: Dedicated customer support
- **Nationwide Coverage**: Available in major cities

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Redux Toolkit
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with NextAuth.js
- **Payment**: Stripe Integration
- **Testing**: Jest, React Testing Library

## Project Structure

```
execuhire/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── components/        # Reusable components
│   └── (routes)/         # App routes
├── prisma/                # Database schema and migrations
├── public/                # Static assets
├── src/
│   ├── store/            # Redux store configuration
│   └── lib/              # Utility functions
├── scripts/              # Development and testing scripts
└── types/                # TypeScript type definitions
```

## Vehicle Management

The platform includes comprehensive vehicle management features:

- Add, update, and remove vehicles
- Track vehicle availability
- Manage vehicle specifications
- Handle vehicle images and media
- Monitor booking history

## Booking System

Robust booking system with the following features:

- Real-time availability checking
- Booking status management (Pending, Confirmed, Cancelled)
- User booking history
- Admin booking overview
- Email notifications

## Security Features

- JWT-based authentication
- Role-based access control
- Secure password handling
- API rate limiting
- Input validation and sanitization

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/execuhire.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Developer

Built with ❤️ by [Your Name]

## Acknowledgments

- [Next.js Team](https://nextjs.org)
- [Vercel](https://vercel.com)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
