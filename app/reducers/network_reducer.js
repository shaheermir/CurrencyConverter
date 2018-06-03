import { CHANGE_CONNECTION_STATUS } from '../actions/network'

const INITIAL_STATE = {
  connected: false,
  hasChecked: false
}

const isConnected = status => {
  if (status.toLowerCase() === 'none') {
    return false
  }
  return true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_CONNECTION_STATUS:
      return {
        ...state,
        hasChecked: true,
        connected: isConnected(action.status)
      }
    default:
      return state
  }
}
