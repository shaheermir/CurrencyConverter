import React from 'react'
import PropTypes from 'prop-types'
import EStyleSheet from 'react-native-extended-stylesheet'
import { ScrollView, StatusBar } from 'react-native'

import { ListItem, Seperator } from '../components/List'

const styles = EStyleSheet.create({
  $blue: '$primaryBlue',
  $orange: '$primaryOrange',
  $green: '$primaryGreen',
  $purple: '$primaryPurple'
})

class Themes extends React.Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  handleThemePress = color => {
    console.log(`You picked theme color ${color}`)
    this.props.navigation.goBack(null)
  }

  render () {
    const { $blue, $orange, $green, $purple } = styles
    return (
      <ScrollView>
        <StatusBar barStyle='default' translucent={false} />
        <ListItem
          text='Blue'
          onPress={() => this.handleThemePress($blue)}
          selected
          checkmark={false}
          iconBackground={$blue}
        />
        <Seperator />
        <ListItem
          text='Orange'
          onPress={() => this.handleThemePress($orange)}
          selected
          checkmark={false}
          iconBackground={$orange}
        />
        <Seperator />
        <ListItem
          text='Green'
          onPress={() => this.handleThemePress($green)}
          selected
          checkmark={false}
          iconBackground={$green}
        />
        <Seperator />
        <ListItem
          text='Purple'
          onPress={() => this.handleThemePress($purple)}
          selected
          checkmark={false}
          iconBackground={$purple}
        />
        <Seperator />
      </ScrollView>
    )
  }
}

export default Themes
