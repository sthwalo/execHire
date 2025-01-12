import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Vehicle {
  name: string;
  image: string;
  price: string;
  specs: string[];
  available?: boolean;
}

interface VehicleState {
  vehicles: Vehicle[];
  featuredVehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  loading: boolean;
  error: string | null;
}

const initialState: VehicleState = {
  vehicles: [
    {
      name: "Lamborghini Urus",
      image: "/images/fleet/urus.avif",
      price: "R18,000/half-day",
      specs: ["Premium SUV", "4.0L V8 Twin-Turbo", "Automatic", "5 Seats", "2hrs: R5,000"],
      available: true
    },
    {
      name: "BMW i7 740d",
      image: "/images/fleet/i7.jpg",
      price: "R10,000/half-day",
      specs: ["Luxury Sedan", "Electric/Diesel Hybrid", "Automatic", "5 Seats", "2hrs: R3,000"],
      available: true
    },
    {
      name: "Mercedes G63",
      image: "/images/fleet/g63.avif",
      price: "R10,000/half-day",
      specs: ["Luxury SUV", "4.0L V8 Biturbo", "Automatic", "5 Seats", "2hrs: R3,000"],
      available: true
    },
    {
      name: "Maserati Levante",
      image: "/images/fleet/Levante.webp",
      price: "R8,000/half-day",
      specs: ["Luxury SUV", "3.0L V6 Twin-Turbo", "Automatic", "5 Seats", "2hrs: R2,500"],
      available: true
    },
    // Add more vehicles here...
  ],
  featuredVehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload;
    },
    setFeaturedVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.featuredVehicles = action.payload;
    },
    setSelectedVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.selectedVehicle = action.payload;
    },
    clearSelectedVehicle: (state) => {
      state.selectedVehicle = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    toggleVehicleAvailability: (state, action: PayloadAction<string>) => {
      const vehicle = state.vehicles.find(v => v.name === action.payload);
      if (vehicle) {
        vehicle.available = !vehicle.available;
      }
    },
  },
});

export const {
  setVehicles,
  setFeaturedVehicles,
  setSelectedVehicle,
  clearSelectedVehicle,
  setLoading,
  setError,
  toggleVehicleAvailability,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
