import axios from 'axios';
import type { Vehicle, Booking, Payment } from '@/src/types';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Vehicle Service
export class VehicleService {
  static async getAll(): Promise<Vehicle[]> {
    const response = await api.get('/vehicles');
    return response.data;
  }

  static async getById(id: string): Promise<Vehicle> {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  }

  static async checkAvailability(id: string, startDate: Date, endDate: Date): Promise<boolean> {
    const response = await api.get(`/vehicles/${id}/availability`, {
      params: { startDate, endDate },
    });
    return response.data.available;
  }
}

// Booking Service
export class BookingService {
  static async create(booking: Partial<Booking>): Promise<Booking> {
    const response = await api.post('/bookings', booking);
    return response.data;
  }

  static async getByUser(userId: string): Promise<Booking[]> {
    const response = await api.get('/bookings', {
      params: { userId },
    });
    return response.data;
  }

  static async update(id: string, data: Partial<Booking>): Promise<Booking> {
    const response = await api.patch(`/bookings/${id}`, data);
    return response.data;
  }
}

// Payment Service
export class PaymentService {
  static async createPaymentIntent(bookingId: string): Promise<{ clientSecret: string }> {
    const response = await api.post('/payments/create-intent', { bookingId });
    return response.data;
  }

  static async confirmPayment(paymentId: string): Promise<Payment> {
    const response = await api.post(`/payments/${paymentId}/confirm`);
    return response.data;
  }
}

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors (401, 403, 500, etc.)
    if (error.response?.status === 401) {
      // Handle unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
