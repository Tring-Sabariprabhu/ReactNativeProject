import { Control, Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { styles } from 'src/assets/styles/global';
import { ErrorMessage } from './ErrorMessage';
interface TextInputFieldProps {
    name: string
    control: Control<any>
    placeholder: string
    style: Object
    keyboardType: 'default' | 'email-address' | 'phone-pad' | 'numeric'
    errMessage?: string,
    autoFocus?: boolean
}
export const CustomTextInput = ({name, control, placeholder, style, keyboardType, errMessage, autoFocus = false}: TextInputFieldProps) => {
    return (
        <View>
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange, onBlur }})=>(
                <TextInput
                    autoFocus={autoFocus}
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
