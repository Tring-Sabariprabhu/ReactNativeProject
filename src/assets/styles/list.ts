import { StyleSheet } from 'react-native';
import { colors } from '../Enums/colors';
import { fonts } from '../Fonts';
import { styles } from './global';
import { fontSizes } from './fontSizes';

export const style = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors?.WHITE,
    },
    listContainer: {
        backgroundColor: colors?.WHITE,
        paddingVertical: 10,
        paddingHorizontal: 10,
        gap: 16,
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    capitalizedContent: {
        ...styles?.paragraph,
        ...styles?.capitalizedContent,
    },
    listItem: {
        ...styles?.paragraph,
        borderRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        boxShadow: `0px 0px 2px 2px ${colors?.GRAY}`,
        borderColor: colors?.LIGHT_GRAY,
        backgroundColor: colors?.WHITE,
    },
    listItemHeading: {
        fontFamily: fonts?.MEDIUM,
        textTransform: 'capitalize',
        fontSize: fontSizes?.heading,
    },
    listItemContent: {
        fontFamily: fonts?.LIGHT,
    },
    listItemContent2: {
        textTransform: 'capitalize',
        fontFamily: fonts?.LIGHT,
    },
    listItemContent3: {
        fontSize: fontSizes?.content,
        opacity: 0.6,
        fontFamily: fonts?.LIGHT,
    },
    contentView:{
        flex: 2,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingVertical: 10,
    },
    view:{
        flexDirection: 'row',
        gap: 5,
        width: '100%',
        justifyContent: 'flex-start',
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
        opacity: 0.2,
    },
    icon: {
        opacity: 0.4,
    },
});
