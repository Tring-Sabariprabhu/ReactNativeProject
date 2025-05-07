import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from 'src/Assets/Enums/colors';
import { fonts } from 'src/Assets/Fonts';
import { setUser } from 'src/Redux/userSlice';
import { CustomPopup, CustomPopupTypes } from './CustomPopup/CustomPopup';



export const DrawerContent = (props: DrawerContentComponentProps) => {
    const dispatch = useDispatch();
    const [confirmPopup, setConfirmPopup] = useState(false);

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        dispatch(setUser({}));
        setConfirmPopup(false);
    };
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <View style={style?.container}>
                <View>
                    <View style={style?.header}>
                        <Text style={style?.headerTitle}>Header</Text>
                    </View>
                    <View>
                        <DrawerItemList {...props} />
                    </View>
                </View>
                <View style={style?.footer}>
                    <TouchableOpacity onPress={()=> setConfirmPopup(true)}>
                        <Text style={style?.navigator} >
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <CustomPopup
                type={CustomPopupTypes.VIEW}
                isOpen={confirmPopup}
                title={'Your Account logging out now'}
                closeButtonText={'Ok'}
                onClose={logout}
                />
        </DrawerContentScrollView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        // backgroundColor: colors?.BLUE,
    },
    header: {
        padding: 10,
    },
    headerTitle: {
        fontFamily: fonts?.MEDIUM,
        fontSize: 25,
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
