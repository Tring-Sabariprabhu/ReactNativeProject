/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { isDarkMode } from './src/Assets/Enums/theme';
import { AuthLayout } from './src/Layouts/AuthLayout';
import { DashBaordLayout } from 'src/Layouts/DashBoardLayout';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loader } from 'src/Components/Custom/Loader';
import { useSelector } from 'react-redux';
import { RootState } from 'src/Redux/store';

function App(): React.JSX.Element {
  const [token, setToken] = useState<string | null>();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState)=> state?.user);

  const fetchToken = () => {
    setLoading(true);
    AsyncStorage?.getItem('token').then((data) => {
      setLoading(false);
      if (data) {
        setToken(data);
      }else{
        setToken(null);
      }
    });
  };
  useEffect(() => {
    fetchToken();
  }, [user]);

  // AsyncStorage.clear();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
        />
        {
          loading ? <Loader /> :
            (token ?
              <DashBaordLayout  /> :
              <AuthLayout />)
        }
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
