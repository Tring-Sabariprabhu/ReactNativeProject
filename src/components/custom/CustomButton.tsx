import { Text, TouchableOpacity } from 'react-native';
interface ButtonProps{
    title: string
    style: Object
    onPress: ()=> void
}
export const CustomButton = ({title, style, onPress}: ButtonProps) =>{
    return (
        <TouchableOpacity>
            <Text style={style} onPress={onPress}>{title}</Text>
        </TouchableOpacity>
    );
};
