import React, { memo } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const Item = ({ string }: { string: string }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{string}</Text>
    </View>
  )
}

export default memo(Item)
