import { ReactElement, useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Loader } from '../Loader';
import { CustomTextInput } from '../CustomTextInput';
import { styles } from 'src/Assets/Styles/global';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fonts } from 'src/Assets/Fonts';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'src/Components/Types/NavigationProp';

interface LoadPagesProps {
    limit: number;
    offset: number;
    searchInput: string | null;
}
interface CustomListProps<T> {
    listDirection: 'row' | 'column',
    listStyle?: ViewStyle
    searchPlaceholder: string
    limit: number
    renderItem: (props: ListRenderItemInfo<T>) => ReactElement
    fetchListItemsCount: (props: { searchInput: string | null }) => number
    fetchListItems: ({ limit, offset, searchInput }: LoadPagesProps) => Array<T> | undefined
}
export const CustomList = <T,>({ listDirection, listStyle, renderItem, limit, fetchListItems, fetchListItemsCount, searchPlaceholder }: CustomListProps<T>) => {
    const isHorizontal = listDirection === 'row';
    const [loading, setLoading] = useState(false);
    const [listItems, setListItems] = useState<T[]>();
    const page = useRef<number>(0);
    const searchInput = useRef<string | null>(null);
    const totalCount = useRef<number>(0);

    useEffect(()=> {
        fetchingCount();
    },[]);

    const setInitialPage = () => {
        setListItems([]);
        fetchingListItems(true);
    };
    const fetchingCount = () => {
        setLoading(true);
        console.log('fetching Count');
        setListItems([]);
        setTimeout(async () => {
            const fetchedCount = await fetchListItemsCount({ searchInput: searchInput?.current });
            if (fetchedCount === 0) {
                setListItems([]);
                totalCount.current = 0;
            } else {
                totalCount.current = fetchedCount;
                console.log(totalCount.current);
                setInitialPage();
            }
            setLoading(false);
        }, 1000);
    };

    const fetchingListItems = async (initial = false) => {
        console.log('fetching data');
        setLoading(true);
        if (!loading && totalCount.current) {
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
        }
    };

    const onEndReached = () => {
        if (totalCount.current) {
            if (!loading && ((page.current * limit) < totalCount.current)) {
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
            searchInput.current = null;
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
                    editable={!loading}
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
            {(!loading) && totalCount.current === 0 &&
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
