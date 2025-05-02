import { StatusBar, StyleSheet } from 'react-native';
import { fonts } from '../fonts';
export enum colors {
    color_red = '#FF2929',
    color_blue = '#0ec1f8',
    color_dark_blue = '#1B56FD',
    color_white = '#ffffff',
    color_gray = '#EFEFEF',
    color_dark_gray = '#DFD0B8',
}
export const styles = StyleSheet?.create({
    screen: {
        flex: 1,
        paddingVertical: StatusBar?.currentHeight,
    },
    textInput: {
        fontFamily: fonts?.Light,
        borderColor: colors?.color_dark_gray,
        borderWidth: 1,
        borderRadius: 5,
    },
    paragraph: {
        fontFamily: fonts?.Light,
        fontSize: 18,
    },
    error: {
        color: colors?.color_red,
        paddingStart: 10,
        fontFamily: fonts?.Light,
        fontSize: 14,
    },
    button:{
        fontFamily: fonts?.Medium,
    },
});
