import React from 'react'
import DraggableGridView from 'react-native-drag-sort-gridview'
import Item from './components/Item'
import { IItem } from './modal'
import styles from './styles'
import useFixedItemWidthPageHooks from './useFixedItemWidthPageHooks'

const FixedItemWidthPage = () => {
  const { data, noColums, itemHeight, onOrderChanged } = useFixedItemWidthPageHooks()

  const renderItem = ({ item }: { item: IItem }) => {
    return <Item item={item} />
  }

  return (
    <DraggableGridView
      style={styles.bg}
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
  )
}

export default FixedItemWidthPage
