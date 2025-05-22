import { ActivityIndicator, ViewStyle } from 'react-native';
import { colors, PRIMARY_COLOR } from 'src/Assets/Enums/colors';

interface LoaderProps {
    style?: ViewStyle
    color?: string
    size?: number | 'large' | 'small'
}
export const Loader = ({ style, color, size = 'large' }: LoaderProps) => (
    <ActivityIndicator
        size={size}
        color={color || PRIMARY_COLOR}
        style={[{ flex: 1 }, style]} />
);
