import { StyleSheet } from 'react-native';
import { fonts } from '../fonts';
export enum colors {
    color_dark_blue = '#1B56FD',
    color_blue = '#0ec1f8',
    color_white = '#ffffff',
    color_gray = '#EFEFEF',
}
export const styles = StyleSheet?.create({
    screen: {
        flex: 1,
    },
    textInput: {
        borderColor: colors?.color_gray,
        borderWidth: 2,
        borderRadius: 15,
    },
    paragraph: {
        fontFamily: fonts?.Light,
        fontSize: 18,
    },
    button:{
        fontFamily: fonts?.Medium,
        textAlign: 'center',
        borderRadius: 15,
    },
});
