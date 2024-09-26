 // store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // Use default middleware without manually adding thunk
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(), // or add more middleware like `.concat(otherMiddleware)`
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

