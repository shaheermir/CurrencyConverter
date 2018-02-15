import React from 'react'
import PropTypes from 'prop-types'
import { StatusBar, KeyboardAvoidingView, Platform } from 'react-native'

import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { InputWithButton } from '../components/TextInput'
import { ClearButton } from '../components/Buttons'
import { LastConverted } from '../components/Text/'
import { Header } from '../components/Header'

const TEMP_BASE_CURRENCY = 'USD'
const TEMP_QUOTE_CURRENCY = 'GBP'

const TEMP_BASE_PRICE = '100'
const TEMP_QUOTE_PRICE = '79.8'

const TEMP_CONVERSION_RATE = 0.797
const TEMP_CONVERSION_DATE = new Date()

class Home extends React.Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Base Currency' })
  }

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency' })
  }

  handleTextChange = text => {
    console.log('input val changed to ' + text)
  }

  handleSwapCurrency = () => {
    console.log('currencies swapped function triggd!=')
  }

  handleOptionsPress = () => {
    this.props.navigation.navigate('Options', { title: 'Options' })
  }

  render () {
    const behavior = {}
    if (Platform.OS === 'ios') {
      behavior.behavior = 'padding'
    }

    return (
      <Container>
        <StatusBar translucent={false} barStyle='light-content' />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView {...behavior}>
          <Logo />
          <InputWithButton
            buttonText={TEMP_BASE_CURRENCY}
            onPress={this.handlePressBaseCurrency}
            defaultValue={TEMP_BASE_PRICE}
            keyboardType='numeric'
            onChangeText={this.handleTextChange}
          />
          <InputWithButton
            buttonText={TEMP_QUOTE_CURRENCY}
            onPress={this.handlePressQuoteCurrency}
            editable={false}
            value={TEMP_QUOTE_PRICE}
          />

          <LastConverted
            base={TEMP_BASE_CURRENCY}
            quote={TEMP_QUOTE_CURRENCY}
            date={TEMP_CONVERSION_DATE}
            conversionRate={TEMP_CONVERSION_RATE}
          />

          <ClearButton text='Reverse Currencies' onPress={this.handleSwapCurrency} />
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

export default Home
