// rootState.ts
import { combineReducers } from 'redux';
import products from './productReducer';
import shelves from './shelvesReducer';
import filters from './filtersReducer';
import userReducer from './userReducer';
import info from './infoReducer';
import onboarding from './onboardingReducer';
import cart from './cartReducer';
import notification from './notificationReducer';
import payments from './paymentsReducer';
import orders from './ordersReducer';
import discovery from './discoveryReducer';
import app from './appReducer';
import address from './addressReducer';
import cupons from './cuponsReducer';
import quickSearchs from './quickSearchReducer';

export const rootReducer = combineReducers({
  products,
  shelves,
  filters,
  users: userReducer,
  info,
  onboarding,
  cart,
  notification,
  payments,
  orders,
  app,
  discovery,
  address,
  cupons,
  quickSearchs,
});

export type RootState = ReturnType<typeof rootReducer>;
