import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Keyboard, Animated, Platform, StyleSheet } from 'react-native'

import styles from './styles'

const ANIMATION_DURATION = 200

class Logo extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      containerImageWidth: new Animated.Value(styles.$largeContainerSize),
      imageWidth: new Animated.Value(styles.$largeImageSize)
    }
  }

  componentDidMount () {
    const showListener = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideListener = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    this.keyboardDidShowListener = Keyboard.addListener(showListener, this.keyboardWillShow)
    this.keyboardDidHideListener = Keyboard.addListener(hideListener, this.keyboardWillHide)
  }

  componentWillUnmount () {
    this.keyboardShowListener.remove()
    this.keyboardHideListender.remove()
  }

  keyboardWillShow = () => {
    Animated.parallel([
      Animated.timing(this.state.containerImageWidth, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(this.state.imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION
      })
    ]).start()
  }

  keyboardWillHide = () => {
    Animated.parallel([
      Animated.timing(this.state.containerImageWidth, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(this.state.imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION
      })
    ]).start()
  }

  render () {
    const containerImageStyle = [
      styles.containerImage,
      {
        width: this.state.containerImageWidth,
        height: this.state.containerImageWidth
      }
    ]

    const imageStyle = [
      styles.logo,
      { width: this.state.imageWidth },
      this.props.tintColor ? { tintColor: this.props.tintColor } : null
    ]

    return (
      <View style={styles.container}>
        <Animated.View style={containerImageStyle}>
          <Animated.Image
            source={require('./images/background.png')}
            style={[StyleSheet.absoluteFill, containerImageStyle]}
            resizeMode='contain'
          />
          <Animated.Image
            source={require('./images/logo.png')}
            style={imageStyle}
            resizeMode='contain'
          />
        </Animated.View>
        <Text style={styles.text}>Currency Converter</Text>
      </View>
    )
  }
}

Logo.propTypes = {
  tintColor: PropTypes.string
}

export default Logo
