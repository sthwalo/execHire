import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Vehicle } from '@/src/types';
import { VehicleService } from '@/src/services/api';

interface VehicleState {
  vehicles: Vehicle[];
  featuredVehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  loading: boolean;
  error: string | null;
}

const initialState: VehicleState = {
  vehicles: [],
  featuredVehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchVehicles = createAsyncThunk(
  'vehicle/fetchVehicles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await VehicleService.getAll();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch vehicles');
    }
  }
);

export const fetchVehicleById = createAsyncThunk(
  'vehicle/fetchVehicleById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await VehicleService.getById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch vehicle');
    }
  }
);

export const checkVehicleAvailability = createAsyncThunk(
  'vehicle/checkAvailability',
  async (
    { id, startDate, endDate }: { id: string; startDate: Date; endDate: Date },
    { rejectWithValue }
  ) => {
    try {
      const response = await VehicleService.checkAvailability(id, startDate, endDate);
      return { id, available: response };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to check availability');
    }
  }
);

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
    // Fetch all vehicles
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
        // Set featured vehicles (e.g., luxury vehicles)
        state.featuredVehicles = action.payload.filter(
          (vehicle) => vehicle.category === 'LUXURY'
        );
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch single vehicle
    builder
      .addCase(fetchVehicleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicleById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVehicle = action.payload;
        const index = state.vehicles.findIndex((v) => v.id === action.payload.id);
        if (index !== -1) {
          state.vehicles[index] = action.payload;
        }
      })
      .addCase(fetchVehicleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Check availability
    builder
      .addCase(checkVehicleAvailability.fulfilled, (state, action) => {
        const { id, available } = action.payload;
        const vehicle = state.vehicles.find((v) => v.id === id);
        if (vehicle) {
          vehicle.available = available;
        }
        if (state.selectedVehicle?.id === id) {
          state.selectedVehicle.available = available;
        }
      });
  },
});

export const {
  setFeaturedVehicles,
  setSelectedVehicle,
  clearSelectedVehicle,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
