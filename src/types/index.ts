// Common interfaces and types
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
}

export interface Vehicle {
  id: string;
  name: string;
  image: string;
  images: string[];
  price: string;
  pricePerDay: number;
  specs: string[];
  description?: string;
  category: 'STANDARD' | 'LUXURY' | 'SPORT' | 'SUV' | 'VAN';
  available: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  totalAmount: number;
  user?: User;
  vehicle?: Vehicle;
}

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  stripeId?: string;
}
