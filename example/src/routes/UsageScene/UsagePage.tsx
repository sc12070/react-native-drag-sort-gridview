import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import DraggableGridView from 'react-native-drag-sort-gridview'
import Item from './components/Item'
import { IItem } from './modal'
import styles from './styles'
import useUsagePageHooks from './useUsagePageHooks'

const UsagePage = () => {
  const { isEditing, selectedItem, data, startEdit, stopEdit, onItemPress, onOrderChanged } =
    useUsagePageHooks()

  const renderItem = ({ item }: { item: IItem }) => {
    return <Item item={item} onItemPress={onItemPress} onItemLongPress={startEdit} />
  }

  return (
    <View>
      <DraggableGridView
        style={styles.bg}
        contentContainerStyle={styles.contentContainer}
        itemContainerStyle={styles.itemContainer}
        isEditing={isEditing}
        numColumns={3}
        itemHeight={100}
        data={data}
        shouldAnimOnRelease={true}
        keyExtractor={({ id }) => `${id}`}
        onOrderChanged={onOrderChanged}
        renderItem={renderItem}
      />
      {selectedItem && <Item item={selectedItem} />}
      {isEditing && (
        <TouchableOpacity style={styles.btn} onPress={stopEdit}>
          <Text style={styles.text}>done</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default UsagePage
