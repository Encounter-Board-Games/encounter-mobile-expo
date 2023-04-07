import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  products: () => import('./reducers/product'),
  shelves: () => import('./reducers/shelves'),
  filters: () => import('./reducers/filters'),
  user: () => import('./reducers/user'),
  info: () => import('./reducers/info'),
  onboarding: () => import('./reducers/onboarding'),
  cart: () => import('./reducers/cart'),
  notification: () => import('./reducers/notification'),
  payments: () => import('./reducers/payments'),
  orders: () => import('./reducers/orders'),
  discovery: () => import('./reducers/discovery'),
  app: () => import('./reducers/app'),
  address: () => import('./reducers/address'),
  cupons: () => import('./reducers/cupons'),
  quickSearchs: () => import('./reducers/quickSearch'),
});

const store = configureStore({
  reducer: async (state, action) => {
    const asyncReducers = await Promise.all(
      Object.keys(state).reduce((acc, key) => {
        if (typeof rootReducer[key] === 'function') {
          acc.push(
            rootReducer[key]()
              .then((module) => [key, module.default])
              .catch(() => [key, (s) => s])
          );
        }
        return acc;
      }, [])
    );
    return combineReducers(
      asyncReducers.reduce((acc, [key, reducer]) => {
        acc[key] = reducer;
        return acc;
      }, {})
    )(state, action);
  },
});

export default store;
