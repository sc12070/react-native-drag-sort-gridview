import React, { memo } from 'react'
import { View } from 'react-native'
import { IItem } from '../modal'

const Item = ({ item, componentSize }: { item: IItem; componentSize: number }) => {
  return (
    <View style={{ width: componentSize, height: componentSize, backgroundColor: item.color }} />
  )
}

export default memo(Item)
