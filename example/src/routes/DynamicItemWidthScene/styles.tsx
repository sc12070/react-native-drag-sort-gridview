import { StyleSheet } from 'react-native'
import COLORS from 'constants/COLORS'

const styles = StyleSheet.create({
  bg: {
    overflow: 'visible',
    backgroundColor: COLORS.bg,
    paddingBottom: 80
  },
  btnWrapper: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center'
  },
  text: {
    paddingHorizontal: 10,
    fontSize: 30
  },
  contentContainer: {
    justifyContent: 'flex-start'
  },
  itemContainer: {
    padding: 10
  }
})

export default styles
