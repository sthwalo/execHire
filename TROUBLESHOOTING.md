# Troubleshooting Guide

This document lists common issues encountered during development and their solutions.

## Prisma Related Issues

### 1. Missing @prisma/client/runtime Module

**Error Message:**
```
Cannot find module '@prisma/client/runtime' or its corresponding type declarations.
```

**Cause:**
- Prisma packages were not properly installed
- Prisma client wasn't generated after schema changes
- Version mismatch between Prisma packages

**Solution:**
1. Install correct versions of Prisma packages:
```bash
npm install @prisma/client@5.8.0 prisma@5.8.0 --save-dev --legacy-peer-deps
```

2. Generate Prisma client:
```bash
npx prisma generate
```

3. If error persists:
   - Restart TypeScript server in your IDE
   - Clear TypeScript cache
   - Reload IDE window

**Additional Notes:**
- Always ensure `@prisma/client` and `prisma` versions match to avoid unexpected behavior
- The `--legacy-peer-deps` flag might be necessary if you encounter dependency conflicts

### Dependencies Resolution

**Error:**
Dependency conflicts when installing packages, particularly with React types and Redux.

**Solution:**
Use the `--legacy-peer-deps` flag when installing packages:
```bash
npm install [package-name] --legacy-peer-deps
```

## Prisma Type and Import Issues

### Error: Namespace '@prisma/client' has no exported member 'VehicleWhereInput'
**Problem**: TypeScript complaining about missing Prisma types.
**Solution**: Import the `Prisma` namespace from `@prisma/client` and use it to access generated types:
```typescript
import { Prisma } from '@prisma/client';
// Use as: Prisma.VehicleWhereInput
```

### Error: Cannot find Decimal from Prisma
**Problem**: Using `Prisma.Decimal` causes type errors after moving `@prisma/client` to devDependencies.
**Solution**: Import `Decimal` directly from Prisma runtime:
```typescript
import { Decimal } from '@prisma/client/runtime';
// Use as: new Decimal(value)
```

### Error: Database Migration Lock
**Problem**: Prisma migrations failing with lock timeout error:
```
Error: P1002 - The database server at localhost:5432 was reached but timed out
Context: Timed out trying to acquire a postgres advisory lock
```
**Solution**: 
1. Clear existing locks:
```sql
SELECT pg_advisory_unlock_all();
```
2. Use `prisma db push` instead of migrations for development:
```bash
npx prisma db push
```

### Dependency Location
**Problem**: `@prisma/client` should not be in devDependencies as it's needed at runtime.
**Solution**: Move `@prisma/client` back to regular dependencies in `package.json`:
```json
{
  "dependencies": {
    "@prisma/client": "^5.8.0"
    // ... other dependencies
  }
}
```

## Next.js Routing Issues

### Error: 404 - This page could not be found
**Problem**: Next.js showing default 404 page instead of a custom one.
**Solution**: Create a custom `not-found.tsx` page in the app directory:
```typescript
// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
```

**Note**: Make sure all your route segments have corresponding page.tsx files in the app directory structure:
```
app/
  page.tsx           # Home page (/)
  about/
    page.tsx         # About page (/about)
  services/
    page.tsx         # Services page (/services)
  fleet/
    page.tsx         # Fleet page (/fleet)
  contact/
    page.tsx         # Contact page (/contact)
  not-found.tsx      # Custom 404 page
```

## Next.js App Issues

### Error: Blank Page in Browser
**Problem**: The app shows a blank page with no visible content.
**Solution**: Check the following common causes:

1. **Redux Store Setup**:
   ```typescript
   // src/store/provider.tsx
   'use client';
   import { Provider } from 'react-redux';
   import { store } from './store';
   
   export function ReduxProvider({ children }) {
     return <Provider store={store}>{children}</Provider>;
   }
   ```

2. **Next.js Configuration**:
   ```javascript
   // next.config.js
   const nextConfig = {
     images: {
       domains: ['images.unsplash.com'],
     },
     // Remove experimental.serverActions as it's now default
   }
   ```

3. **Component Error Boundaries**:
   ```typescript
   'use client';
   import { ErrorBoundary } from 'react-error-boundary';
   
   function ErrorFallback({ error }) {
     return (
       <div>
         <h2>Something went wrong:</h2>
         <pre>{error.message}</pre>
       </div>
     );
   }
   
   export function SafeComponent({ children }) {
     return (
       <ErrorBoundary FallbackComponent={ErrorFallback}>
         {children}
       </ErrorBoundary>
     );
   }
   ```

4. **Check Console Errors**: Open browser developer tools (F12) to check for JavaScript errors.

5. **Verify API Routes**: Ensure API routes are working and returning expected data:
   ```typescript
   // Add error handling to API calls
   try {
     const response = await fetch('/api/vehicles');
     if (!response.ok) throw new Error('API request failed');
     const data = await response.json();
   } catch (error) {
     console.error('Error fetching data:', error);
   }
   ```

## Image Loading Issues

### Error: The requested resource isn't a valid image
**Problem**: Next.js Image component failing to load images from the public directory.
**Solution**: 
1. Ensure the image exists in the correct location:
   ```
   public/
     images/
       hero.jpg
       logo.png
       fleet/
         car1.jpg
         car2.jpg
   ```

2. Use the correct path in the Image component:
   ```tsx
   import Image from 'next/image';

   // Correct usage
   <Image 
     src="/images/hero.jpg"  // starts from public directory
     alt="Hero image"
     width={1920}
     height={1080}
   />
   ```

3. For local development, place actual images in the public directory:
   ```bash
   mkdir -p public/images
   # Then copy your images to public/images/
   ```

4. For README.md files, use the full path including 'public':
   ```markdown
   ![Image Alt](public/images/hero.jpg)
   ```

## Missing Dependencies

### Error: Module not found: Can't resolve 'next-themes'
**Problem**: The theme provider component requires the `next-themes` package which is not installed.
**Solution**: Install the package using npm:
```bash
npm install next-themes --legacy-peer-deps
```

### Error: Module not found: Can't resolve '@radix-ui/react-slot'
**Problem**: UI components require Radix UI primitives and class-variance-authority for styling.
**Solution**: Install the required packages:
```bash
npm install @radix-ui/react-slot class-variance-authority --legacy-peer-deps
```

**Note**: When using shadcn/ui components, you might need to install additional Radix UI packages. Common ones include:
```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-navigation-menu @radix-ui/react-avatar --legacy-peer-deps
```

## Best Practices

1. **After Schema Changes:**
   - Always run `npx prisma generate` after making changes to your Prisma schema
   - This ensures your Prisma client is in sync with your schema

2. **Version Management:**
   - Keep `@prisma/client` and `prisma` versions in sync
   - Check package versions when encountering unexpected behavior

3. **IDE Integration:**
   - Restart TypeScript server after major dependency changes
   - Reload IDE window if type definitions aren't updating
