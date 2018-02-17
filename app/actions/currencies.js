import {
  SWAP_CURRENCY,
  CHANGE_CURRENCY_AMOUNT,
  CHANGE_BASE_CURRENCY,
  CHANGE_QUOTE_CURRENCY
} from './types'

export const createSwapCurrencyAction = () => ({
  type: SWAP_CURRENCY
})

export const createChangeCurrencyAmountAction = amount => ({
  type: CHANGE_CURRENCY_AMOUNT,
  payload: parseFloat(amount)
})

export const createChangeBaseCurrencyAction = currency => ({
  type: CHANGE_BASE_CURRENCY,
  currency: currency
})

export const createChangeQuoteCurrencyAction = currency => ({
  type: CHANGE_QUOTE_CURRENCY,
  currency: currency
})
