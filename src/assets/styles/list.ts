import { StyleSheet } from 'react-native';
import { colors } from '../Enums/colors';
import { fonts } from '../Fonts';
import { styles } from './global';

export const style = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors?.WHITE,
    },
    listContainer: {
        backgroundColor: colors?.WHITE,
        paddingVertical: 20,
        paddingHorizontal: 15,
        gap: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    capitalizedContent: {
        ...styles?.paragraph,
        ...styles?.capitalizedContent,
    },
    listItem: {
        ...styles?.paragraph,
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        boxShadow: `0px 0px 2px 2px ${colors?.GRAY}`,
        borderColor: colors?.LIGHT_GRAY,
        backgroundColor: colors?.WHITE,
    },
    listItemHeading: {
        fontSize: 20,
        fontFamily: fonts?.MEDIUM,
    },
    listItemContent: {
        textTransform: 'capitalize',
        fontSize: 18,
        fontFamily: fonts?.REGULAR,
    },
    listItemContent2: {
        textTransform: 'capitalize',
        fontSize: 16,
        fontFamily: fonts?.LIGHT,
    },
    listItemContent3: {
        paddingVertical: 5,
        opacity: 0.6,
        fontSize: 14,
        fontFamily: fonts?.LIGHT,
    },
    contentView:{
        flex: 3,
        gap: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingVertical: 10,
    },
    view:{
        flexDirection: 'row',
        gap: 6,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    imageView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
    },
    image: {
        width: 85,
        height: 85,
        opacity: 0.15,
    },
    icon: {
        opacity: 0.4,
    },
});
