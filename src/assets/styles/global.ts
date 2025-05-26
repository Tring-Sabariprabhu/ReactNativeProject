import { StatusBar, StyleSheet } from 'react-native';
import { fonts } from '../Fonts';
import { colors } from '../Enums/colors';
import { fontSizes } from './fontSizes';

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
        fontSize: fontSizes?.content,
    },
    highlightedParagraph: {
        fontFamily: fonts?.MEDIUM,
    },
    capitalizedContent: {
        fontFamily: fonts?.LIGHT,
        textTransform: 'capitalize',
    },
    error: {
        color: colors?.RED,
        paddingTop: 5,
        paddingLeft: 10,
        fontFamily: fonts?.LIGHT,
        fontSize: fontSizes?.content,
    },
    buttonText: {
        fontFamily: fonts?.MEDIUM,
    },
    popupButton: {
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    popupButtonText: {
        fontFamily: fonts?.MEDIUM,
        fontSize: fontSizes?.heading,
    },
     dropDown: {
        boxShadow: `1px 1px 1px 2px ${colors?.LIGHT_GRAY}`,
        borderRadius: 8,
        paddingHorizontal: 5,
    },
    dropDownItem: {
        fontSize: fontSizes?.content,
        fontFamily: fonts?.REGULAR,
    },
    activeDropDownItem:{
        color: colors?.BLUE,
        fontFamily: fonts?.REGULAR,
        padding: 5,
    },
});

