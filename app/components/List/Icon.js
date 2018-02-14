import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'

import styles from './styles'

const Icon = ({ checkmark, visible }) => {
  const iconStyles = [styles.icon]

  if (visible) {
    console.log('visble is tru')
    iconStyles.push(styles.iconVisible)
  }

  return (
    <View style={iconStyles}>
      {checkmark ? (
        <Image
          style={styles.checkIcon}
          source={require('./images/check.png')}
          resizeMode='contain'
        />
      ) : null}
    </View>
  )
}

Icon.propTypes = {
  checkmark: PropTypes.bool,
  visible: PropTypes.bool
}

export default Icon
