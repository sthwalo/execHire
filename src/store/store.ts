import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from './features/vehicle/vehicleSlice';
import authReducer from './features/auth/authSlice';
import bookingReducer from './features/booking/bookingSlice';

export const store = configureStore({
  reducer: {
    vehicle: vehicleReducer,
    auth: authReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
