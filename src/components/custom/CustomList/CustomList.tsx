import { ReactElement, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'src/Assets/Enums/colors';
import { fonts } from 'src/Assets/Fonts';
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
        totalCount: number
        dataPerPage: number
        containerPostion: 'center' | 'flex-start' | 'flex-end'
        containerSize: number
        whenPageMoved: ({ limit, offset }: WhenPageMovedProps) => void
    }
}
export const CustomList = <T,>({ listData, listDirection, listStyle, renderItem, paginatorProps }: CustomListProps<T>) => {
    const isHorizontal = listDirection === 'row';
    const iconSize = 35;
    const [activePage, setActivePage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>();
    const [pages, setPages] = useState<number[]>([]);
    const [startingPage, setStartingPage] = useState<number>();
    const [endingPage, setEndingPage] = useState<number>();
    const [showEdges, setShowEdges] = useState<'start' | 'end' | 'both' | 'none'>('start');

    useEffect(() => {
        if (paginatorProps?.totalCount && paginatorProps?.dataPerPage) {
            const { totalCount, dataPerPage } = paginatorProps;
            setTotalPages(totalCount % dataPerPage === 0 ? totalCount / dataPerPage : parseInt((totalCount / dataPerPage).toString()) + 1);
        }
    }, [paginatorProps?.totalCount, paginatorProps?.dataPerPage]);

    useEffect(() => {
        if (typeof totalPages === 'number') {
            setActivePage(1);
            setStartingPage(1);
            setPages([...Array(totalPages).keys()].map(i => i + 1));
            if (totalPages <= 5) {
                setShowEdges('none');
                setEndingPage(totalPages);
            } else {
                setShowEdges('end');
                setEndingPage(3);
            }
            paginatorProps?.whenPageMoved({
                limit: paginatorProps?.dataPerPage,
                offset: 0,
            });
        }
    }, [totalPages]);

    const whenPageMove = (active: number) => {
        setActivePage(active);
        paginationCheck(active);
        paginatorProps?.whenPageMoved(
            {
                limit: paginatorProps?.dataPerPage,
                offset: (active - 1) * paginatorProps?.dataPerPage,
            });
    }
    const paginationCheck = (active: number) => {
        if (totalPages > 5) {
            console.log(active);
            if (active <= 3) {
                setShowEdges('end');
                setStartingPage(1);
                setEndingPage(3);
            } else if (active >= totalPages - 2) {
                setShowEdges('start');
                setStartingPage(totalPages - 2);
                setEndingPage(totalPages);
            } else {
                setShowEdges('both');
                setStartingPage(active - 1);
                setEndingPage(active + 1);
            }
        }
    };
    const moveForward = () => {
        if (paginatorProps && activePage < (totalPages)) {
            whenPageMove(activePage + 1);
        }
    };
    const moveBackward = () => {
        if (activePage > 1) {
            whenPageMove(activePage - 1);
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
                        renderItem={(props) => (renderItem(props))} />
                    {
                        paginatorProps && listDirection === 'column' &&
                        <View style={{ ...style?.pageNavigateContainer, justifyContent: paginatorProps?.containerPostion }}>
                            <View style={style?.pageNavigator}>
                                <TouchableOpacity style={style?.navigatorBox}
                                    disabled={isFirstPageActive}
                                    onPress={moveBackward}>
                                    <Icon name={'keyboard-arrow-left'}
                                        style={style?.arrowIcon}
                                        size={iconSize}
                                        color={isFirstPageActive ? colors?.DARK_GRAY : colors?.BLACK} />
                                </TouchableOpacity>
                                {
                                    totalPages &&
                                    <View style={style?.row}>
                                        {
                                            (showEdges === 'start' || showEdges === 'both') &&
                                            <>
                                                <TouchableOpacity style={{
                                                    ...style?.numberBox,
                                                    backgroundColor: colors?.WHITE,
                                                }} onPress={() => whenPageMove(1)}>
                                                    <Text style={style?.page}>
                                                        1
                                                    </Text>
                                                </TouchableOpacity>
                                                <Text style={style?.page}>
                                                    ...
                                                </Text>
                                            </>
                                        }
                                        <View style={style?.row}>
                                            {
                                                startingPage && endingPage &&
                                                pages?.map((page, index) => (
                                                    page >= startingPage && page <= endingPage &&
                                                    <TouchableOpacity
                                                        disabled={page === activePage}
                                                        onPress={() => whenPageMove(page)}
                                                        key={index}
                                                        style={{
                                                            ...style?.numberBox,
                                                            backgroundColor: (page === activePage ? colors?.BLUE : colors?.WHITE),
                                                        }}>
                                                        <Text style={page === activePage ? style?.activePage : style?.page}>
                                                            {page.toString()}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                        {
                                            (showEdges === 'end' || showEdges === 'both') &&
                                            <>
                                                <Text style={style?.page}>
                                                    ...
                                                </Text>
                                                <TouchableOpacity style={{
                                                    ...style?.numberBox,
                                                    backgroundColor: colors?.WHITE,
                                                }} onPress={() => whenPageMove(totalPages)}>
                                                    <Text style={style?.page}>
                                                        {totalPages?.toString()}
                                                    </Text>
                                                </TouchableOpacity>
                                            </>
                                        }
                                    </View>
                                }
                                <TouchableOpacity style={style?.navigatorBox}
                                    onPress={moveForward}
                                    disabled={isLastPageActive}>
                                    <Icon name={'keyboard-arrow-right'}
                                        style={style?.arrowIcon}
                                        size={iconSize}
                                        color={isLastPageActive ? colors?.DARK_GRAY : colors?.BLACK} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </>
            }
        </View>
    );
};

const style = StyleSheet.create({
    pageNavigateContainer: {
        flexDirection: 'row',
    },
    pageNavigator: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: '100%',
        backgroundColor: colors?.WHITE,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        borderRadius: 8,
        boxShadow: `0px 1px 1px 2px ${colors?.GRAY}`,
        position: 'absolute',
        bottom: 0,
    },
    row: {
        flexDirection: 'row',
        gap: 8,
    },
    arrowIcon: {
        borderRadius: 20,
        borderColor: colors?.GRAY,
        borderWidth: 2,
    },
    navigatorBox: {
        borderRadius: 5,
    },
    numberBox: {
        borderRadius: 5,
        borderColor: colors?.GRAY,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    page: {
        fontSize: 20,
    },
    activePage: {
        color: colors?.WHITE,
        fontSize: 20,
    },
});
