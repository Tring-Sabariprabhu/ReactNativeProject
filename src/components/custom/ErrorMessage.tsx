import { Text } from 'react-native';
import { styles } from 'src/assets/styles/global';
interface ErrorMessageProps{
    message: string
}
export const ErrorMessage = ({message}: ErrorMessageProps)=>(
    <Text style={styles?.error}>
        {message}
    </Text>
);
