import { StatusBar, StyleSheet } from 'react-native';
import { fonts } from '../Fonts';
import { colors } from '../Enums/colors';

export const styles = StyleSheet?.create({
    screen: {
        flex: 1,
        padding: StatusBar?.currentHeight,
    },
    textInput: {
        fontFamily: fonts?.LIGHT,
        boxShadow: `1px 1px 1px 2px ${colors?.LIGHT_GRAY}`,
        borderRadius: 8,
    },
    label: {
        fontFamily: fonts?.LIGHT,
        color: colors?.BLACK,
    },
    paragraph: {
        fontFamily: fonts?.LIGHT,
        fontSize: 18,
    },
    highlightedParagraph: {
        fontSize: 18,
        fontFamily: fonts?.MEDIUM,
    },
    capitalizedContent: {
        fontFamily: fonts?.LIGHT,
        fontSize: 18,
        textTransform: 'capitalize',
    },
    error: {
        color: colors?.RED,
        paddingStart: 10,
        fontFamily: fonts?.LIGHT,
        fontSize: 14,
    },
    button: {
        fontFamily: fonts?.MEDIUM,
    },
    popupButton: {
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    popupButtonText: {
        fontFamily: fonts?.MEDIUM,
        fontSize: 20,
    },
     dropDown: {
        boxShadow: `1px 1px 1px 2px ${colors?.LIGHT_GRAY}`,
        borderRadius: 8,
    },
    dropDownItem: {
        fontFamily: fonts?.REGULAR,
        fontSize: 15,
        padding: 5,
    },
    activeDropDownItem:{
        color: colors?.BLUE,
        fontFamily: fonts?.REGULAR,
        fontSize: 18,
        padding: 5,
    },
});

