import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'

import Icon from './Icon'
import Seperator from './Seperator'
import styles from './styles'

const ListItem = ({ text, onPress, selected = false, checkmark = true, visible = true }) => (
  <TouchableOpacity>
    <View style={styles.row}>
      <Text style={styles.text}>{text}</Text>
      {selected ? <Icon checkmark={checkmark} visible={visible} /> : <Icon />}
    </View>
  </TouchableOpacity>
)

ListItem.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
  checkmark: PropTypes.bool,
  visible: PropTypes.bool
}

export default ListItem
