import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, FlatList, StatusBar } from 'react-native'

import { ListItem, Seperator } from '../components/List'
import currencies from '../data/currencies'

import {
  createChangeBaseCurrencyAction,
  createChangeQuoteCurrencyAction
} from '../actions/currencies'

class CurrencyList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    changeBaseCurrency: PropTypes.func,
    changeQuoteCurrency: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    primaryColor: PropTypes.string
  }

  handlePress = currency => {
    const { type } = this.props.navigation.state.params
    if (type === 'base') {
      this.props.changeBaseCurrency(currency)
    } else if (type === 'quote') {
      this.props.changeQuoteCurrency(currency)
    }
    this.props.navigation.goBack(null)
  }

  renderItem = ({ item }, comparisonCurrency) => (
    <ListItem
      text={item}
      selected={item === comparisonCurrency}
      onPress={() => this.handlePress(item)}
      iconBackground={this.props.primaryColor}
    />
  )

  render () {
    let comparisonCurrency = this.props.baseCurrency

    if (this.props.navigation.state.params.type === 'quote') {
      comparisonCurrency = this.props.quoteCurrency
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='default' translucent={false} />
        <FlatList
          data={currencies}
          renderItem={item => this.renderItem(item, comparisonCurrency)}
          keyExtractor={item => item}
          ItemSeparatorComponent={Seperator}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  baseCurrency: state.currencies.baseCurrency,
  quoteCurrency: state.currencies.quoteCurrency,
  primaryColor: state.theme.primaryColor
})

const mapDispatchToProps = dispatch => ({
  changeBaseCurrency: currency => dispatch(createChangeBaseCurrencyAction(currency)),
  changeQuoteCurrency: currency => dispatch(createChangeQuoteCurrencyAction(currency))
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList)
