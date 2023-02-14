import { useCallback } from 'react'

export default ({ index, onDelPress }: { index: number; onDelPress: (index: number) => void }) => {
  const onPress = useCallback(() => onDelPress(index), [index, onDelPress])

  return {
    onPress
  }
}
