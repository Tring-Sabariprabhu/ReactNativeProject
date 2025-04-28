import { Text, TouchableOpacity } from 'react-native';
interface ButtonProps{
    title: string
    style: Object
}
export const ButtonField = ({title, style}: ButtonProps) =>{
    return (
        <TouchableOpacity>
            <Text style={style}>{title}</Text>
        </TouchableOpacity>
    );
};
