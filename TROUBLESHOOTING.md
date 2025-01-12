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

## Need More Help?

If you're still experiencing issues:

1. Check the [GitHub Issues](https://github.com/yourusername/execuhire/issues)
2. Join our [Discord Community](https://discord.gg/execuhire)
3. Contact support at support@execuhire.com
4. Create a new issue with detailed reproduction steps
