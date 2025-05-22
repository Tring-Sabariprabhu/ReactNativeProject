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
import { UserGender, UserRole } from 'src/MockDatabase/Enums/users';
import { NavigationProp } from '../Types/NavigationProp';
import { getUserImage } from 'src/Assets/Images';

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
                            <Text style={style?.content}>
                                {user?.email}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <DrawerItemList {...props} />
                    </View>
                </View>
                <View style={style?.footer}>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={style?.navigator} >
                            Logout
                        </Text>
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
                onClose={() => setConfirmPopup(false)}
                buttonStyle={styles?.popupButton}
                buttonTextStyle={styles?.popupButtonText} />
        </DrawerContentScrollView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    image: {
        width: 80,
        height: 80,
    },
    topContainer: {
        gap: 20,
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
        fontSize: 23,
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigator: {
        color: colors?.RED,
        fontFamily: fonts?.MEDIUM,
        fontSize: 22,
    },
});
