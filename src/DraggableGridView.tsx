import React from 'react'
import { ScrollView, ScrollViewProps, View, ViewStyle } from 'react-native'
import DraggableItem from './components/DraggableItem'
import styles from './styles'
import useDraggableGridViewHooks from './useDraggableGridViewHooks'

const DraggableGridView = <T,>(
  props: ScrollViewProps & {
    data: Array<T>
    listWidth?: number
    itemHeight?: number
    itemWidth?: number
    isEditing: boolean
    shouldVibrate?: boolean
    shouldAnimOnRelease?: boolean
    itemContainerStyle?: ViewStyle
    animMoveDuration?: number
    numColumns: number
    debounce?: number | undefined
    renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement | null
    keyExtractor: (item: T) => string
    onStartDrag?: (index: number) => void
    onEndDrag: (orderedData: Array<T>, from: number, to: number) => void
    onLongPress: () => void;
    onRemove?: (index: number) => void;
    notIncludeRemoveIn?: Array<number>;
  }
) => {
  const {
    style,
    contentContainerStyle,
    data,
    isEditing,
    shouldVibrate = true,
    shouldAnimOnRelease = false,
    itemContainerStyle,
    listWidth,
    itemHeight: propsItemHeight,
    itemWidth: propsItemWidth,
    numColumns,
    animMoveDuration,
    debounce,
    keyExtractor,
    onStartDrag: onPropsStartDrag,
    onEndDrag: onPropsEndDrag,
    onLongPress,
    onRemove,
    notIncludeRemoveIn
  } = props

  const [isScrolling, setIsScrolling] = React.useState(false);

  const {
    isLock,
    isDragging,
    count,
    animDirectionArray,
    isEnableScroll,
    itemWidth,
    itemHeight,
    sectionWidth,
    sectionHeight,
    lockTouch,
    unlockTouch,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
  } = useDraggableGridViewHooks({
    data,
    propsItemHeight,
    propsItemWidth,
    numColumns,
    debounce,
    onEndDrag: onPropsEndDrag,
    onStartDrag: onPropsStartDrag,
  })

  const renderItem = ({ item, index }: { item: T; index: number }) => (
    <DraggableItem
      key={keyExtractor(item)}
      style={itemContainerStyle}
      itemWidth={itemWidth}
      itemHeight={itemHeight}
      sectionWidth={sectionWidth}
      sectionHeight={sectionHeight}
      numColumns={numColumns || 1}
      itemLength={count}
      isDragging={isDragging}
      animDirection={animDirectionArray[index]}
      index={index}
      isEditing={isEditing}
      shouldVibrate={shouldVibrate}
      shouldAnimOnRelease={shouldAnimOnRelease}
      animMoveDuration={animMoveDuration || 1000}
      lockTouch={lockTouch}
      unlockTouch={unlockTouch}
      onStartDrag={onStartDrag}
      updateDragToIndex={updateDragToIndex}
      onEndDrag={onEndDrag}
      onLongPress={onLongPress}
      isScrolling={isScrolling}
      onRemove={notIncludeRemoveIn ? !notIncludeRemoveIn.includes(index) && onRemove : onRemove}
      >
      <>{props.renderItem({ item, index })}</>
    </DraggableItem>
  )

  return (
    <>
      <ScrollView
        {...props}
        style={[styles.list, style, { width: listWidth }]}
        contentContainerStyle={[contentContainerStyle, styles.content]}
        scrollEnabled={isEnableScroll}
        onScrollEndDrag={() => setIsScrolling(false)}
        onMomentumScrollBegin={() => setIsScrolling(true)}>
        {data.map((item: T, index: number) => renderItem({ item, index }))}
      </ScrollView>
      {isLock === true && <View style={styles.uiBlock} />}
    </>
  )
}

export default DraggableGridView
