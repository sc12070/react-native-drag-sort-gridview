import { useMemo } from 'react';
export default (_ref => {
  let {
    index,
    dragItemOriginIndex
  } = _ref;
  const isDragging = useMemo(() => index === dragItemOriginIndex, [index, dragItemOriginIndex]);
  return {
    isDragging
  };
});
//# sourceMappingURL=useDraggableItemHooks.js.map