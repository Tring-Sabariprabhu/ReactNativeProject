import { ActivityIndicator } from 'react-native';
import { colors } from 'src/Assets/Enums/colors';


export const Loader = () => (
    <ActivityIndicator
        size={'large'}
        color={colors?.BLUE}
        style={{flex: 1}} />
);
