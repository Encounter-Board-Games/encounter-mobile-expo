import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import product from './reducers/product';
import shelves from './reducers/shelves';
import filters from './reducers/filters';
// import other reducers

const rootReducer = combineReducers({
  users: userReducer,
  products: product,
  shelves: shelves,
  filters: filters,
  // other reducers
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
