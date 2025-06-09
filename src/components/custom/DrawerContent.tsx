import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from 'src/Assets/Enums/colors';
import { fonts } from 'src/Assets/Fonts';
import { setUser } from 'src/Redux/userSlice';
import { CustomPopup, CustomPopupTypes } from './CustomPopup/CustomPopup';
import { RootState } from 'src/Redux/store';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { styles } from 'src/Assets/Styles/global';
import { Image } from 'react-native';
import { NavigationProp } from '../Types/navigationProp';
import { getUserImage } from 'src/Assets/Images';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { fontSizes } from 'src/Assets/Styles/fontSizes';

export const DrawerContent = (props: DrawerContentComponentProps) => {
    const user = useSelector((state: RootState) => state?.user);
    const dispatch = useDispatch();
    const [confirmPopup, setConfirmPopup] = useState(false);
    const navigation = useNavigation<NavigationProp>();

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        dispatch(setUser({}));
        setConfirmPopup(false);
    };
    const handleLogout = () => {
        setConfirmPopup(true);
        navigation.dispatch(DrawerActions.closeDrawer());
    };

    return (
        <DrawerContentScrollView contentContainerStyle={style?.container}>
            <View style={style?.container}>
                <View style={style?.topContainer}>
                    <View style={style?.header}>
                        {
                            user?.user_role &&
                            user?.user_gender &&
                            <Image
                                source={getUserImage(user?.user_role, user?.user_gender)}
                                style={style?.image} />
                        }
                        <View>
                            <Text style={style?.headerTitle}>
                                {user?.user_name}
                            </Text>
                            <Text style={style?.content} numberOfLines={1}>
                                {user?.email}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <DrawerItemList {...props} />
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={handleLogout} style={style?.footer}>
                            <Icon name={'reply'} size={style?.navigator?.fontSize + 5}  color={style?.navigator?.color}/>
                            <Text style={style?.navigator}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <CustomPopup
                type={CustomPopupTypes?.INFO}
                isOpen={confirmPopup}
                title={'Do you want to logout ? '}
                closeButtonText={'No'}
                successButtonText={'Yes'}
                onSuccess={logout}
                titleStyle={{fontSize: fontSizes?.heading}}
                onClose={() => setConfirmPopup(false)}
                buttonStyle={styles?.popupButton}
                buttonTextStyle={styles?.popupButtonText}
                primaryColor={colors?.DARK_BLUE} />
        </DrawerContentScrollView>
    );
};

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    image: {
        width: 60,
        height: 60,
    },
    topContainer: {
        gap: 40,
    },
    header: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        padding: 10,
    },
    content: {
        fontFamily: fonts?.LIGHT,
    },
    headerTitle: {
        textTransform: 'capitalize',
        fontFamily: fonts?.REGULAR,
        fontSize: fontSizes?.heading,
    },
    footer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
    },
    navigator: {
        color: colors?.RED,
        fontFamily: fonts?.MEDIUM,
        fontSize: fontSizes?.heading,
    },
    headerTitleStyle: {
        fontFamily: fonts?.MEDIUM,
    },
    drawerLabelStyle: {
        fontFamily: fonts?.REGULAR,
        fontSize: fontSizes?.heading,
    },
    headerStyle: {
        borderBottomWidth: 1,
    },
    drawerItemStyle: {
        borderRadius: 10,
    },
});
