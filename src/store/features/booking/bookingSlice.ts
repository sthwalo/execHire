import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
  currentBooking: {
    id?: string;
    serviceType?: string;
    date?: string;
    time?: string;
    location?: string;
    status?: 'pending' | 'confirmed' | 'cancelled';
  } | null;
  selectedVehicle: string | null;
  bookingDates: {
    startDate: string | null;
    endDate: string | null;
  };
  bookingHistory: Array<{
    id: string;
    serviceType: string;
    date: string;
    time: string;
    location: string;
    status: 'pending' | 'confirmed' | 'cancelled';
  }>;
}

const initialState: BookingState = {
  currentBooking: null,
  selectedVehicle: null,
  bookingDates: {
    startDate: null,
    endDate: null,
  },
  bookingHistory: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedVehicle: (state, action: PayloadAction<string>) => {
      state.selectedVehicle = action.payload;
    },
    setBookingDates: (
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) => {
      state.bookingDates = action.payload;
    },
    setCurrentBooking: (
      state,
      action: PayloadAction<BookingState['currentBooking']>
    ) => {
      state.currentBooking = action.payload;
    },
    addToHistory: (
      state,
      action: PayloadAction<BookingState['bookingHistory'][0]>
    ) => {
      state.bookingHistory.push(action.payload);
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
      state.selectedVehicle = null;
      state.bookingDates = {
        startDate: null,
        endDate: null,
      };
    },
    updateBookingStatus: (
      state,
      action: PayloadAction<{ id: string; status: 'pending' | 'confirmed' | 'cancelled' }>
    ) => {
      const { id, status } = action.payload;
      if (state.currentBooking?.id === id) {
        state.currentBooking.status = status;
      }
      const historyBooking = state.bookingHistory.find(booking => booking.id === id);
      if (historyBooking) {
        historyBooking.status = status;
      }
    },
  },
});

export const {
  setSelectedVehicle,
  setBookingDates,
  setCurrentBooking,
  addToHistory,
  clearCurrentBooking,
  updateBookingStatus,
} = bookingSlice.actions;
export default bookingSlice.reducer;
