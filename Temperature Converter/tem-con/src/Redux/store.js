import { configureStore } from '@reduxjs/toolkit';
import tempReducer from './Temperature/tempSlice'

export const store = configureStore({
  reducer: {
    temp: tempReducer,
  },
});
