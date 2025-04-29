/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { isDarkMode } from './src/assets/enums/theme';
import { AuthLayout } from './src/layouts/AuthLayout';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { DashBaordLayout } from 'src/layouts/DashBoardLayout';

import { setUser } from 'src/redux/userSlice';
import { getCurrentUser } from 'src/mockDatabase/mockAPIs/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): React.JSX.Element {
  const dispatch = useDispatch();
    useEffect(() => {
        getCurrentUser().then((user) => {
            dispatch(setUser({
                user_id: user?.user_id,
                user_name: user?.user_name,
                email: user?.email,
                age: user?.age,
            }));
        });
    }, [dispatch]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const user = useSelector((state: RootState)=> state.user);
  // AsyncStorage.clear();
  return (
    <AlertNotificationRoot>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {
          user?.email ? <DashBaordLayout/> : <AuthLayout/>
        }
      </SafeAreaView>
    </AlertNotificationRoot>
  );
}

export default App;
