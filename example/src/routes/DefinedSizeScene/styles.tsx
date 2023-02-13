import { StyleSheet } from 'react-native'
import COLORS from 'constants/COLORS'

const styles = StyleSheet.create({
  bg: {
    backgroundColor: COLORS.bg,
    alignItems: 'center'
    //justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    color: COLORS.text
  },
  wrapper: {
    marginTop: 50,
    height: 150,
    borderColor: COLORS.gold,
    borderRadius: 20,
    borderWidth: 3
  },
  scrollView: {
    overflow: 'hidden'
  },
  contentContainer: {
    justifyContent: 'flex-start'
  },
  itemContainer: {
    padding: 15
  }
})

export default styles
