import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback } from 'react'

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const toSimplestScene = useCallback(() => {
    navigation.navigate('Simplest')
  }, [navigation])

  const toDefinedSizeScene = useCallback(() => {
    navigation.navigate('Defined Size')
  }, [navigation])

  return {
    toSimplestScene,
    toDefinedSizeScene
  }
}
