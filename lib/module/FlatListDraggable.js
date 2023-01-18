function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { FlatList } from 'react-native';
import DraggableItem from './components/DraggableItem';
import styles from './styles';
import useFlatListDraggableHooks from './useFlatListDraggableHooks';
const DragSortGridview = props => {
  const {
    style,
    data,
    isEditing,
    itemContainerStyle,
    listWidth,
    numColumns,
    itemHeight,
    animMoveDuration,
    debounce,
    onOrderChanged
  } = props;
  const {
    dragIndex,
    dragToIndex,
    isEnableScroll,
    itemWidth,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
  } = useFlatListDraggableHooks({
    data,
    listWidth,
    numColumns,
    debounce,
    onOrderChanged
  });
  const renderItem = _ref => {
    let {
      item,
      index
    } = _ref;
    return /*#__PURE__*/React.createElement(DraggableItem, {
      style: itemContainerStyle,
      itemWidth: itemWidth,
      itemHeight: itemHeight || itemWidth,
      numColumns: numColumns || 1,
      dragItemOriginIndex: dragIndex,
      dragItemTargetIndex: dragToIndex,
      index: index,
      isEditing: isEditing,
      animMoveDuration: animMoveDuration || 1000,
      onStartDrag: onStartDrag,
      updateDragToIndex: updateDragToIndex,
      onEndDrag: onEndDrag
    }, props.renderItem({
      item,
      index
    }));
  };
  return /*#__PURE__*/React.createElement(FlatList, _extends({}, props, {
    style: [styles.list, style, {
      width: listWidth
    }],
    scrollEnabled: isEnableScroll,
    renderItem: renderItem
  }));
};
export default DragSortGridview;
//# sourceMappingURL=FlatListDraggable.js.map