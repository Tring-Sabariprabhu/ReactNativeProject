/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { isDarkMode } from './src/Assets/Enums/theme';
import { AuthLayout } from './src/Layouts/AuthLayout';
import { RootState } from 'src/Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { DashBaordLayout } from 'src/Layouts/DashBoardLayout';

import { setUser } from 'src/Redux/userSlice';
import { getCurrentUser } from 'src/MockDatabase/MockAPIs/auth';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from 'src/Assets/Styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): React.JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser().then((user) => {
      dispatch(setUser({
        user_id: user?.user_id,
        user_name: user?.user_name,
        user_role: user?.user_role,
        user_age: user?.user_age,
        user_gender: user?.user_gender,
        email: user?.email,
      }));
    });
  }, [dispatch]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const user = useSelector((state: RootState) => state.user);
  // AsyncStorage.clear();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {
          user?.email ? <DashBaordLayout /> : <AuthLayout />
        }
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
