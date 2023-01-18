import { Animated } from 'react-native';
declare const _default: ({ itemWidth, itemHeight, numColumns, index, isEditing, onStartDrag, updateDragToIndex, onEndDrag }: {
    itemWidth: number;
    itemHeight: number;
    numColumns: number;
    index: number;
    isEditing: boolean;
    onStartDrag: (index: number) => void;
    updateDragToIndex: (index: number | undefined) => void;
    onEndDrag: (from: number, to: number) => void;
}) => {
    panResponder: {
        panHandlers: {};
    };
    dragXAnim: Animated.Value;
    dragYAnim: Animated.Value;
};
export default _default;
//# sourceMappingURL=usePanResponderViewHooks.d.ts.map