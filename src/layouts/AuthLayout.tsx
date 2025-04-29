import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SigninForm } from '../components/authentication/SigninForm';
import { SignupForm } from '../components/authentication/SignupForm';
import { screens } from '../assets/enums/screens';

export const AuthLayout = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screens?.Signin} screenOptions={{ headerShown: false, animation: 'flip' }} >
        <Stack.Screen name={screens?.Signin} component={SigninForm} />
        <Stack.Screen name={screens?.Signup} component={SignupForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
