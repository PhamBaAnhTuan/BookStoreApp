import { createStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import storage from 'redux-persist/lib/storage'
import { thunk } from 'redux-thunk';

import authReducer from '../slice/authSlice';

const persistConfig = {
   key: 'root',
   storage: AsyncStorage
};

const rootReducer = combineReducers({
   auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;