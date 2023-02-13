import { StyleSheet } from 'react-native'
import COLORS from 'constants/COLORS'

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible'
  },
  btn: {
    padding: 20
  },
  text: {
    fontSize: 25,
    color: COLORS.blue,
    textAlign: 'center'
  },
  description: {
    fontSize: 18,
    color: COLORS.text,
    textAlign: 'center'
  }
})

export default styles
