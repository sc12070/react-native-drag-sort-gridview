import React from 'react'
import DraggableGridView from 'react-native-drag-sort-gridview'
import { Text, TouchableOpacity, View } from 'react-native'
import Item from './components/Item'
import { IItem } from './modal'
import styles from './styles'
import useDynamicItemWidthPageHooks from './useDynamicItemWidthPageHooks'

const DynamicItemWidthPage = () => {
  const { data, noColums, itemWidth, itemHeight, minusItemWidth, plusItemWidth, onOrderChanged } =
    useDynamicItemWidthPageHooks()

  const renderItem = ({ item }: { item: IItem }) => {
    return <Item item={item} itemWidth={itemWidth} />
  }

  return (
    <View style={styles.bg}>
      <View style={styles.btnWrapper}>
        <TouchableOpacity onPress={minusItemWidth}>
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{itemWidth}</Text>
        <TouchableOpacity onPress={plusItemWidth}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View>
      <DraggableGridView
        contentContainerStyle={styles.contentContainer}
        itemContainerStyle={styles.itemContainer}
        isEditing={true}
        numColumns={noColums}
        itemHeight={itemHeight}
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
