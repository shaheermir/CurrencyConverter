import { combineReducers } from 'redux'
import CurrenciesReducer from './currencies_reducer'
import ThemeReducer from './theme_reducer'

export default combineReducers({
  currencies: CurrenciesReducer,
  theme: ThemeReducer
})
