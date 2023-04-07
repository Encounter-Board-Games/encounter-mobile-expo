import { combineReducers } from 'redux'
// import { reducer as i18n } from 'react-native-redux-i18n'

import products from './reducers/product'
import shelves from './reducers/shelves'
import filters from './reducers/filters'
import user from './reducers/user'
import info from './reducers/info'
import onboarding from './reducers/onboarding'
import cart from './reducers/cart'
import notification from './reducers/notification'
import payments from './reducers/payments'
import orders from './reducers/orders'
import discovery from './reducers/discovery'
import app from './reducers/app'
import address from './reducers/address'
import cupons from './reducers/cupons'
import quickSearchs from './reducers/quickSearch'

export default combineReducers({
    products,
    shelves,
    filters,
    user,
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
    // i18n
})