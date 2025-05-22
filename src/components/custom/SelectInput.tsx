import { Control, Controller } from 'react-hook-form';
import { Item } from 'react-native-picker-select';
import { colors } from 'src/Assets/Enums/colors';
import { styles } from 'src/Assets/Styles/global';
import Picker from 'react-native-picker-select';
import { Text, TextStyle, View } from 'react-native';
import { ErrorMessage } from './ErrorMessage';

interface SelectInputProps<T> {
    name?: string
    control?: Control<any>
    label?: string
    labelStyle?: TextStyle
    required?: boolean
    placeHolder?: string
    items: Item[]
    errorMessage?: string
    onValuChange?: (value: T, index: number) => void
}
export const SelectInput = <T,>({ items, name, control, label, labelStyle, onValuChange, placeHolder, required, errorMessage }: SelectInputProps<T>) => {

    return (
        <View style={{ gap: 2 }}>
            {label &&
                <Text style={labelStyle}>
                    {label}
                    {required && <Text style={{ color: colors?.RED }}>*</Text>}
                </Text>}
            {(control && name) ?
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <Picker
                            value={field?.value}
                            pickerProps={{ mode: 'dropdown' }}
                            placeholder={{
                                label: placeHolder,
                                value: null,
                            }}
                            style={{ viewContainer: styles?.dropDown, placeholder: { color: colors?.BLACK } }}
                            dropdownItemStyle={styles?.dropDownItem}
                            activeItemStyle={styles?.dropDownItem}
                            onValueChange={field?.onChange}
                            items={items} />
                    )} /> :
                (onValuChange &&
                    <Picker
                        pickerProps={{ mode: 'dropdown' }}
                        placeholder={{
                            label: placeHolder,
                            value: null,
                        }}
                        style={{ viewContainer: styles?.dropDown, placeholder: { color: colors?.BLACK } }}
                        dropdownItemStyle={styles?.dropDownItem}
                        activeItemStyle={styles?.dropDownItem}
                        items={items}
                        onValueChange={onValuChange}/>
                )
            }
            {
                errorMessage &&
                <ErrorMessage message={errorMessage} />
            }
        </View>
    );
};
