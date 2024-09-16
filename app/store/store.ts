// app/store/store.ts
'use client';

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import productsReducer from './productsSlice';
import roleReducer from './roleSlice';
import userDetailsReducer from './userDetailsSlice';
import { combineReducers } from 'redux';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage, // Using localStorage
  whitelist: ['role', 'products'], // Choose which reducers to persist
};

// Combine reducers
const rootReducer = combineReducers({
  products: productsReducer,
  role: roleReducer,
  user:userDetailsReducer

});

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Create the persistor object
export const persistor = persistStore(store);

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
