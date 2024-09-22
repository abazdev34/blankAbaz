import { configureStore } from '@reduxjs/toolkit';
import plovReducer from './plovSlice';

export const store = configureStore({
  reducer: {
    plov: plovReducer,
  },
});