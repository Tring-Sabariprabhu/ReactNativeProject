import { Text } from 'react-native';
import { styles } from 'src/Assets/Styles/global';
interface ErrorMessageProps{
    message: string
}
export const ErrorMessage = ({message}: ErrorMessageProps)=>(
    <Text style={styles?.error}>
        {message}
    </Text>
);
