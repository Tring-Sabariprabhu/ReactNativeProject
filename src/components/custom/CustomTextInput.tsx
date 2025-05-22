import { Control, Controller } from 'react-hook-form';
import { Image, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ErrorMessage } from './ErrorMessage';
import { colors } from 'src/Assets/Enums/colors';
import { ReactElement, useState } from 'react';
import visibleIcon from 'src/Assets/Images/visible.png';
import visibleHiddenIcon from 'src/Assets/Images/hide.png';
import { StyleSheet } from 'react-native';

interface TextInputFieldProps {
    name?: string;
    label?: string;
    labelStyle?: TextStyle;
    inputStyle?: TextStyle;
    viewContainerStyle?: ViewStyle,
    required?: boolean;
    control?: Control<any>;
    placeholder?: string;
    keyboardType: 'default' | 'email-address' | 'phone-pad' | 'numeric';
    errMessage?: string;
    autoFocus?: boolean;
    value?: string;
    onChangeText?: (value: string) => void;
    icon?: ReactElement;
    iconStyle?: ViewStyle;
    onIconPress?: () => void;
    isSecureInput?: boolean;
    editable?: boolean
    maxLength?: number;
}

export const CustomTextInput = ({
    viewContainerStyle,
    name,
    label,
    labelStyle,
    required = false,
    control,
    icon,
    value, onChangeText, maxLength,
    placeholder,
    inputStyle,
    keyboardType,
    errMessage,
    editable = true,
    isSecureInput = false }: TextInputFieldProps) => {
    const [visible, setVisible] = useState<boolean>(false);

    const handleChange = (text: string, onChange: (...event: any[]) => void) => {
        if (editable) {
            if (keyboardType === 'numeric') {
                onChange(text.replace(/[^0-9]/g, ''));
            } else {
                onChange(text);
            }
        }
    };
    return (
        <View style={viewContainerStyle}>
            {icon}
            {label &&
                <Text style={labelStyle}>
                    {label}
                    {required &&
                        <Text style={{ color: colors?.RED }}>
                            *
                        </Text>}
                </Text>}
            <View>
                {
                    isSecureInput &&
                    <TouchableOpacity style={textInputStyle?.iconBox} onPress={() => setVisible(!visible)} >
                        <Image source={visible ? visibleIcon : visibleHiddenIcon} style={textInputStyle?.icon} />
                    </TouchableOpacity>
                }
                {
                    (control && name) ?
                        <Controller
                            control={control}
                            name={name}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextInput
                                    {...(isSecureInput && { secureTextEntry: !visible })}
                                    editable={editable}
                                    placeholder={placeholder}
                                    maxLength={maxLength}
                                    style={inputStyle}
                                    keyboardType={keyboardType}
                                    onChangeText={(text)=> handleChange(text, onChange)}
                                    value={value}
                                    onBlur={onBlur}
                                    autoCorrect={false}
                                />)} /> :
                        <TextInput
                            secureTextEntry={visible}
                            editable={editable}
                            placeholder={placeholder}
                            maxLength={maxLength}
                            style={inputStyle}
                            keyboardType={keyboardType}
                            value={value}
                            {...(onChangeText && {onChangeText:(text)=> handleChange(text, onChangeText)})}
                            autoCorrect={false}
                        />}
            </View>
            {
                errMessage &&
                <ErrorMessage message={errMessage} />
            }
        </View>
    );
};

const textInputStyle = StyleSheet.create({
    iconBox: {
        opacity: 0.5,
        width: 30,
        height: 30,
        position: 'absolute',
        right: 20,
        top: 12,
        zIndex: 10,
    },
    icon: {
        width: '100%',
        height: '100%',
    },
});
