import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import bookingReducer from './features/booking/bookingSlice';
import vehicleReducer from './features/vehicle/vehicleSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
  vehicle: vehicleReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['booking/setDates'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.startDate', 'payload.endDate'],
        // Ignore these paths in the state
        ignoredPaths: ['booking.selectedDates'],
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
