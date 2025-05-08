import { ReactElement } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
interface CustomListProps {
    listDirection: 'row' | 'column',
    listData: ArrayLike<any> | undefined
    renderItem: (props: ListRenderItemInfo<any>) => ReactElement
}
export const CustomList = ({ listData, listDirection, renderItem }: CustomListProps) => {
    const isHorizontal = listDirection === 'row';
    return (
        <View>
            <FlatList
                horizontal={isHorizontal}
                data={listData}
                renderItem={(props) => (
                    <View>
                        {renderItem(props)}
                    </View>)
                } />
        </View>
    );
};
