import React from 'react'
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewProps,
  View,
  ViewStyle
} from 'react-native'
import DraggableItem from './components/DraggableItem'
import styles from './styles'
import useDraggableGridViewHooks from './useDraggableGridViewHooks'

const DraggableGridView = <T,>(
  props: ScrollViewProps & {
    data: Array<T>
    listWidth?: number
    itemHeight?: number
    isEditing: boolean
    shouldVibrate?: boolean
    shouldAnimOnRelease?: boolean
    itemContainerStyle?: ViewStyle
    animMoveDuration?: number
    numColumns: number
    debounce?: number | undefined
    scrollThreshold?: number | undefined
    renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement | null
    renderOnEditOverlay?: ({ index }: { index: number }) => React.ReactElement | null
    keyExtractor: (item: T, index: number) => string
    onOrderChanged: (orderedData: Array<T>, from: number, to: number) => void
    onMovingStateChanged?: (isMoving: boolean) => void
    onLayout?: (event: LayoutChangeEvent) => void
    onContentSizeChange?: (w: number, h: number) => void
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
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
    numColumns,
    animMoveDuration,
    scrollThreshold,
    debounce,
    renderItem: propsRenderItem,
    renderOnEditOverlay,
    keyExtractor,
    onOrderChanged,
    onMovingStateChanged,
    onLayout: propsOnLayout,
    onContentSizeChange: propsOnContentSizeChange,
    onScroll: propsOnScroll
  } = props

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
    listRef,
    listLayoutRef,
    listContentHeightRef,
    listOffsetYRef,
    onLayout,
    onContentSizeChange,
    onScroll,
    startAnim,
    endAnim,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
  } = useDraggableGridViewHooks({
    data,
    listWidth,
    propsItemHeight,
    numColumns,
    debounce,
    shouldAnimOnRelease,
    onOrderChanged,
    onMovingStateChanged,
    propsOnLayout,
    propsOnContentSizeChange,
    propsOnScroll
  })

  const renderItem = ({ item, index }: { item: T; index: number }) => (
    <DraggableItem
      key={keyExtractor(item, index)}
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
      animMoveDuration={animMoveDuration || 500}
      scrollThreshold={scrollThreshold}
      listRef={listRef}
      listLayoutRef={listLayoutRef}
      listContentHeightRef={listContentHeightRef}
      listOffsetYRef={listOffsetYRef}
      renderOnEditOverlay={renderOnEditOverlay}
      startAnim={startAnim}
      endAnim={endAnim}
      onStartDrag={onStartDrag}
      updateDragToIndex={updateDragToIndex}
      onEndDrag={onEndDrag}>
      <>{propsRenderItem({ item, index })}</>
    </DraggableItem>
  )

  return (
    <>
      <ScrollView
        {...props}
        ref={listRef}
        onLayout={onLayout}
        onContentSizeChange={onContentSizeChange}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={[styles.list, style, { width: listWidth }]}
        contentContainerStyle={[contentContainerStyle, styles.content]}
        scrollEnabled={isEnableScroll}>
        {data.map((item: T, index: number) => renderItem({ item, index }))}
      </ScrollView>
      {isLock === true && <View style={styles.uiBlock} />}
    </>
  )
}

export default DraggableGridView
