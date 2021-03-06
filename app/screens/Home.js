import React from 'react'
import PropTypes from 'prop-types'
import { StatusBar, KeyboardAvoidingView, Platform, NetInfo } from 'react-native'
import { connect } from 'react-redux'
import { connectAlert } from '../components/Alert'

import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { InputWithButton } from '../components/TextInput'
import { ClearButton } from '../components/Buttons'
import { LastConverted } from '../components/Text/'
import { Header } from '../components/Header'

import {
  createSwapCurrencyAction,
  createChangeCurrencyAmountAction,
  createGetInitialConversionAction
} from '../actions/currencies'

import { changeNetworkStatus } from '../actions/network'

class Home extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    quoteCurrency: PropTypes.string,
    baseCurrency: PropTypes.string,
    amount: PropTypes.number,
    updateCurrencyAmount: PropTypes.func,
    swapCurrency: PropTypes.func,
    conversionRate: PropTypes.number,
    isFetching: PropTypes.bool,
    lastConveretedDate: PropTypes.object,
    primaryColor: PropTypes.string,
    getIntialConversion: PropTypes.func,
    alertWithType: PropTypes.func,
    currencyError: PropTypes.string,
    changeNetworkStatus: PropTypes.func,
    connected: PropTypes.bool
  }

  componentWillMount () {
    this.props.getIntialConversion()
    NetInfo.addEventListener('connectionChange', this.handleNetworkChange)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currencyError && nextProps.currencyError !== this.props.currencyError) {
      this.props.alertWithType('error', 'Error', nextProps.currencyError)
    }
  }

  componentWillUnmount () {
    NetInfo.removeEventListener('connectionChange', this.handleNetworkChange)
  }

  handleNetworkChange = status => {
    this.props.changeNetworkStatus(status.type)
  }

  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' })
  }

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote' })
  }

  handleAmountChange = amount => {
    this.props.updateCurrencyAmount(amount)
  }

  handleSwapCurrency = () => {
    this.props.swapCurrency()
  }

  handleOptionsPress = () => {
    this.props.navigation.navigate('Options', { title: 'Options' })
  }

  handleDisconnectedPress = () => {
    this.props.alertWithType(
      'warn',
      'No connection',
      'Not connected to the internet - some features may not work.'
    )
  }

  render () {
    const behavior = {}
    if (Platform.OS === 'ios') {
      behavior.behavior = 'padding'
    }

    let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2)

    if (this.props.isFetching) {
      quotePrice = '...'
    }

    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar translucent={false} barStyle='light-content' />
        <Header
          onPress={this.handleOptionsPress}
          onWarningPress={this.handleDisconnectedPress}
          connected={this.props.connected}
        />
        <KeyboardAvoidingView {...behavior}>
          <Logo tintColor={this.props.primaryColor} />
          <InputWithButton
            buttonText={this.props.baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={this.props.amount.toString()}
            keyboardType='numeric'
            onChangeText={this.handleAmountChange}
            textColor={this.props.primaryColor}
          />
          <InputWithButton
            editable={false}
            buttonText={this.props.quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            value={quotePrice}
            textColor={this.props.primaryColor}
          />

          <LastConverted
            base={this.props.baseCurrency}
            quote={this.props.quoteCurrency}
            date={this.props.lastConveretedDate}
            conversionRate={this.props.conversionRate}
          />

          <ClearButton text='Reverse Currencies' onPress={this.handleSwapCurrency} />
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { baseCurrency, quoteCurrency, amount } = state.currencies
  const { connected } = state.network

  const conversionSelector = state.currencies.conversions[baseCurrency] || {}
  const rates = conversionSelector.rates || {}

  return {
    baseCurrency,
    quoteCurrency,
    amount,
    conversionRate: rates[quoteCurrency] || 0,
    conversionDate: conversionSelector.date,
    isFetching: conversionSelector.isFetching,
    lastConveretedDate: conversionSelector.date
      ? new Date(conversionSelector.date)
      : new Date(),
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
    connected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    swapCurrency: () => {
      return dispatch(createSwapCurrencyAction())
    },
    updateCurrencyAmount: amount => dispatch(createChangeCurrencyAmountAction(amount)),
    getIntialConversion: () => dispatch(createGetInitialConversionAction()),
    changeNetworkStatus: info => dispatch(changeNetworkStatus(info))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectAlert(Home))
