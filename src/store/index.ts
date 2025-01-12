import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import bookingReducer from './features/booking/bookingSlice';
import vehicleReducer from './features/vehicle/vehicleSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    vehicle: vehicleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
