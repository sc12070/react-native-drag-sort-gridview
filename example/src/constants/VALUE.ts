import { Dimensions } from 'react-native'

// height in android would be affected by soft menu bar
export const screenWidth = Dimensions.get('window').width

export const itemSize = screenWidth / 3

export const iconWidth = itemSize - 20

export const animMoveDuration = 500
