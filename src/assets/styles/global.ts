import { StatusBar, StyleSheet } from 'react-native';
import { fonts } from '../Fonts';
import { colors } from '../Enums/colors';

export const styles = StyleSheet?.create({
    screen: {
        flex: 1,
        paddingTop: StatusBar?.currentHeight,
    },
    textInput: {
        fontFamily: fonts?.LIGHT,
        borderColor: colors?.LIGHT_GRAY,
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
        paddingStart: 10,
        fontFamily: fonts?.LIGHT,
        fontSize: 14,
    },
    button:{
        fontFamily: fonts?.MEDIUM,
    },
});

