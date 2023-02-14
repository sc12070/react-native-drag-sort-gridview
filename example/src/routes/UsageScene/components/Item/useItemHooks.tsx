import { useCallback } from 'react'
import { IItem } from '../../modal'

export default ({
  item,
  onItemPress
}: {
  item: IItem
  onItemPress?: (memberInfo: IItem) => void
}) => {
  const onPress = useCallback(() => onItemPress && onItemPress(item), [item, onItemPress])

  return {
    onPress
  }
}
