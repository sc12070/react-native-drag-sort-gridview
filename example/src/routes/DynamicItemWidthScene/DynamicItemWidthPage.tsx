import React from 'react'
import DraggableGridView from 'react-native-drag-sort-gridview'
import { Text, TouchableOpacity, View } from 'react-native'
import Item from './components/Item'
import { IItem } from './modal'
import styles from './styles'
import useDynamicItemWidthPageHooks from './useDynamicItemWidthPageHooks'

const DynamicItemWidthPage = () => {
  const {
    data,
    noColums,
    componentSize,
    itemSize,
    paddingVertical,
    paddingHorizontal,
    plusWidth,
    minusWidth,
    onOrderChanged
  } = useDynamicItemWidthPageHooks()

  const renderItem = ({ item }: { item: IItem }) => {
    return <Item item={item} componentSize={componentSize} />
  }

  return (
    <View style={styles.bg}>
      <View style={styles.btnWrapper}>
        <TouchableOpacity onPress={minusWidth}>
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{componentSize}</Text>
        <TouchableOpacity onPress={plusWidth}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View>
      <DraggableGridView
        contentContainerStyle={styles.contentContainer}
        itemContainerStyle={{ paddingVertical, paddingHorizontal }}
        isEditing={true}
        numColumns={noColums}
        itemHeight={itemSize}
        data={data}
        shouldAnimOnRelease={true}
        keyExtractor={({ id }) => `${id}`}
        onOrderChanged={onOrderChanged}
        renderItem={renderItem}
      />
    </View>
  )
}

export default DynamicItemWidthPage
