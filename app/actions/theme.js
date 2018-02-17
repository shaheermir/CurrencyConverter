import { CHANGE_PRIMARY_COLOR } from './types'

export const createChangePrimaryColorAction = color => ({
  type: CHANGE_PRIMARY_COLOR,
  payload: color
})
