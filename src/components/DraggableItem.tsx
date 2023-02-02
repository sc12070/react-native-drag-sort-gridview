import { MOVEMENT } from '../models'
import React, { memo, useCallback, useEffect, useRef } from 'react'
import { Animated, GestureResponderEvent, TouchableOpacity, View, ViewStyle, Image, StyleProp, ImageStyle } from 'react-native'
import Reanimated from 'react-native-reanimated'
import styles from './styles'
import useDraggableItemHooks from './useDraggableItemHooks'
import usePanResponderViewHooks from './usePanResponderViewHooks'
import useReanimHooks from './useReanimHooks'


const DraggableItem = ({
    children,
    style,
    itemWidth,
    itemHeight,
    sectionWidth,
    sectionHeight,
    numColumns,
    isEditing,
    shouldVibrate,
    shouldAnimOnRelease,
    index,
    itemLength,
    isDragging,
    animDirection,
    animMoveDuration,
    lockTouch,
    unlockTouch,
    onStartDrag,
    updateDragToIndex,
    onEndDrag,
    onLongPress,
    isScrolling,
    onRemove,
    propsCloseIconStyle,
}: {
    children?: JSX.Element
    itemWidth: number
    itemHeight: number
    sectionWidth: number
    sectionHeight: number
    numColumns: number
    style?: ViewStyle
    isEditing: boolean
    shouldVibrate: boolean
    shouldAnimOnRelease: boolean
    index: number
    itemLength: number
    isDragging: boolean
    animDirection: MOVEMENT
    animMoveDuration: number
    lockTouch: () => void
    unlockTouch: () => void
    onStartDrag: (index: number) => void
    updateDragToIndex: (index: number | undefined) => void
    onEndDrag: (from: number, to: number) => void
    onLongPress: () => void;
    isScrolling: boolean;
    onRemove?: (index: number) => void;
    propsCloseIconStyle?: StyleProp<ImageStyle>;
}) => {
    const { isDraggingItem } = useDraggableItemHooks({
        animDirection
    })

    const { animatedStyles } = useReanimHooks({
        itemWidth,
        itemHeight,
        numColumns,
        isEditing,
        shouldVibrate,
        isDragging,
        isDraggingItem,
        index,
        animDirection,
        animMoveDuration
    })

    const { panResponder, dragXAnim, dragYAnim } = usePanResponderViewHooks({
        itemWidth,
        itemHeight,
        sectionWidth,
        sectionHeight,
        numColumns,
        index,
        itemLength,
        isEditing,
        animMoveDuration,
        shouldAnimOnRelease,
        lockTouch,
        unlockTouch,
        onStartDrag,
        updateDragToIndex,
        onEndDrag
    });

    const timerId = useRef<any>(0);

    const onTouchStart = useCallback(() => {
        clearTimeout(timerId.current);
        if (isScrolling) return;
        timerId.current = setTimeout(() => {
            onLongPress();
        }, 1000);
    }, [isScrolling, onLongPress])
    const onClearTouch = () => {
        clearTimeout(timerId.current);
    }
    const onReleaseClose = (event: GestureResponderEvent) => {
        event.preventDefault();
        event.stopPropagation();
        onClearTouch();
    }
    const onClose = (event: GestureResponderEvent) => {
        event.preventDefault();
        event.stopPropagation();
        onClearTouch();
        onRemove(index);
    }

    return (
        <Animated.View
            style={[
                style,
                styles.wrapper,
                {
                    width: itemWidth,
                    height: itemHeight
                },
                {
                    transform: [
                        {
                            translateX: dragXAnim
                        },
                        {
                            translateY: dragYAnim
                        }
                    ]
                },
                isDraggingItem && styles.dragging
            ]}>
            <Reanimated.View
                {...panResponder.panHandlers}
                onTouchStart={onTouchStart}
                onTouchEnd={onClearTouch}
                onTouchCancel={onClearTouch}
                style={[styles.reanimatedWrapper, animatedStyles]}>
                {(!isEditing && onRemove) && (
                    <View style={styles.close}>
                        <TouchableOpacity onPressIn={onClose} onPressOut={onReleaseClose}>
                            <Image
                                source={require('../assets/close.png')}
                                style={[styles.icon, propsCloseIconStyle]}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                {children}
            </Reanimated.View>
        </Animated.View>
    )
}

export default memo(DraggableItem)