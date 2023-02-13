import { StyleSheet } from 'react-native'
import COLORS from 'constants/COLORS'

const styles = StyleSheet.create({
  bg: {
    overflow: 'visible',
    backgroundColor: COLORS.bg
  },
  contentContainer: {
    justifyContent: 'flex-start'
  },
  itemContainer: {
    padding: 10
  }
})

export default styles
