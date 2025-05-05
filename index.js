/**
 * @format
 */

import { ActivityIndicator, AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from 'src/Redux/store';
import { AlertNotificationRoot } from 'react-native-alert-notification';

AppRegistry.registerComponent(appName, () => index);
const index = () => (
    <Provider store={store}>
        <AlertNotificationRoot>
            <App />
        </AlertNotificationRoot>
    </Provider>
);
