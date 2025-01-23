import { Vehicle, Booking, User } from '@/src/types';

// Define base API URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const transformVehicle = (vehicle: any) => ({
  ...vehicle,
  pricePerDay: Number(vehicle.pricePerDay),
  pricePerHour: Number(vehicle.pricePerHour)
});

export const staticDb = {
  vehicles: {
    findMany: async (): Promise<Vehicle[]> => {
      const res = await fetch(`${API_BASE}/vehicles`);
      if (!res.ok) throw new Error('Failed to fetch vehicles');
      const vehicles = await res.json();
      return vehicles.map(transformVehicle);
    },
    findUnique: async (id: string): Promise<Vehicle | null> => {
      const res = await fetch(`${API_BASE}/vehicles/${id}`);
      if (!res.ok) return null;
      return res.json();
    }
  },
  bookings: {
    create: async (data: Partial<Booking>): Promise<Booking> => {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create booking');
      return res.json();
    }
  },
  users: {
    findUnique: async (email: string): Promise<User | null> => {
      const res = await fetch(`${API_BASE}/users/by-email/${email}`);
      if (!res.ok) return null;
      return res.json();
    }
  }
};
