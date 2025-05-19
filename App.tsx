/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  View,
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
import { KeyboardAvoidingView } from 'react-native';
import UserInactivity from 'react-native-user-inactivity';
import { CustomPopup, CustomPopupTypes } from 'src/Components/Custom/CustomPopup/CustomPopup';
import { styles } from 'src/Assets/Styles/global';
import SplashScreen from 'react-native-splash-screen';
import { colors } from 'src/Assets/Enums/colors';

function App(): React.JSX.Element {
  const [token, setToken] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state?.user);

  useEffect(()=>{
    SplashScreen.hide();
    setLoading(true);
  },[]);

  const fetchToken = () => {
    setLoading(true);
    AsyncStorage?.getItem('token').then((data) => {
      setLoading(false);
      if (data) {
        setToken(data);
      } else {
        setToken(null);
      }
    });
  };
  useEffect(() => {
    fetchToken();
  }, [user]);


  const [active, setActive] = useState(true);
  const timer = 100000;
  const [showPopup, setShowPopup] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 , backgroundColor: colors?.WHITE}}>
        <KeyboardAvoidingView
          behavior={'height'}
          style={{ flex: 1 }}>
          <UserInactivity
            isActive={active}
            timeForInactivity={timer}
            onAction={(isActive) => {
              console.log('User activity state: ', isActive);
              setShowPopup(!isActive);
              setActive(isActive);
            }}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
            />
            {
              loading ?
                <Loader  size={60}/> :
                (showPopup ?
                  <View >
                    <CustomPopup
                      type={CustomPopupTypes.INFO}
                      isOpen={showPopup}
                      title={'InActivity Timeout'}
                      closeButtonText={'Ok'}
                      onClose={() => setShowPopup(false)}
                      buttonStyle={styles?.popupButton}
                      buttonTextStyle={styles?.popupButtonText}/>
                  </View> :
                  (token ?
                    <DashBaordLayout /> :
                        <AuthLayout />)
                )

            }
          </UserInactivity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
