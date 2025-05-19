import { Text, TextStyle, TouchableHighlight, TouchableOpacity } from 'react-native';
export enum CustomButtonTypes {
    NORMALBUTTON = 'NORMALBUTTON',
    HIGHLIGHTBUTTON = 'HIGHLIGHTBUTTON',
    OPASITYBUTTON = 'OPASITYBUTTON',
}
export interface NormalButtonProps {
    title: string
    disableMode?: boolean
    buttonStyle?: Object
    textStyle?: TextStyle
    onPress?: () => void
    onLongPress?: () => void
    onPressIn?: () => void
    onPressOut?: () => void
}
export interface HighlightProps {
    highlightProps?: {
        underlayColor?: string
        activeOpasity?: number
        onShowUnderlay?: () => void
        onHideUnderlay?: () => void
    }
}
export interface OpasityProps {
    opasityProps?: {
        activeOpasity?: number
    }
}
interface CustomButtonProps extends NormalButtonProps, OpasityProps, HighlightProps {
    type: CustomButtonTypes
}

export const CustomButton = (
    {
        type,
        disableMode = false,
        title,
        buttonStyle,
        textStyle,
        onPress,
        onPressIn,
        onPressOut,
        onLongPress,
        highlightProps,
        opasityProps }: CustomButtonProps) => {

    switch (type) {
        case CustomButtonTypes?.HIGHLIGHTBUTTON:
            return <TouchableHighlight
                disabled={disableMode}
                style={buttonStyle}
                onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                underlayColor={highlightProps?.underlayColor}
                onShowUnderlay={highlightProps?.onShowUnderlay}
                onHideUnderlay={highlightProps?.onHideUnderlay}
                activeOpacity={highlightProps?.activeOpasity}
                children={
                    <NormalButton title={title}
                        textStyle={textStyle} />} />;
        case CustomButtonTypes?.OPASITYBUTTON:
            return <TouchableOpacity
                disabled={disableMode}
                style={buttonStyle}
                onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                activeOpacity={opasityProps?.activeOpasity}
                children={
                    <NormalButton title={title}
                        textStyle={textStyle} />} />;
        default:
            return <NormalButton title={title}
                disableMode={disableMode}
                buttonStyle={buttonStyle}
                textStyle={textStyle}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onLongPress={onLongPress}
            />;
    }
};
const NormalButton = ({ title, buttonStyle, disableMode, textStyle, onPress, onLongPress, onPressIn, onPressOut }: NormalButtonProps) => (
    <Text style={[buttonStyle, textStyle]}
        disabled={disableMode}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        children={title} />
);

