import { ReactElement, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'src/Assets/Enums/colors';
interface WhenPageMovedProps {
    limit: number,
    offset: number
}
interface CustomListProps<T> {
    listDirection: 'row' | 'column',
    listData: ArrayLike<T> | undefined
    listStyle?: ViewStyle
    renderItem: (props: ListRenderItemInfo<T>) => ReactElement
    paginatorProps?: {
        dataCount: number
        direction: 'center' | 'flex-start' | 'flex-end'
        containerSize: number
        dataPerPage: number
        whenPageMoved: ({ limit, offset }: WhenPageMovedProps) => void
    }
}
export const CustomList = <T,>({ listData, listDirection, listStyle, renderItem, paginatorProps }: CustomListProps<T>) => {
    const isHorizontal = listDirection === 'row';
    const iconSize = 30 + (paginatorProps?.containerSize ? paginatorProps?.containerSize : 0);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useState(() => {
        if (paginatorProps?.dataCount) {
            const { dataCount, dataPerPage } = paginatorProps;
            setTotalPages(dataCount % dataPerPage === 0 ? dataCount / dataPerPage : parseInt((dataCount / dataPerPage).toString()) + 1);
        }
    }, [paginatorProps]);

    const moveForward = () => {
        if (paginatorProps && activePage < (totalPages)) {
            setActivePage(activePage + 1);
            paginatorProps?.whenPageMoved(
                {
                    limit: paginatorProps?.dataPerPage,
                    offset: (activePage) * paginatorProps?.dataPerPage,
                });
        }
    };
    const moveBackward = () => {
        if (activePage > 1) {
            setActivePage(activePage - 1);
            paginatorProps?.whenPageMoved(
                {
                    limit: paginatorProps?.dataPerPage,
                    offset: (activePage - 2) * paginatorProps?.dataPerPage,
                });
        }
    };
    const isFirstPageActive = activePage === 1;
    const isLastPageActive = activePage === totalPages;
    return (
        <View style={{ flex: 1 }}>
            {
                listData &&
                <>
                    <FlatList
                        contentContainerStyle={listStyle}
                        horizontal={isHorizontal}
                        data={listData}
                        renderItem={(props) => (renderItem(props))
                        } />
                    {
                        paginatorProps && listDirection === 'column' &&
                        <View style={{ ...style?.pageNavigateContainer, justifyContent: paginatorProps?.direction }}>
                            <View style={
                                {
                                    ...style?.pageNavigator,
                                    paddingVertical: 5 * paginatorProps?.containerSize,
                                    paddingHorizontal: 10 * paginatorProps?.containerSize,
                                }}>
                                <TouchableOpacity style={style?.navigatorBox}
                                    disabled={isFirstPageActive}
                                    onPress={moveBackward}>
                                    <Icon name={'keyboard-arrow-left'}
                                        size={iconSize}
                                        color={isFirstPageActive ? colors?.GRAY : colors?.BLACK} />
                                </TouchableOpacity>
                                {

                                    <TouchableOpacity
                                        style={{ ...style?.numberBox, backgroundColor: colors?.BLUE }}
                                        disabled>
                                        <Text style={style?.activePage}>
                                            {activePage}
                                        </Text>
                                    </TouchableOpacity>
                                }
                                <View>
                                    <Text style={style?.page}>
                                        ...  {totalPages}
                                    </Text>
                                </View>
                                <TouchableOpacity style={style?.navigatorBox}
                                    onPress={moveForward}
                                    disabled={isLastPageActive}>
                                    <Icon name={'keyboard-arrow-right'}
                                        size={iconSize}
                                        color={isLastPageActive ? colors?.GRAY : colors?.BLACK} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }</>
            }
        </View>
    );
};

const style = StyleSheet.create({
    pageNavigateContainer: {
        backgroundColor: 'transparent',
        padding: 10,
        flexDirection: 'row',
    },
    pageNavigator: {
        backgroundColor: colors?.WHITE,
        flexDirection: 'row',
        gap: 10,
        borderRadius: 10,
        alignItems: 'center',
        boxShadow: `2px 3px 2px 3px ${colors?.GRAY}`,
    },
    navigatorBox: {
        borderRadius: 5,
    },
    numberBox: {
        borderRadius: 5,
        borderColor: colors?.GRAY,
        borderWidth: 2,
        paddingHorizontal: 10,
    },
    page: {
        fontSize: 20,
    },
    activePage: {
        color: colors?.WHITE,
        fontSize: 20,
    },
});
