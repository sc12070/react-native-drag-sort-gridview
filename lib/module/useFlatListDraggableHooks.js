import { useCallback, useMemo, useRef, useState } from 'react';
import update from 'react-addons-update';
import { Dimensions } from 'react-native';
export default (_ref => {
  let {
    data,
    debounce,
    listWidth,
    numColumns,
    onOrderChanged
  } = _ref;
  const [isEnableScroll, setIsEnableScroll] = useState(true);
  const [dragIndex, setDragIndex] = useState(undefined);
  const [dragToIndex, setDragToIndex] = useState(undefined);
  const timerRef = useRef();
  const itemWidth = useMemo(() => (listWidth || Dimensions.get('screen').width) / (numColumns || 1), [listWidth, numColumns]);
  const onStartDrag = useCallback(index => {
    setIsEnableScroll(false);
    setDragIndex(index);
  }, []);
  const updateDragToIndex = useCallback(index => {
    if (debounce === undefined) {
      setDragToIndex(index);
      return;
    }
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setDragToIndex(index);
    }, debounce);
  }, [debounce]);
  const onEndDrag = useCallback((from, to) => {
    setIsEnableScroll(true);
    setDragIndex(undefined);
    setDragToIndex(undefined);
    if (from === to) {
      return;
    }
    const temp = data[from];
    const orderedData = update(data, {
      $splice: [[from, 1], [to, 0, temp]]
    });
    onOrderChanged(orderedData, from, to);
  }, [data, onOrderChanged]);
  return {
    dragIndex,
    dragToIndex,
    isEnableScroll,
    itemWidth,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
  };
});
//# sourceMappingURL=useFlatListDraggableHooks.js.map