import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, TouchableHighlight } from 'react-native'
import color from 'color'

import styles from './styles'

const InputWithButton = props => {
  const { buttonText, onPress, editable = true, textColor } = props

  const underlayColor = color(styles.$buttonBackgroundColorBase).darken(
    styles.$buttonBackgroundColorModifier
  )

  const containerStyles = [styles.container]
  if (editable === false) {
    containerStyles.push(styles.containerDisabled)
  }

  const buttonTextStyles = [styles.buttonText]
  if (textColor) {
    buttonTextStyles.push({ color: textColor })
  }

  return (
    <View style={containerStyles}>
      <TouchableHighlight
        underlayColor={underlayColor}
        onPress={onPress}
        style={styles.buttonContainer}
      >
        <Text style={buttonTextStyles}>{buttonText}</Text>
      </TouchableHighlight>

      <View style={styles.border} />

      <TextInput style={styles.input} {...props} />
    </View>
  )
}

InputWithButton.propTypes = {
  buttonText: PropTypes.string,
  onPress: PropTypes.func,
  editable: PropTypes.bool,
  textColor: PropTypes.string
}

export default InputWithButton
