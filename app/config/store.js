import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

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

const configStore = () => {
  const persistReducer = persistCombineReducers(
    {
      key: 'root',
      storage,
      blacklist: ['network']
    },
    rootReducer
  )

  const store = createStore(persistReducer, applyMiddleware(...middleware))
  const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)
  return { store, persistor }
}

export default configStore
