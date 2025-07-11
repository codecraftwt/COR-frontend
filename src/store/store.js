import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import signupReducer from './signupSlice';
import draftsReducer from './draftsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
  signup: signupReducer,
  drafts: draftsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['signup'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
