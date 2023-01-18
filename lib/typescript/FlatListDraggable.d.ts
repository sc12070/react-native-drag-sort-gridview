import { FlatListProps, ViewStyle } from 'react-native';
declare const DragSortGridview: <T>(props: FlatListProps<T> & {
    data: T[];
    listWidth?: number;
    itemHeight?: number;
    isEditing: boolean;
    itemContainerStyle: ViewStyle;
    animMoveDuration?: number;
    debounce?: number | undefined;
    renderItem: ({ item, index }: {
        item: T;
        index: number;
    }) => JSX.Element;
    onOrderChanged: (orderedData: T[], from: number, to: number) => void;
}) => JSX.Element;
export default DragSortGridview;
//# sourceMappingURL=FlatListDraggable.d.ts.map