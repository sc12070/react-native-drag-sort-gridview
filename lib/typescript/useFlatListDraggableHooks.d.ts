declare const _default: <T>({ data, debounce, listWidth, numColumns, onOrderChanged }: {
    data: T[];
    debounce?: number | undefined;
    listWidth: number | undefined;
    numColumns: number | undefined;
    onOrderChanged: (orderedData: T[], from: number, to: number) => void;
}) => {
    dragIndex: number;
    dragToIndex: number;
    isEnableScroll: boolean;
    itemWidth: number;
    onStartDrag: (index: number) => void;
    updateDragToIndex: (index: number | undefined) => void;
    onEndDrag: (from: number, to: number) => void;
};
export default _default;
//# sourceMappingURL=useFlatListDraggableHooks.d.ts.map