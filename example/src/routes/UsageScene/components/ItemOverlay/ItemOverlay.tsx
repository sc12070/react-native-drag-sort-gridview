import React, { memo } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import useItemOverlayHooks from './useItemOverlayHooks'

const Item = ({ index, onDelPress }: { index: number; onDelPress: (index: number) => void }) => {
  const { onPress } = useItemOverlayHooks({ index, onDelPress })

  return (
    <TouchableOpacity style={styles.delBtn} onPress={onPress}>
      <Text style={styles.text}>X</Text>
    </TouchableOpacity>
  )
}

export default memo(Item)
