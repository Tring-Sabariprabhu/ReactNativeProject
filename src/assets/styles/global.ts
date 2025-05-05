import { StatusBar, StyleSheet } from 'react-native';
import { fonts } from '../Fonts';
export enum colors {
    RED = '#FF2929',
    BLUE = '#0ec1f8',
    DARK_BLUE = '#1B56FD',
    WHITE = '#ffffff',
    LIGHT_GRAY = '#F5F5F5',
    GRAY = '#EFEFEF',
    DARK_GRAY = '#DFD0B8',
}
export const styles = StyleSheet?.create({
    screen: {
        flex: 1,
        paddingTop: StatusBar?.currentHeight,
    },
    textInput: {
        fontFamily: fonts?.LIGHT,
        borderColor: colors?.DARK_GRAY,
        borderWidth: 1,
        borderRadius: 5,
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
