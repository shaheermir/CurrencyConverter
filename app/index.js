import React from 'react'
import { PropTypes } from 'prop-types'
import { Provider, connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import { addNavigationHelpers } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { PersistGate } from 'redux-persist/es/integration/react'

import { AlertProvider } from './components/Alert'
import Navigator from './config/routes'

import configStore from './config/store'

EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $primaryOrange: '#D57A66',
  $primaryGreen: '#00BD9D',
  $primaryPurple: '#9E768F',

  $white: '#FFFFFF',
  $border: '#E2E2E2',
  $inputText: '#797979',
  $lightGray: '#F0F0F0',
  $darkText: '#343434'
})

const addListener = createReduxBoundAddListener('root')

const App = ({ dispatch, nav }) => (
  <Navigator
    navigation={addNavigationHelpers({
      dispatch,
      state: nav,
      addListener
    })}
  />
)

App.propTypes = {
  dispatch: PropTypes.func,
  nav: PropTypes.object
}

const mapStateToProps = state => ({
  nav: state.nav
})

const AppWithNavigation = connect(mapStateToProps)(App)

export default class RPApp extends React.Component {
  constructor (props) {
    super(props)
    const { store, persistor } = configStore()
    this.state = {
      store,
      persistor
    }
  }

  render () {
    return (
      <Provider store={this.state.store}>
        <PersistGate persistor={this.state.persistor}>
          <AlertProvider>
            <AppWithNavigation />
          </AlertProvider>
        </PersistGate>
      </Provider>
    )
  }
}
