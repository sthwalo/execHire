import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Vehicle {
  id?: string;
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

// Async thunks
export const fetchVehicles = createAsyncThunk(
  'vehicle/fetchVehicles',
  async () => {
    const response = await fetch('/api/vehicles');
    if (!response.ok) {
      throw new Error('Failed to fetch vehicles');
    }
    return response.json();
  }
);

export const createVehicle = createAsyncThunk(
  'vehicle/createVehicle',
  async (vehicleData: Vehicle) => {
    const response = await fetch('/api/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });
    if (!response.ok) {
      throw new Error('Failed to create vehicle');
    }
    return response.json();
  }
);

const initialState: VehicleState = {
  vehicles: [],
  featuredVehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setFeaturedVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.featuredVehicles = action.payload;
    },
    setSelectedVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.selectedVehicle = action.payload;
    },
    clearSelectedVehicle: (state) => {
      state.selectedVehicle = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch vehicles';
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.vehicles.push(action.payload);
      });
  },
});

export const {
  setFeaturedVehicles,
  setSelectedVehicle,
  clearSelectedVehicle,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
