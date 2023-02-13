import COLORS from 'constants/COLORS'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 40,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { width: 1, height: 5 },
    elevation: 20
  },
  text: {
    fontSize: 20,
    color: COLORS.text
  }
})

export default styles
