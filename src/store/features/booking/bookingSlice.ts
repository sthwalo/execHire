import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Booking, Vehicle } from '@/src/types';
import { BookingService } from '@/src/services/api';

interface BookingState {
  currentBooking: Booking | null;
  selectedVehicle: Vehicle | null;
  bookingDates: {
    startDate: string | null;
    endDate: string | null;
  };
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  currentBooking: null,
  selectedVehicle: null,
  bookingDates: {
    startDate: null,
    endDate: null,
  },
  bookings: [],
  loading: false,
  error: null,
};

// Async thunks
export const createBooking = createAsyncThunk(
  'booking/create',
  async (bookingData: Partial<Booking>, { rejectWithValue }) => {
    try {
      const response = await BookingService.create(bookingData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create booking');
    }
  }
);

export const fetchUserBookings = createAsyncThunk(
  'booking/fetchUserBookings',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await BookingService.getByUser(userId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

export const updateBooking = createAsyncThunk(
  'booking/update',
  async ({ id, data }: { id: string; data: Partial<Booking> }, { rejectWithValue }) => {
    try {
      const response = await BookingService.update(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update booking');
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.selectedVehicle = action.payload;
    },
    setBookingDates: (
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) => {
      state.bookingDates = action.payload;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
      state.selectedVehicle = null;
      state.bookingDates = {
        startDate: null,
        endDate: null,
      };
    },
  },
  extraReducers: (builder) => {
    // Create booking
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
        state.bookings.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch user bookings
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update booking
    builder
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        if (state.currentBooking?.id === action.payload.id) {
          state.currentBooking = action.payload;
        }
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedVehicle,
  setBookingDates,
  clearCurrentBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
