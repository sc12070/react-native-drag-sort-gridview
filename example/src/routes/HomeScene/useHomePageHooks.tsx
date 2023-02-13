import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback } from 'react'

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const toSimplestScene = useCallback(() => {
    navigation.navigate('Simplest')
  }, [navigation])

  const toUsageScene = useCallback(() => {
    navigation.navigate('Usage')
  }, [navigation])

  const toDefinedSizeScene = useCallback(() => {
    navigation.navigate('Defined Size')
  }, [navigation])

  const toFixedItemWidthScene = useCallback(() => {
    navigation.navigate('Fixed item width')
  }, [navigation])

  const toDynamicItemWidthScene = useCallback(() => {
    navigation.navigate('Dynamic item width')
  }, [navigation])

  return {
    toSimplestScene,
    toUsageScene,
    toDefinedSizeScene,
    toFixedItemWidthScene,
    toDynamicItemWidthScene
  }
}
