import { combineReducers } from 'redux'
import CurrenciesReducer from './currencies_reducer'

export default combineReducers({
  currencies: CurrenciesReducer
})
