import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const Header = ({ onPress, onWarningPress, connected }) => (
  <View style={styles.container}>
    {!connected ? (
      <TouchableOpacity onPress={onWarningPress} style={styles.button}>
        <Image
          source={require('./images/warning.png')}
          resizeMode='contain'
          style={styles.icon}
        />
      </TouchableOpacity>
    ) : null}
    <TouchableOpacity onPress={onPress} style={[styles.button, styles.buttonRight]}>
      <Image source={require('./images/gear.png')} resizeMode='contain' style={styles.icon} />
    </TouchableOpacity>
  </View>
)

Header.propTypes = {
  connected: PropTypes.bool,
  onPress: PropTypes.func,
  onWarningPress: PropTypes.func
}

export default Header
