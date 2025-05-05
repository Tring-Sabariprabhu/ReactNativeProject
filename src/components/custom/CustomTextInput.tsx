import { Control, Controller } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { ErrorMessage } from './ErrorMessage';
interface TextInputFieldProps {
    name: string
    control: Control<any>
    placeholder?: string
    style: Object
    keyboardType: 'default' | 'email-address' | 'phone-pad' | 'numeric'
    errMessage?: string,
    autoFocus?: boolean
}

export const CustomTextInput = ({name, control, placeholder, style, keyboardType, errMessage}: TextInputFieldProps) => {
    return (
        <View>
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange, onBlur }})=>(
                <TextInput
                    autoCorrect={false}
                    placeholder={placeholder}
                    style={style}
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    />
            )}/>
            {
                errMessage &&
                <ErrorMessage message={errMessage}/>
            }
        </View>
    );
};
