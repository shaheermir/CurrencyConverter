import React from 'react'
import PropTypes from 'prop-types'
import { StatusBar, KeyboardAvoidingView, Platform } from 'react-native'
import { connect } from 'react-redux'

import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { InputWithButton } from '../components/TextInput'
import { ClearButton } from '../components/Buttons'
import { LastConverted } from '../components/Text/'
import { Header } from '../components/Header'

import {
  createSwapCurrencyAction,
  createChangeCurrencyAmountAction,
  createChangeBaseCurrencyAction,
  createChangeQuoteCurrencyAction
} from '../actions/currencies'

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
    lastConveretedDate: PropTypes.object
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
      <Container>
        <StatusBar translucent={false} barStyle='light-content' />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView {...behavior}>
          <Logo />
          <InputWithButton
            buttonText={this.props.baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={this.props.amount.toString()}
            keyboardType='numeric'
            onChangeText={this.handleAmountChange}
          />
          <InputWithButton
            editable={false}
            buttonText={this.props.quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            value={quotePrice}
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
      : new Date()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    swapCurrency: () => {
      return dispatch(createSwapCurrencyAction())
    },
    updateCurrencyAmount: amount => dispatch(createChangeCurrencyAmountAction(amount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
