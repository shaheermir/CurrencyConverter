import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import styles from './styles'

const ClearButton = ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.wrapper}>
      <Image
        style={styles.icon}
        resizeMode='contain'
        source={require('./images/icon.png')}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
)

ClearButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func
}

export default ClearButton
