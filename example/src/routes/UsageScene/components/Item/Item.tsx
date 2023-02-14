import React, { memo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { IItem } from '../../modal'
import styles from './styles'
import useItemHooks from './useItemHooks'

const Item = ({
  item,
  onItemPress,
  onItemLongPress
}: {
  item: IItem
  onItemPress?: (itemInfo: IItem) => void
  onItemLongPress?: () => void
}) => {
  const { onPress } = useItemHooks({ item, onItemPress })

  return (
    <TouchableOpacity style={styles.itemWrapper} onPress={onPress} onLongPress={onItemLongPress}>
      <View style={[styles.item, { backgroundColor: item.color }]} />
    </TouchableOpacity>
  )
}

export default memo(Item)
