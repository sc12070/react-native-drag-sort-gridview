declare const DraggableItem: ({ children, style, itemWidth, itemHeight, numColumns, isEditing, index, dragItemOriginIndex, dragItemTargetIndex, animMoveDuration, onStartDrag, updateDragToIndex, onEndDrag }: {
    children?: JSX.Element;
    itemWidth: number;
    itemHeight: number;
    numColumns: number;
    style: any;
    isEditing: boolean;
    index: number;
    dragItemOriginIndex: number | undefined;
    dragItemTargetIndex: number | undefined;
    animMoveDuration: number;
    onStartDrag: (index: number) => void;
    updateDragToIndex: (index: number | undefined) => void;
    onEndDrag: (from: number, to: number) => void;
}) => JSX.Element;
export default DraggableItem;
//# sourceMappingURL=DraggableItem.d.ts.map