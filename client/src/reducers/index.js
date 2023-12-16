import { combineReducers } from 'redux'

import invoices from './invoices'
import auth from './auth'
import profiles from './profiles'

export default combineReducers({ invoices,  auth, profiles })