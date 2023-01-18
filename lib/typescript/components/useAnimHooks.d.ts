import { Animated } from 'react-native';
declare const _default: ({ itemWidth, itemHeight, numColumns, isEditing, index, dragItemOriginIndex, dragItemTargetIndex, animMoveDuration }: {
    itemWidth: number;
    itemHeight: number;
    numColumns: number;
    isEditing: boolean;
    index: number;
    dragItemOriginIndex: number | undefined;
    dragItemTargetIndex: number | undefined;
    animMoveDuration: number;
}) => {
    moveXAnim: Animated.Value;
    moveYAnim: Animated.Value;
    rotateAnim: Animated.Value;
    startRotate: () => void;
};
export default _default;
//# sourceMappingURL=useAnimHooks.d.ts.map