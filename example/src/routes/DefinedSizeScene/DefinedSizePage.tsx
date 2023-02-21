import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import DraggableGridView from 'react-native-drag-sort-gridview'
import { SafeAreaView } from 'react-native-safe-area-context'
import Item from './components/Item'
import styles from './styles'
import useDefinedSizePageHooks from './useDefinedSizePageHooks'

export const listWidth = Dimensions.get('window').width * 0.7

const DefinedSizePage = () => {
  const { data, onOrderChanged } = useDefinedSizePageHooks()

  const renderItem = ({ item }: { item: string }) => {
    return <Item string={item} />
  }

  return (
    <SafeAreaView style={styles.bg}>
      <Text style={styles.text}>{data.join('')}</Text>
      <View style={styles.wrapper}>
        <DraggableGridView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          itemContainerStyle={styles.itemContainer}
          isEditing={true}
          numColumns={3}
          itemHeight={50}
          data={data}
          shouldAnimOnRelease={true}
          keyExtractor={(_: any, idx: number) => `half-page-item-${idx}`}
          onOrderChanged={onOrderChanged}
          renderItem={renderItem}
          listWidth={listWidth}
          shouldVibrate={false}
          scrollThreshold={0.2}
        />
      </View>
    </SafeAreaView>
  )
}

export default DefinedSizePage
