# ExecuHire API Documentation

## Overview

The ExecuHire API is a RESTful service that provides endpoints for managing vehicle rentals, bookings, and user accounts. This documentation provides detailed information about each endpoint, including request/response formats and authentication requirements.

## Base URL

```
https://api.execuhire.com
```

For local development:
```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  },
  "token": "jwt_token_here"
}
```

#### POST /api/auth/login
Authenticate a user and get a token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  },
  "token": "jwt_token_here"
}
```

### Vehicles

#### GET /api/vehicles
Get a list of all vehicles.

**Query Parameters:**
- `category` (optional): Filter by vehicle category
- `available` (optional): Filter by availability
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page

**Response:**
```json
{
  "vehicles": [
    {
      "id": "vehicle_123",
      "name": "Mercedes-AMG C43",
      "category": "LUXURY",
      "price": "R8,000/half-day | R2,500/hr",
      "pricePerDay": 16000,
      "specs": [
        "Sport Sedan",
        "3.0L Inline-6 Turbo",
        "Automatic",
        "5 Seats"
      ],
      "available": true,
      "image": "/images/fleet/c43.avif"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

#### GET /api/vehicles/:id
Get details of a specific vehicle.

**Response:**
```json
{
  "id": "vehicle_123",
  "name": "Mercedes-AMG C43",
  "category": "LUXURY",
  "price": "R8,000/half-day | R2,500/hr",
  "pricePerDay": 16000,
  "specs": [
    "Sport Sedan",
    "3.0L Inline-6 Turbo",
    "Automatic",
    "5 Seats"
  ],
  "available": true,
  "image": "/images/fleet/c43.avif"
}
```

### Bookings

#### POST /api/bookings
Create a new booking.

**Request Body:**
```json
{
  "vehicleId": "vehicle_123",
  "startDate": "2025-01-15T10:00:00Z",
  "endDate": "2025-01-17T10:00:00Z"
}
```

**Response:**
```json
{
  "id": "booking_123",
  "vehicleId": "vehicle_123",
  "userId": "user_123",
  "startDate": "2025-01-15T10:00:00Z",
  "endDate": "2025-01-17T10:00:00Z",
  "status": "PENDING",
  "totalPrice": 32000
}
```

#### GET /api/bookings
Get user's bookings.

**Query Parameters:**
- `status` (optional): Filter by booking status
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "bookings": [
    {
      "id": "booking_123",
      "vehicle": {
        "id": "vehicle_123",
        "name": "Mercedes-AMG C43",
        "image": "/images/fleet/c43.avif"
      },
      "startDate": "2025-01-15T10:00:00Z",
      "endDate": "2025-01-17T10:00:00Z",
      "status": "CONFIRMED",
      "totalPrice": 32000
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10
  }
}
```

#### GET /api/bookings/:id
Get details of a specific booking.

**Response:**
```json
{
  "id": "booking_123",
  "vehicle": {
    "id": "vehicle_123",
    "name": "Mercedes-AMG C43",
    "image": "/images/fleet/c43.avif"
  },
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "startDate": "2025-01-15T10:00:00Z",
  "endDate": "2025-01-17T10:00:00Z",
  "status": "CONFIRMED",
  "totalPrice": 32000,
  "paymentStatus": "PAID"
}
```

#### PUT /api/bookings/:id
Update a booking status.

**Request Body:**
```json
{
  "status": "CANCELLED"
}
```

**Response:**
```json
{
  "id": "booking_123",
  "status": "CANCELLED",
  "updatedAt": "2025-01-12T20:15:00Z"
}
```

### User Profile

#### GET /api/profile
Get the current user's profile.

**Response:**
```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "bookings": {
    "total": 5,
    "active": 2
  }
}
```

#### PUT /api/profile
Update user profile.

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "+27123456789"
}
```

**Response:**
```json
{
  "id": "user_123",
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+27123456789",
  "updatedAt": "2025-01-12T20:15:00Z"
}
```

### Payments

#### POST /api/payments/create-intent
Create a payment intent for a booking.

**Request Body:**
```json
{
  "bookingId": "booking_123"
}
```

**Response:**
```json
{
  "clientSecret": "pi_123_secret_456",
  "amount": 32000,
  "currency": "zar"
}
```

#### POST /api/payments/webhook
Webhook endpoint for payment status updates.

**Request Body:**
```json
{
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_123",
      "amount": 32000,
      "metadata": {
        "bookingId": "booking_123"
      }
    }
  }
}
```

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "startDate",
      "message": "Start date must be in the future"
    }
  }
}
```

Common error codes:
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `422`: Unprocessable Entity
- `500`: Internal Server Error

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705089600
```

## Webhooks

Webhooks are available for the following events:
- `booking.created`
- `booking.updated`
- `booking.cancelled`
- `payment.succeeded`
- `payment.failed`

Configure webhook endpoints in your dashboard and ensure they respond with 2xx status codes.

## Testing

A sandbox environment is available for testing:
```
https://sandbox-api.execuhire.com
```

Test credentials:
```
Email: test@execuhire.com
Password: test123
```

## Support

For API support:
- Email: api-support@execuhire.com
- API Status: https://status.execuhire.com
- Developer Discord: https://discord.gg/execuhire-dev
