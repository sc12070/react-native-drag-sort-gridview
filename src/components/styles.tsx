import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 0,
    margin: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginEnd: 0,
    marginStart: 0
  },
  dragging: {
    zIndex: 1
  },
  reanimatedWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles
