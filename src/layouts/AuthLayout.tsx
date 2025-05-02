import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { publicRoutes } from 'src/routes/PublicRoutes';
import { publicScreens } from 'src/assets/enums/screens';

export const AuthLayout = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={publicScreens?.Signin}
        screenOptions={
        {
          headerShown: false,
          animation: 'flip',
          }} >
        {
          publicRoutes?.map((screen, index)=> (
            <Stack.Screen name={screen?.name} component={screen?.component} key={index}/>
          ))
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
