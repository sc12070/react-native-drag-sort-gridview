import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type StackParamList = {
  Home: undefined
  Simplest: undefined
  'Defined Size': undefined
}

export const Stack = createNativeStackNavigator<StackParamList>()
