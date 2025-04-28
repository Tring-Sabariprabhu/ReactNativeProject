import { StyleSheet } from 'react-native';
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
        backgroundColor: colors?.color_gray,
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
    },
    button:{
        cursor: 'pointer',
        textAlign: 'center',
        borderRadius: 8,
    },
});
