function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Animated } from 'react-native';
import Reanimated from 'react-native-reanimated';
import styles from './styles';
import useDraggableItemHooks from './useDraggableItemHooks';
import usePanResponderViewHooks from './usePanResponderViewHooks';
import useReanimHooks from './useReanimHooks';
const DraggableItem = _ref => {
  let {
    children,
    style,
    itemWidth,
    itemHeight,
    numColumns,
    isEditing,
    index,
    dragItemOriginIndex,
    dragItemTargetIndex,
    animMoveDuration,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
  } = _ref;
  const {
    isDragging
  } = useDraggableItemHooks({
    index,
    dragItemOriginIndex
  });
  const {
    animatedStyles
  } = useReanimHooks({
    itemWidth,
    itemHeight,
    numColumns,
    isEditing,
    isDragging,
    index,
    dragItemOriginIndex,
    dragItemTargetIndex,
    animMoveDuration
  });
  const {
    panResponder,
    dragXAnim,
    dragYAnim
  } = usePanResponderViewHooks({
    itemWidth,
    itemHeight,
    numColumns,
    index,
    isEditing,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
  });
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [style, styles.wrapper, {
      width: itemWidth,
      height: itemHeight
    }, {
      transform: [{
        translateX: dragXAnim
      }, {
        translateY: dragYAnim
      }]
    }, isDragging && styles.dragging]
  }, /*#__PURE__*/React.createElement(Reanimated.View, _extends({}, panResponder.panHandlers, {
    style: animatedStyles
  }), children));
};
export default DraggableItem;
//# sourceMappingURL=DraggableItem.js.map