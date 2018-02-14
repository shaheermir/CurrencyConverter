import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 25
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 19,
    marginRight: 11
  },
  text: {
    color: '$white',
    fontSize: 14,
    fontWeight: '300'
  }
})

export default styles
