import { CHANGE_PRIMARY_COLOR } from '../actions/types'

const INITIAL_STATE = {
  primaryColor: '#4F6D7A'
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_PRIMARY_COLOR:
      return { ...state, primaryColor: action.payload }
    default:
      return state
  }
}

export default reducer
