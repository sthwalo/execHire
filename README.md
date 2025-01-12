# ExecuHire - Luxury Vehicle Rental Platform

![ExecuHire Banner](public/images/hero.jpg)

ExecuHire is a modern, full-stack web application for luxury vehicle rentals, built with Next.js 13, TypeScript, and PostgreSQL. The platform offers a seamless experience for booking high-end vehicles, with features like real-time availability tracking and an intuitive booking system.

## Features

- **Modern Tech Stack**: Built with Next.js 13, TypeScript, and PostgreSQL
- **Responsive Design**: Beautiful UI that works seamlessly across all devices
- **Real-time Updates**: Live vehicle availability tracking
- **Secure Booking System**: End-to-end booking flow with status tracking
- **Admin Dashboard**: Manage vehicles, bookings, and users
- **API Integration**: RESTful API endpoints for vehicle and booking management
- **State Management**: Redux Toolkit for efficient state handling
- **Database Integration**: Prisma ORM for type-safe database operations

## Tech Stack

- **Frontend**:
  - Next.js 13 (App Router)
  - TypeScript
  - Redux Toolkit
  - Tailwind CSS
  - Shadcn UI Components

- **Backend**:
  - Next.js API Routes
  - PostgreSQL
  - Prisma ORM
  - JWT Authentication

- **Testing**:
  - Jest
  - React Testing Library
  - API Integration Tests

- **DevOps**:
  - Docker
  - GitHub Actions
  - Vercel Deployment

## Project Structure

```
execuhire/
├── app/                    # Next.js 13 app directory
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

## Testing

Comprehensive test suite including:

- Unit tests for components
- Integration tests for API endpoints
- End-to-end testing
- Automated CI/CD testing

## Mobile Responsiveness

The application is fully responsive and tested across:

- Desktop browsers
- Tablets
- Mobile devices
- Different screen sizes and orientations

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
   cp .env.example .env
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Developer

Built with ❤️ by [Your Name]

## Acknowledgments

- [Next.js Team](https://nextjs.org)
- [Vercel](https://vercel.com)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
