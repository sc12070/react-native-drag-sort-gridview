import { StyleSheet } from 'react-native'
import COLORS from 'constants/COLORS'

const styles = StyleSheet.create({
  bg: {
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
  gridView: {
    overflow: 'hidden'
  },
  contentContainer: {
    justifyContent: 'flex-start',
    overflow: 'hidden'
  },
  itemContainer: {
    padding: 10 // minimunPadding / 2
  }
})

export default styles
