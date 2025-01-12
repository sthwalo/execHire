# ExecuHire - Luxury Vehicle Rental Platform

ExecuHire is a modern, full-stack web application for luxury vehicle rentals, built with cutting-edge technologies and best practices in software development.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: 
  - Tailwind CSS for utility-first styling
  - shadcn/ui for component library
- **Form Handling**: React Hook Form with Zod validation

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with NextAuth.js
- **Payment Processing**: Stripe Integration

### Testing
- **Framework**: Jest
- **Testing Library**: React Testing Library
- **E2E Testing**: Cypress (planned)

## Project Structure

```
execuHire/
├── app/                      # Next.js 14 app directory
│   ├── api/                  # API routes
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # Dashboard pages
│   └── layout.tsx           # Root layout
├── components/              # Reusable components
│   ├── ui/                  # UI components
│   └── shared/             # Shared components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── prisma/                  # Database schema and migrations
│   └── schema.prisma       
├── public/                  # Static assets
├── src/
│   ├── services/           # API services
│   ├── store/              # Redux store
│   │   ├── features/       # Redux slices
│   │   └── hooks.ts        # Redux hooks
│   └── types/              # TypeScript types
├── styles/                 # Global styles
└── tests/                 # Test files
```

## Key Features

- Browse and search luxury vehicles
- Real-time availability checking
- Secure payment processing
- User authentication and authorization
- Responsive design
- Dark mode support

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/execuHire.git
cd execuHire
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
npx prisma generate
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

## Architecture

### OOP Concepts Implementation

- **Encapsulation**: Services and components are encapsulated with clear interfaces
- **Inheritance**: Extended base components and utilities
- **Polymorphism**: Generic components with variant support
- **Abstraction**: Service layer abstracting API calls

### State Management

- **Redux Store Structure**:
  - features/
    - booking/
    - vehicle/
    - user/
  - Async thunks for API calls
  - Type-safe actions and reducers

### API Services

- Class-based service implementation
- Proper error handling
- Request/response interceptors
- Type-safe API calls

## Development Workflow

1. **Feature Development**:
   - Create feature branch
   - Implement changes
   - Write tests
   - Submit PR

2. **Testing**:
   - Unit tests for utilities and hooks
   - Integration tests for components
   - E2E tests for critical flows

3. **Code Quality**:
   - ESLint for code linting
   - Prettier for code formatting
   - Husky for pre-commit hooks

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/execuhire"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm test`: Run tests
- `npm run lint`: Run linter
- `npm run prisma:generate`: Generate Prisma client
- `npm run prisma:migrate`: Run database migrations

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

<<<<<<< HEAD
For support, email support@execuhire.com or join our Slack channel.
=======
Built with ❤️ by @sthwalo Immaculate Nyoni

## Acknowledgments

- [Next.js Team](https://nextjs.org)
- [Vercel](https://vercel.com)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
>>>>>>> 17ac3e69ac42edb9b34c24b4ed2125622b5bc70d
