// import { NavigationActions } from 'react-navigation'
import Navigator from '../config/routes'

// const INITIAL_STATE = Navigator.router.getStateForAction(NavigationActions.init())
const INITIAL_STATE = Navigator.router.getStateForAction(
  Navigator.router.getActionForPathAndParams('Home')
)

const reducer = (state = INITIAL_STATE, action) => {
  const nextState = Navigator.router.getStateForAction(action, state)
  return nextState || state
}

export default reducer
