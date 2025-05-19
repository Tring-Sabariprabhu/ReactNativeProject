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
        gap: 50,
    },
    showPatientContainer: {
        paddingLeft: 10,
        paddingRight: 60,
        gap: 15,
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
        paddingHorizontal: 30,
        borderRadius: 10,
        flexDirection: 'row',
        boxShadow: `0px 2px 5px 2px ${colors?.GRAY}`,
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
        fontSize: 15,
        fontFamily: fonts?.LIGHT,
    },
    contentView:{
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingVertical: 10,
    },
    view:{
        flexDirection: 'row',
        gap: 5,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    imageView: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 5,
    },
    image: {
        width: 90,
        height: 90,
        opacity: 0.15,
    },
    icon: {
        opacity: 0.3,
    },
});
