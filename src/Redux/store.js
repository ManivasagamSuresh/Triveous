import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice" ;
import articleReducer from "./articleSlice"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

// import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({ user: userReducer,article:articleReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     article: articleReducer
//   },
// })