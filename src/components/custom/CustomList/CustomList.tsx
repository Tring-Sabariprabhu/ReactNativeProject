import { ReactElement, useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Loader } from '../Loader';
import { CustomTextInput } from '../CustomTextInput';
import { styles } from 'src/Assets/Styles/global';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fonts } from 'src/Assets/Fonts';

interface LoadPagesProps {
    limit: number;
    offset: number;
    searchInput: string | undefined;
}
interface CustomListProps<T> {
    listDirection: 'row' | 'column',
    listStyle?: ViewStyle
    searchPlaceholder: string
    limit: number
    totalCount: number | undefined
    renderItem: (props: ListRenderItemInfo<T>) => ReactElement
    fetchListItemsCount: ({ searchInput }: { searchInput?: string }) => void
    fetchListItems: ({ limit, offset, searchInput }: LoadPagesProps) => Array<T> | undefined
}
export const CustomList = <T,>({ listDirection, listStyle, renderItem, limit, totalCount, fetchListItems, fetchListItemsCount, searchPlaceholder }: CustomListProps<T>) => {
    const isHorizontal = listDirection === 'row';
    const [loading, setLoading] = useState(false);
    const [listItems, setListItems] = useState<T[]>();
    const page = useRef<number>(0);
    const searchInput = useRef<string | undefined>(undefined);

    useEffect(() => {
        fetchingCount();
    }, []);

    useEffect(() => {
            if (totalCount === 0) {
                setListItems([]);
                setLoading(false);
            }
            else if(totalCount && totalCount > 0){
                console.log(totalCount);
                setInitialPage();
            }
    }, [totalCount]);

    const setInitialPage = () => {
        setListItems([]);
        fetchingListItems(true);
    };
    const fetchingCount = async () => {
        setLoading(true);
        console.log('fetching Count');
        await fetchListItemsCount({ searchInput: searchInput?.current });
    };

    const fetchingListItems = async (initial = false) => {
        console.log('fetching data');
        setLoading(true);
        if (totalCount) {
            setTimeout(async () => {
                const fetchedData = await fetchListItems({
                    limit: limit,
                    offset: (initial ? 0 : page.current * limit),
                    searchInput: searchInput.current,
                });
                if (fetchedData) {
                    if (initial) {
                        page.current = 1;
                        setListItems(fetchedData);
                    } else if (page.current > 0 && listItems) {
                        page.current = page.current + 1;
                        setListItems([...listItems, ...fetchedData]);
                    }
                    setLoading(false);
                }
            }, 2000);
        }
    };

    const onEndReached = () => {
        if (totalCount) {
            if (!loading && ((page.current * limit) < totalCount)) {
                fetchingListItems(false);
            }
        }
    };
    const handleSearchChange = (value: string) => {
        if (value?.length > 0) {
            searchInput.current = value;
            if (!loading) {
                fetchingCount();
            }
        } else if (value?.length === 0) {
            searchInput.current = undefined;
            if (!loading) {
                fetchingCount();
            }
        }
    };
    const debounce = (func, delay) => {
        let timeoutId;

        return (...args) => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const debounceChange = debounce(handleSearchChange, 1000);

    return (
        <View style={{ flex: 1 }}>
            <View style={style?.searchView}>
                <CustomTextInput
                    readOnly={loading}
                    placeholder={`Search ${searchPlaceholder}`}
                    icon={<Icon name={'search'} size={24} style={style?.searchIcon} />}
                    onChangeText={debounceChange}
                    inputStyle={style?.searchBox}
                    keyboardType={'default'} />
            </View>
            <FlatList
                data={listItems}
                refreshing={loading}
                contentContainerStyle={[listStyle]}
                horizontal={isHorizontal}
                renderItem={(props) => (renderItem(props))}
                {...(loading && { ListFooterComponent: <Loader size={50} /> })}
                onEndReached={onEndReached}
            />
            {(!loading) && totalCount === 0 &&
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontFamily: fonts?.LIGHT, fontSize: 20 }}>
                            No Users found
                        </Text>
                    </View>
                </View>}
        </View >
    );
};

const style = StyleSheet.create({
    searchView: {
        padding: 20,
    },
    searchBox: {
        ...styles?.textInput,
        fontSize: 16,
        paddingHorizontal: 40,
    },
    searchIcon: {
        position: 'absolute',
        opacity: 0.5,
        top: '25%',
        left: 10,
    },
});
