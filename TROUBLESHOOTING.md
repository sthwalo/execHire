# ExecuHire Troubleshooting Guide

This guide covers common issues you might encounter while setting up or running ExecuHire and their solutions.

## Table of Contents

1. [Database Issues](#database-issues)
2. [Authentication Issues](#authentication-issues)
3. [Image Loading Issues](#image-loading-issues)
4. [Booking System Issues](#booking-system-issues)
5. [Payment Integration Issues](#payment-integration-issues)
6. [Email Notification Issues](#email-notification-issues)
7. [Development Server Issues](#development-server-issues)
8. [January 13, 2025 Updates](#january-13-2025-updates)
9. [Production Build Issues](#production-build-issues)
10. [Module Not Found Errors](#module-not-found-errors)
11. [Dependency Resolution Errors](#dependency-resolution-errors)
12. [Type System Issues](#type-system-issues)
13. [Communication Features](#communication-features)

## Database Issues

### Prisma Client Generation Fails

**Problem**: `prisma generate` command fails

**Solution**:
1. Delete the `node_modules/.prisma` folder
2. Run `npm install` again
3. Run `npx prisma generate`

### Database Connection Fails

**Problem**: Cannot connect to the database

**Solution**:
1. Verify your DATABASE_URL in `.env`
2. Ensure PostgreSQL is running
3. Check database credentials
4. Try connecting with `psql` to verify direct connection

### Migration Issues

**Problem**: Prisma migrations fail

**Solution**:
1. Reset the database: `npx prisma migrate reset`
2. Apply migrations: `npx prisma migrate deploy`
3. Seed the database: `npx prisma db seed`

### Prisma Create Operation Type Errors

**Problem**: Type error when creating records with unknown properties
**Error**: `Object literal may only specify known properties, and 'type' does not exist in type`
**Solution**: 

1. Check the exact shape of your Prisma model:
```prisma
model Notification {
  id        String   @id @default(cuid())
  userId    String
  message   String
  read      Boolean  @default(false)
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

2. Match your create operation exactly to the schema:
```typescript
// Correct way - only using fields defined in schema
await prisma.notification.create({
  data: {
    userId: user.id,
    message: "Your notification message"
  }
});

// Wrong way - using undefined fields
await prisma.notification.create({
  data: {
    userId: user.id,
    type: "PAYMENT",  // Error: 'type' is not in schema
    message: "Your notification message"
  }
});
```

3. If you need to categorize notifications:
   - Either use the message field to include the type
   - Or add a type field to your schema:
   ```prisma
   model Notification {
     // ... other fields
     type      String?   // Add this if you need types
   }
   ```

## Authentication Issues

### NextAuth Session Not Working

**Problem**: User remains unauthenticated after login

**Solution**:
1. Verify NEXTAUTH_SECRET in `.env`
2. Check NEXTAUTH_URL matches your development URL
3. Clear browser cookies and try again
4. Verify session callback in `[...nextauth]/route.ts`

### Admin Access Issues

**Problem**: Cannot access admin routes

**Solution**:
1. Verify user role in database
2. Check middleware configuration
3. Clear browser cache and cookies
4. Re-login as admin

### NextAuth Configuration Errors in Next.js 13+

**Problem**: Route "app/api/auth/[...nextauth]/route.ts" does not match the required types of a Next.js Route.
**Error Message**: "[authOptions] is not a valid Route export field"
**Solution**: 
1. Split NextAuth configuration into separate files:

```typescript
// Step 1: Create new file /app/api/auth/[...nextauth]/options.ts
// Move all configuration here:
- Auth configuration (authOptions)
- Type declarations
- Providers setup
- Callbacks
- Session configuration

// Step 2: Simplify route.ts to only contain:
import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

2. If the error persists:
   - Clear Next.js cache: `rm -rf .next`
   - Rebuild the application: `npm run build`

Note: In Next.js 13+, route files should only export route handlers (GET, POST, etc.). Configuration should be moved to separate files.
- The route file should not export `authOptions`

### NextAuth Type Errors

**Problem**: Property 'role' does not exist on type 'User | AdapterUser'
**Solution**: Extend NextAuth types to include custom properties:

```typescript
// In your auth configuration file (e.g., options.ts)
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]
  }

  // Add this interface to extend the User type
  interface User {
    role: string;
  }
}
```

This tells TypeScript that:
1. The Session's user object includes 'id' and 'role'
2. The User type includes a 'role' property
3. These types are merged with NextAuth's built-in types

### NextAuth Adapter Type Errors

**Problem**: Type mismatch between PrismaAdapter and NextAuth Adapter types
**Error**: `Type 'Adapter' is not assignable to type 'Adapter'`
**Solution**: 
1. Extend the AdapterUser type and adjust the adapter configuration:

```typescript
// Add this type declaration
declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: string;
  }
}

// Use type assertion for adapter
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as any,  // Type assertion to avoid mismatch
  // ... rest of your configuration
}
```

2. If the error persists, check your package versions:
```bash
# Make sure these versions are compatible
npm list next-auth
npm list @prisma/client
npm list @auth/prisma-adapter
```

Note: The type assertion (`as any`) is a temporary solution. For a more type-safe approach, consider:
- Updating to compatible versions of the packages
- Using the official Prisma adapter for your Next-auth version
- Filing an issue with the Next-auth team if the type mismatch persists

### NextAuth Package Installation Issues

**Problem**: Dependency conflicts when installing NextAuth packages
**Solution**: Install packages with --legacy-peer-deps flag:

```bash
# For NextAuth Prisma adapter
npm install @next-auth/prisma-adapter --legacy-peer-deps

# For other NextAuth related packages
npm install [package-name] --legacy-peer-deps
```

Note: Using --legacy-peer-deps might ignore some dependency warnings, but it's often necessary when:
- Working with Next.js 13+
- Using multiple auth-related packages
- Dealing with version mismatches between NextAuth and its adapters

### NextAuth Import Errors

**Problem**: Module declares 'authOptions' locally, but it is not exported
**Solution**: Import authOptions from the options file, not the route file:

```typescript
// Instead of:
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Use:
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
```

Note: In Next.js 13+ with separated auth configuration:
- `options.ts` contains and exports the auth configuration
- `route.ts` only handles the API routes
- Always import `authOptions` from the options file
- The route file should not export `authOptions`

### Module Import Errors in Next.js 13+

**Problem**: Cannot find module './options' or its corresponding type declarations
**Solution**: Add file extension when importing local TypeScript files:

```typescript
// Instead of:
import { something } from './file'

// Use:
import { something } from './file.ts'
```

Note: Next.js 13+ requires explicit file extensions for TypeScript imports. This applies to:
- Local TypeScript files (.ts)
- Local TypeScript React files (.tsx)
- Does not apply to package imports (e.g., from 'next-auth')

## Image Loading Issues

### Images Not Loading

**Problem**: Vehicle images fail to load

**Solution**:
1. Verify image paths in seed data
2. Check Next.js image configuration
3. Ensure images are in the correct format (.avif)
4. Clear browser cache

### Image Optimization Errors

**Problem**: Next.js image optimization fails

**Solution**:
1. Add image domains to `next.config.js`
2. Use proper image dimensions
3. Add `unoptimized` prop for local images
4. Verify image file permissions

## Booking System Issues

### Booking Creation Fails

**Problem**: Cannot create new bookings

**Solution**:
1. Check user authentication status
2. Verify vehicle availability
3. Validate date range selection
4. Check API response in browser console

### Calendar Issues

**Problem**: Date picker not working correctly

**Solution**:
1. Clear browser cache
2. Update date-fns package
3. Check date format consistency
4. Verify timezone settings

## Payment Integration Issues

### Payment Processing Fails

**Problem**: Cannot process payments

**Solution**:
1. Verify payment provider credentials
2. Check webhook configuration
3. Validate payment amount calculation
4. Monitor payment provider logs

### Payment Status Updates

**Problem**: Payment status not updating

**Solution**:
1. Check webhook endpoints
2. Verify database transaction handling
3. Monitor payment webhooks
4. Check error logs

## Email Notification Issues

### Emails Not Sending

**Problem**: Booking confirmation emails not received

**Solution**:
1. Verify RESEND_API_KEY
2. Check email templates
3. Monitor email service logs
4. Check spam folders

### Email Template Issues

**Problem**: Email formatting problems

**Solution**:
1. Validate HTML templates
2. Check dynamic content insertion
3. Test with different email clients
4. Verify sender domain configuration

## Development Server Issues

### Server Won't Start

**Problem**: `npm run dev` fails

**Solution**:
1. Kill any existing Node.js processes
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and reinstall
4. Check for port conflicts

### Hot Reload Not Working

**Problem**: Changes not reflecting in development

**Solution**:
1. Restart development server
2. Clear browser cache
3. Check file watching settings
4. Verify system file watchers limit

## January 13, 2025 Updates

### 1. Database Schema and Migration Issues

#### Issue: Missing pricePerHour Field
**Problem**: The database schema was missing the `pricePerHour` field for vehicles, causing validation errors.
**Solution**: 
1. Added new migration for `pricePerHour`:
```sql
ALTER TABLE "Vehicle" ADD COLUMN "pricePerHour" DECIMAL(65,30) NOT NULL DEFAULT 0;
```
2. Updated schema.prisma to include the field
3. Created and ran migration using `npx prisma migrate deploy`

#### Issue: Unique Constraint on Vehicle Names
**Problem**: Needed to ensure vehicle names are unique in the database
**Solution**: Added unique constraint to the Vehicle model:
```sql
CREATE UNIQUE INDEX "Vehicle_name_key" ON "Vehicle"("name");
```

### 2. Seed File Updates

#### Issue: Preserving Existing Data
**Problem**: Initial seed file was deleting all existing records
**Solution**: 
1. Removed the deleteMany operations
2. Used Prisma's upsert operation to preserve existing records while adding new ones:
```typescript
await prisma.vehicle.upsert({
  where: { name: vehicle.name },
  update: vehicle,
  create: vehicle
});
```

### 3. UI/UX Improvements

#### Issue: Price Display in Featured Cars
**Problem**: Prices were showing in both featured cars and fleet sections
**Solution**: Removed price display from featured cars component to only show it in the fleet section

#### Issue: Video Path References
**Problem**: Video paths were incorrectly including 'public' prefix
**Solution**: Updated video source paths in page.tsx:
- Changed from: `"public/videos/mec.mp4"`
- To: `"/videos/mec.mp4"`

### 4. Image Path Updates
**Problem**: Image paths were using .jpg extension but files are in .avif format
**Solution**: Updated all image paths in seed.ts to use .avif extension:
- may.avif
- s5.avif
- m5.avif
- rsport24.avif
- levante.avif
- p530.avif
- urus.avif
- etc.

## Git Commit Steps

1. Database Schema Changes:
```bash
git add prisma/migrations/20250113150200_add_price_per_hour/migration.sql
git add prisma/schema.prisma
git commit -m "feat(db): add pricePerHour field and unique vehicle names"
```

2. Seed File Updates:
```bash
git add prisma/seed.ts
git commit -m "feat(db): update seed file with new vehicles and correct image paths"
```

3. UI Components:
```bash
git add app/components/featured-cars/index.tsx
git commit -m "fix(ui): remove price display from featured cars section"
```

4. Video Path Fixes:
```bash
git add app/page.tsx
git commit -m "fix(ui): correct video paths in hero and fleet sections"
```

5. Push Changes:
```bash
git push origin main
```

## Next Steps
1. Ensure all vehicle images are in the correct format (.avif) in the public/images/fleet directory
2. Verify video files are correctly placed in public/videos directory
3. Run database migrations on production
4. Test the application to ensure all features work as expected

## Common Commands

### Database Management
```bash
# Apply migrations
npx prisma migrate deploy

# Reset database (if needed)
npx prisma migrate reset

# Seed database
npx prisma db seed
```

### Development
```bash
# Start development server
npm run dev

# Build application
npm run build

# Start production server
npm start
```

## Performance Issues

### Slow Page Loading

**Problem**: Pages take too long to load

**Solution**:
1. Enable React Strict Mode
2. Implement proper code splitting
3. Optimize image loading
4. Use React Suspense boundaries

### Memory Leaks

**Problem**: Application memory usage grows over time

**Solution**:
1. Check useEffect cleanup functions
2. Monitor component unmounting
3. Verify event listener cleanup
4. Use React profiler to identify issues

## Production Build Issues

### ENOENT: no such file or directory, open '.next/BUILD_ID'
**Problem**: Attempting to run `next start` without building the application first
**Solution**: 
1. Always build the application before starting in production mode:
```bash
# First, build the application
npm run build

# Then start the production server
npm start
```
2. If the error persists:
   - Delete the `.next` folder: `rm -rf .next`
   - Clear npm cache: `npm cache clean --force`
   - Rebuild the application: `npm run build`

## Module Not Found Errors

**Problem**: Build fails with "Module not found" errors, e.g., "Can't resolve '@radix-ui/react-select'"
**Solution**: 
1. Install the missing dependencies:
```bash
# For Radix UI components
npm install @radix-ui/react-select

# If you encounter other missing modules, install them similarly:
npm install [package-name]
```
2. Clear Next.js cache and node_modules (if issues persist):
```bash
# Remove Next.js cache
rm -rf .next

# Remove node_modules
rm -rf node_modules

# Reinstall dependencies
npm install
```
3. Rebuild the application:
```bash
npm run build
```

## Dependency Resolution Errors

**Problem**: npm ERESOLVE errors due to conflicting peer dependencies (e.g., conflicts with @types/react versions)
**Solution**: 
1. Try installing with --legacy-peer-deps flag:
```bash
npm install [package-name] --legacy-peer-deps
```

2. If issues persist, try cleaning and reinstalling:
```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall all dependencies with legacy peer deps
npm install --legacy-peer-deps
```

3. Alternative solution - update specific type definitions:
```bash
# Update @types/react to a compatible version
npm install @types/react@18.2.25 --save-dev --legacy-peer-deps
```

Note: Using --legacy-peer-deps is a temporary solution. For long-term stability, consider:
- Updating your dependencies to compatible versions
- Creating an issue in the relevant package repository
- Using yarn or pnpm as alternative package managers

## Type System Issues

### Vehicle Type and Category Enum Mismatches

**Problem**: Type errors with Vehicle interface and Category enum
**Error**: 
- `Type 'Vehicle[]' is not assignable to type '{ id: string; ... }'`
- `Type 'Category' is not assignable to type '"STANDARD" | "LUXURY" | "SPORT" | "SUV" | "VAN"'`

**Root Cause**: 
1. The Vehicle interface requires specific properties that weren't included in the transformation
2. Some properties from the Prisma schema weren't being properly handled in the frontend

**Solution**:
1. Updated the vehicle transformation to include all required properties:
```typescript
const transformedVehicle: Vehicle = {
  // ... existing properties ...
  pricePerHour: vehicleData.pricePerHour || 0,
  featured: vehicleData.featured ?? false,
  createdAt: vehicleData.createdAt ? new Date(vehicleData.createdAt) : new Date(),
  updatedAt: vehicleData.updatedAt ? new Date(vehicleData.updatedAt) : new Date()
};
```

2. Added default values for optional properties:
   - `pricePerHour`: defaults to 0
   - `featured`: defaults to false
   - `createdAt/updatedAt`: defaults to current date

**Prevention**:
1. Always check the Vehicle interface in `src/types/index.ts` when handling vehicle data
2. Ensure API responses include all required fields
3. Use TypeScript's type checking during development to catch missing properties

**Related Files**:
- `/app/components/booking-form.tsx`
- `/src/types/index.ts`
- `/prisma/schema.prisma`

### Vehicle Type Transformation Issues

#### Issue: Missing Required Vehicle Properties
**Problem**: TypeScript error when transforming vehicle data in booking form:
```typescript
Type '{ id: any; ... }' is missing properties from type 'Vehicle': pricePerHour, featured, createdAt, updatedAt
```

**Root Cause**: 
1. The Vehicle interface requires specific properties that weren't included in the transformation
2. Some properties from the Prisma schema weren't being properly handled in the frontend

**Solution**:
1. Updated the vehicle transformation to include all required properties:
```typescript
const transformedVehicle: Vehicle = {
  // ... existing properties ...
  pricePerHour: vehicleData.pricePerHour || 0,
  featured: vehicleData.featured ?? false,
  createdAt: vehicleData.createdAt ? new Date(vehicleData.createdAt) : new Date(),
  updatedAt: vehicleData.updatedAt ? new Date(vehicleData.updatedAt) : new Date()
};
```

2. Added default values for optional properties:
   - `pricePerHour`: defaults to 0
   - `featured`: defaults to false
   - `createdAt/updatedAt`: defaults to current date

**Prevention**:
1. Always check the Vehicle interface in `src/types/index.ts` when handling vehicle data
2. Ensure API responses include all required fields
3. Use TypeScript's type checking during development to catch missing properties

**Related Files**:
- `/app/components/booking-form.tsx`
- `/src/types/index.ts`
- `/prisma/schema.prisma`

## Communication Features

### WhatsApp Integration

**Component Locations**:
- Hero Section (`app/page.tsx`)
- Fleet Page (`app/fleet/page.tsx`)
- Navigation Header (`components/navigation.tsx`)
- Footer (`components/footer.tsx`)

**Features**:
1. Vehicle-specific inquiries
2. General fleet inquiries
3. Direct chat access from header
4. Dual-action buttons in fleet page

**Common Issues**:

**Problem**: WhatsApp links not opening on mobile devices
**Solution**:
1. Ensure the phone number format is correct (27733366385)
2. URL encode all message parameters
3. Use the correct WhatsApp URL schema: `https://wa.me/`

**Problem**: Dual-action buttons misaligned
**Solution**:
1. Check flex container classes
2. Ensure proper gap spacing
3. Verify responsive classes for mobile view

**Best Practices**:
1. Always include country code in WhatsApp number
2. Pre-fill messages with context
3. Use `target="_blank"` and `rel="noopener noreferrer"`
4. Maintain consistent styling with brand colors
5. Ensure mobile-friendly touch targets

### Booking System Integration

**Problem**: Conflict between WhatsApp and email booking flows
**Solution**:
1. Clear button labeling ("Book Now" vs "More Info")
2. Consistent user flow across all pages
3. Maintain session state for booking process
4. Handle unavailable vehicles appropriately

### UI/UX Guidelines

1. Social Media Links:
   - Consistent positioning in header and footer
   - Clear hover states
   - Proper spacing between icons
   - Accessible click/tap targets

2. Call-to-Action Buttons:
   - Primary action: Book Now (Email)
   - Secondary action: More Info (WhatsApp)
   - Clear visual hierarchy
   - Responsive design considerations

## Need More Help?

If you're still experiencing issues:

1. Check the [GitHub Issues](https://github.com/yourusername/execuhire/issues)
2. Join our [Discord Community](https://discord.gg/execuhire)
3. Contact support at support@execuhire.com
4. Create a new issue with detailed reproduction steps
