import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

import rootReducer from '../reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const navMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav)

const middleware = []

middleware.push(sagaMiddleware)
middleware.push(navMiddleware)

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middleware))

sagaMiddleware.run(rootSaga)

export default store
