import { combineReducers } from 'redux'

import CurrenciesReducer from './currencies_reducer'
import ThemeReducer from './theme_reducer'
import NavReducer from './nav_reducer'

export default combineReducers({
  currencies: CurrenciesReducer,
  theme: ThemeReducer,
  nav: NavReducer
})
