import React, { memo } from 'react'
import { View } from 'react-native'
import { IItem } from '../modal'

const Item = ({ item, itemWidth }: { item: IItem; itemWidth: number }) => {
  return <View style={{ width: itemWidth, height: itemWidth, backgroundColor: item.color }} />
}

export default memo(Item)
