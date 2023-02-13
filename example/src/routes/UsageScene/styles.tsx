import { StyleSheet } from 'react-native'
import COLORS from 'constants/COLORS'

const styles = StyleSheet.create({
  bg: {
    overflow: 'visible',
    backgroundColor: COLORS.bg
  },
  btn: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    margin: 10,
    height: 50,
    padding: 0,
    borderRadius: 25,
    backgroundColor: COLORS.dimGray,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  text: {
    fontSize: 20,
    fontWeight: '900',
    color: 'white'
  },
  contentContainer: {
    justifyContent: 'flex-start',
    paddingTop: 60
  },
  itemContainer: {
    padding: 10
  }
})

export default styles
