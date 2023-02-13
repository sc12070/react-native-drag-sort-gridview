import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type StackParamList = {
  Home: undefined
  Simplest: undefined
  Usage: undefined
  'Defined Size': undefined
  'Fixed item width': undefined
  'Dynamic item width': undefined
}

export const Stack = createNativeStackNavigator<StackParamList>()
