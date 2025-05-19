import { StyleSheet, Text, TextStyle, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from 'src/Assets/Enums/colors';

interface CustomCheckboxProps {
    text?: string
    iconSize?: number
    iconColor?: string
    isChecked: boolean
    textStyle?: TextStyle
    onChange: (value: boolean) => void
}

export const CustomCheckbox = ({ text, iconSize, iconColor, onChange, isChecked, textStyle }: CustomCheckboxProps) => {
    return (
        <View style={style?.item}>
            <Icon
                name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={iconSize ? iconSize : 15}
                color={iconColor ? iconColor : colors?.BLACK}
                onPress={() => onChange(!isChecked)} />
            <Text style={[style?.textStyle, textStyle]}>{text}</Text>
        </View>
    );
};
const style = StyleSheet.create({
    item: {
        flexDirection: 'row',
        gap: 5,
    },
    textStyle: {
        fontSize: 16,
    },
});
