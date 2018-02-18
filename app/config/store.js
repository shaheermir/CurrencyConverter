import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

import rootReducer from '../reducers'

const navMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav)

const middleware = []
middleware.push(navMiddleware)

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store
