import { StyleSheet } from 'react-native';
import { colors } from '../Enums/colors';
import { fonts } from '../Fonts';
import { styles } from './global';

export const style = StyleSheet.create({
    screen: {
        ...styles?.screen,
        backgroundColor: colors?.WHITE,
        gap: 20,
        padding: 20,
    },
    listContainer: {
        gap: 20,
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
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors?.LIGHT_GRAY,
        backgroundColor: colors?.WHITE,
    },
    listItemHeading: {
        fontSize: 22,
        fontFamily: fonts?.MEDIUM,
        color: colors?.BLUE,
    },
    listItemContent: {
        textTransform: 'capitalize',
        fontSize: 20,
        fontFamily: fonts?.REGULAR,
    },
    listItemContent2: {
        textTransform: 'capitalize',
        fontSize: 16,
        fontFamily: fonts?.LIGHT,
    },
});
