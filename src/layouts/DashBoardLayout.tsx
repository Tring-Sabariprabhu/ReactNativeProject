import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fonts } from 'src/Assets/Fonts';
import { RootState } from 'src/Redux/store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'src/Assets/Enums/colors';
import { useEffect } from 'react';
import { getCurrentUser } from 'src/MockDatabase/MockAPIs/auth';
import { setUser } from 'src/Redux/userSlice';
import { privateScreens } from 'src/Assets/Enums/screens';
import { privateRoutes } from 'src/Routes/privateRoutes';
import { DrawerContent } from 'src/Components/Custom/DrawerContent';

interface DrawerIconProps {
    color: string
    size: number
    iconName: string
}
const DrawerIcon = ({ color, size, iconName }: DrawerIconProps) => (
    <Icon name={iconName} color={color} size={size} />
);


export const DashBaordLayout = () => {
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
    const user = useSelector((state: RootState) => state?.user);
    const Drawer = createDrawerNavigator();

    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName={privateScreens?.Home}
                drawerContent={(props) => <DrawerContent {...props} />}
                screenOptions={
                    {
                        headerTitleStyle: {
                            fontFamily: fonts?.MEDIUM,
                            fontSize: 22,
                        },
                        drawerLabelStyle: {
                            fontFamily: fonts?.LIGHT,
                            fontSize: 20,
                        },
                        headerShadowVisible: false,
                        headerStyle: {
                            borderBottomWidth: 1,
                        },
                        drawerItemStyle: {
                            borderRadius: 10,
                        },
                        drawerActiveTintColor: colors?.DARK_BLUE,
                        drawerType: 'front',
                    }}>
                {privateRoutes?.map((screen, index) => {
                    if (screen?.name === privateScreens?.Home || (user?.user_role && screen?.roles?.includes(user?.user_role))) {
                        return (
                            <Drawer.Screen name={screen?.name}
                                component={screen?.component}
                                key={index}
                                options={
                                    {
                                        ...screen?.options,
                                        drawerIcon: (props) => (
                                            <DrawerIcon {...props} iconName={screen?.iconName} key={index} />
                                        ),
                                    }
                                } />
                        );
                    }
                })
                }
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

