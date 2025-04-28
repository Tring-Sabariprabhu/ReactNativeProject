import { TextInput, View } from 'react-native';
interface TextInputFieldProps {
    placeholder: string
    style: Object
}
export const TextInputField = ({placeholder, style}: TextInputFieldProps) => {
    return (
        <View>
            <TextInput placeholder={placeholder} style={style} />
        </View>
    );
};
