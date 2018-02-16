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

const TEMP_CURRENT_CURRENCY = 'CAD'

class CurrencyList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    changeBaseCurrency: PropTypes.func,
    changeQuoteCurrency: PropTypes.func
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

  renderItem = ({ item }) => (
    <ListItem
      text={item}
      selected={item === TEMP_CURRENT_CURRENCY}
      onPress={() => this.handlePress(item)}
    />
  )

  render () {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='default' translucent={false} />
        <FlatList
          data={currencies}
          renderItem={this.renderItem}
          keyExtractor={item => item}
          ItemSeparatorComponent={Seperator}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  changeBaseCurrency: currency => dispatch(createChangeBaseCurrencyAction(currency)),
  changeQuoteCurrency: currency => dispatch(createChangeQuoteCurrencyAction(currency))
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList)
