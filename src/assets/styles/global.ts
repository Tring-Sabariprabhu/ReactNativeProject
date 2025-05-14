import { StatusBar, StyleSheet } from 'react-native';
import { fonts } from '../Fonts';
import { colors } from '../Enums/colors';

export const styles = StyleSheet?.create({
    screen: {
        flex: 1,
        padding: StatusBar?.currentHeight,
    },
    textInput: {
        fontFamily: fonts?.REGULAR,
        borderColor: colors?.GRAY,
        borderWidth: 2,
        borderRadius: 10,
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
        paddingTop: 10,
        fontFamily: fonts?.LIGHT,
        fontSize: 14,
    },
    button: {
        fontFamily: fonts?.MEDIUM,
    },
    popupButton: {
        padding: 3,
    },
    popupButtonText: {
        fontFamily: fonts?.REGULAR,
        fontSize: 20,
        paddingHorizontal: 6,
    },
     dropDown: {
       borderColor: colors?.GRAY,
        borderWidth: 1,
        borderRadius: 10,
        // paddingHorizontal: 5,
    },
    dropDownItem: {
        fontFamily: fonts?.REGULAR,
        fontSize: 18,
        padding: 5,
    },
    activeDropDownItem:{
        color: colors?.BLUE,
        // backgroundColor: colors?.BLUE,
        fontFamily: fonts?.REGULAR,
        fontSize: 18,
        padding: 5,
    }
});

