import { Control, Controller } from 'react-hook-form';
import { TextInput, View } from 'react-native';
interface TextInputFieldProps {
    name: string
    control: Control<any>
    placeholder: string
    style: Object
    keyboardType: 'default' | 'email-address' | 'phone-pad' | 'numeric'
}
export const CustomTextInput = ({name, control, placeholder, style, keyboardType}: TextInputFieldProps) => {
    return (
        <View>
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange, onBlur }})=>(
                <TextInput
                    placeholder={placeholder}
                    style={style}
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    />
            )}/>
        </View>
    );
};
