import { MOVEMENT } from '../models'
import React, { memo, useCallback, useRef } from 'react'
import { Animated, GestureResponderEvent, TouchableOpacity, View, ViewStyle, Image } from 'react-native'
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
    onRemove
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
    const onTouchCancel = () => {
        clearTimeout(timerId.current);
    }
    const onReleaseClose = (event: GestureResponderEvent) => {
        onTouchCancel();
        event.preventDefault();
        event.stopPropagation();
    }
    const onClose = (event: GestureResponderEvent) => {
        onTouchCancel();
        event.preventDefault();
        event.stopPropagation();
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
                onTouchCancel={onTouchCancel}
                style={[styles.reanimatedWrapper, animatedStyles]}>
                {(!isEditing && onRemove) && (
                    <View style={styles.close}>
                        <TouchableOpacity onPressIn={onClose} onPressOut={onReleaseClose}>
                            <Image
                                source={require('../assets/close.png')}
                                style={styles.icon}
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