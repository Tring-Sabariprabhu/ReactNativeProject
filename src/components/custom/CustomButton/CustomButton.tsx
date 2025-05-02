import { Text, TextStyle, TouchableHighlight, TouchableOpacity } from 'react-native';
export enum CustomButtonTypes {
    NORMALBUTTON = 'NORMALBUTTON',
    HIGHLIGHTBUTTON = 'HIGHLIGHTBUTTON',
    OPASITYBUTTON = 'OPASITYBUTTON',
}
export interface NormalButtonProps{
    title: string
    buttonStyle?: Object
    textStyle?: TextStyle
    onPress?: () => void
    onLongPress?: ()=> void
    onPressIn?: ()=>void
    onPressOut?: ()=>void
}
export interface HighlightProps {
    highlightProps?: {
        underlayColor?: string
        activeOpasity?: number
        onShowUnderlay?: ()=>void
        onHideUnderlay?: ()=>void
    }
}
export interface OpasityProps{
    opasityProps?: {
        activeOpasity?: number
    }
}
interface CustomButtonProps extends NormalButtonProps, OpasityProps, HighlightProps{
    type: CustomButtonTypes
}

export const CustomButton = (
    {
        type,
        title,
        buttonStyle,
        textStyle,
        onPress,
        onPressIn,
        onPressOut,
        onLongPress,
        highlightProps,
        opasityProps }: CustomButtonProps) => {

    switch(type){
        case CustomButtonTypes?.HIGHLIGHTBUTTON:
            return <TouchableHighlight
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
                                     textStyle={textStyle}/>}/>;
        case CustomButtonTypes?.OPASITYBUTTON:
            return <TouchableOpacity
                        style={buttonStyle}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        activeOpacity={opasityProps?.activeOpasity}
                        children={
                            <NormalButton title={title}
                                    textStyle={textStyle} />}/>;
        default:
            return <NormalButton title={title}
                        buttonStyle={buttonStyle}
                        textStyle={textStyle}
                        onPress={onPress}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        onLongPress={onLongPress}
                        />;
    }
};
const NormalButton = ({title, buttonStyle, textStyle, onPress, onLongPress, onPressIn, onPressOut}: NormalButtonProps)=>(
    <Text style={[buttonStyle, textStyle]}
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onLongPress={onLongPress}
            children={title}/>
);

