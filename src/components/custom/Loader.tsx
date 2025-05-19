import { ActivityIndicator, ViewStyle } from 'react-native';
import { colors, PRIMARY_COLOR } from 'src/Assets/Enums/colors';

interface LoaderProps {
    style?: ViewStyle
    color?: string
    size?: number
}
export const Loader = ({ style, color, size }: LoaderProps) => (
    <ActivityIndicator
        size={size ? size : 'large'}
        color={color ? color : PRIMARY_COLOR}
        style={[{ flex: 1 }, style]} />
);
