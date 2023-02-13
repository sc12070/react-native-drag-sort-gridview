import { Appearance } from 'react-native'

/*
 * Condition __DEV__ is added because
 * Appearance.getColorScheme() cannot return correct value
 * if debug in chrome is turned on
 */
const isDark = Appearance.getColorScheme() === 'dark'

const lightGreen = '#AAF055'
const green = '#55DD55'
const dimGreen = '#117711'
const red = '#D44'
const blue = '#2BF'
const yellow = '#E8E822'
const gold = '#E1AC30'

const lightGray = '#F5F5F5'
const gray = '#BBB'
const dimGray = '#888'
const darkGray = '#444'
const transBlack = '#0007'

const theme = isDark ? '#2AE' : blue
const bg = isDark ? 'black' : lightGray
const shadow = isDark ? darkGray : gray
const text = isDark ? '#DDD' : 'black'
const subText = isDark ? gray : dimGray
const inputBg = isDark ? '#222' : 'white'
const inactive = isDark ? dimGray : darkGray

export default {
  isDark,

  theme,
  bg,
  shadow,
  text,
  subText,
  inputBg,
  inactive,

  lightGreen,
  dimGreen,
  green,
  red,
  blue,
  yellow,
  gold,

  lightGray,
  gray,
  dimGray,
  darkGray,
  transBlack
}
