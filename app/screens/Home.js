import React from 'react'
import { StatusBar, KeyboardAvoidingView } from 'react-native'

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
  handlePressBaseCurrency = () => {
    console.log('u pressed base currency')
  }

  handlePressQuoteCurrency = () => {
    console.log('u pressed quote currency')
  }

  handleTextChange = text => {
    console.log('input val changed to ' + text)
  }

  handleSwapCurrency = () => {
    console.log('currencies swapped function triggd!=')
  }

  handleOptionsPress = () => {
    console.log('options gear clicked!!')
  }

  render () {
    return (
      <Container>
        <StatusBar translucent={false} barStyle='light-content' />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior='padding'>
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

          <ClearButton
            text='Reverse Currencies'
            onPress={this.handleSwapCurrency}
          />
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

export default Home
