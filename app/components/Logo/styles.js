import { Dimensions } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const imageWidth = Dimensions.get('window').width / 2

const styles = EStyleSheet.create({
  $largeContainerSize: imageWidth,
  $largeImageSize: imageWidth / 2,

  $smallContainerSize: imageWidth / 1.5,
  $smallImageSize: imageWidth / 3,

  container: {
    alignItems: 'center'
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '$largeContainerSize',
    height: '$largeContainerSize'
  },
  logo: {
    width: '$largeImageSize',
    tintColor: '$primaryBlue'
  },
  text: {
    color: '$white',
    fontSize: 28,
    letterSpacing: -0.5,
    marginTop: 15,
    fontWeight: '600'
  }
})

export default styles
