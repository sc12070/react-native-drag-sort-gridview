import React, { memo } from 'react'
import { View } from 'react-native'
import { IItem } from '../modal'
import styles from './styles'

const Item = ({ item }: { item: IItem }) => {
  return <View style={[styles.item, { backgroundColor: item.color }]} />
}

export default memo(Item)
