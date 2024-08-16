import { configureStore } from '@reduxjs/toolkit';
import repoSearchReducer from '../features/repoSearch/repoSearchSlice';

export const store = configureStore({
  reducer: {
    repoSearch: repoSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
