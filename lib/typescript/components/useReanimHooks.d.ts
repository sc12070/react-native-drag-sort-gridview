/// <reference types="react-native-reanimated" />
declare const _default: ({ itemWidth, itemHeight, numColumns, isEditing, isDragging, index, dragItemOriginIndex, dragItemTargetIndex, animMoveDuration }: {
    itemWidth: number;
    itemHeight: number;
    numColumns: number;
    isEditing: boolean;
    isDragging: boolean;
    index: number;
    dragItemOriginIndex: number | undefined;
    dragItemTargetIndex: number | undefined;
    animMoveDuration: number;
}) => {
    movementOffset: import("react-native-reanimated").SharedValue<{
        x: number;
        y: number;
    }>;
    animatedStyles: {
        transform: ({
            translateX: number;
            translateY?: undefined;
            rotateZ?: undefined;
        } | {
            translateY: number;
            translateX?: undefined;
            rotateZ?: undefined;
        } | {
            rotateZ: string;
            translateX?: undefined;
            translateY?: undefined;
        })[];
    };
};
export default _default;
//# sourceMappingURL=useReanimHooks.d.ts.map