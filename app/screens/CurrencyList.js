import React from 'react'
import { View, FlatList, StatusBar } from 'react-native'

import { ListItem, Seperator } from '../components/List'
import currencies from '../data/currencies'

const TEMP_CURRENT_CURRENCY = 'CAD'

class CurrencyList extends React.Component {
  handlePress = () => {
    console.log('currency select func trigd!')
  }

  renderItem = ({ item }) => (
    <ListItem
      text={item}
      selected={item === TEMP_CURRENT_CURRENCY}
      onPress={this.handlePress}
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

export default CurrencyList
