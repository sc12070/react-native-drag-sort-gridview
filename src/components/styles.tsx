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
		marginStart: 0,
	},
	dragging: {
		zIndex: 1
	},
	reanimatedWrapper: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	close: {
		position: 'absolute',
		zIndex: 2,
		right: 0,
		padding: 10,
		width: 30,
		height: 30,
		backgroundColor: '#ffe6e2',
		borderRadius: 4,
		overflow: 'hidden',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		top: 0,
	},
	icon: {
        resizeMode: 'stretch',
        width: 20,
        height: 20,
    },
})

export default styles
