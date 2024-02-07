import { combineReducers } from 'redux'

import products from './product'
import shelves from './shelves'
import filters from './filters'
import userReducer from './userReducer'
import info from './info'
import onboarding from './onboarding'
import cart from './cart'
import notification from './notification'
import payments from './payments'
import orders from './orders'
import discovery from './discovery'
import app from './app'
import address from './address'
import cupons from './cupons'
import quickSearchs from './quickSearch'

export default combineReducers({
    products,
    shelves,
    filters,
    userReducer,
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
    quickSearchs
})