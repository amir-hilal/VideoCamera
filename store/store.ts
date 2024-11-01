import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './videoSlice';

const store = configureStore({
  reducer: {
    videos: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
