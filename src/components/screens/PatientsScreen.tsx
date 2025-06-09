import { getAllPatients, getPatientsCount } from 'src/MockDatabase/MockAPIs/users';
import { CustomList } from '../Custom/CustomList/CustomList';
import { useNavigation } from '@react-navigation/native';
import { style } from 'src/Assets/Styles/list';
import { Image, Text, View } from 'react-native';
import { UserGender, UserRole } from 'src/MockDatabase/Enums/users';
import { PRIMARY_COLOR } from 'src/Assets/Enums/colors';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import { NavigationProp } from '../Types/navigationProp';
import { screens } from 'src/Assets/Enums/screens';
import { getUserImage } from 'src/Assets/Images';

export const PatientsScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const limit = 6;

    return (
        <View style={style?.screen}>
            {
                <CustomList
                    searchPlaceholder={'patient name'}
                    listDirection={'column'}
                    listStyle={style?.listContainer}
                    limit={limit}
                    fetchListItemsCount={(props) => (
                        getPatientsCount({
                            search: props?.searchInput,
                        })
                    )}
                    fetchListItems={(props) => (
                        getAllPatients({
                            limit: limit,
                            offset: props?.offset,
                            search: props?.searchInput,
                        })
                    )}
                    renderItem={({ item: patient }) => (
                        <TouchableOpacity style={style?.listItem}
                            onPress={() => {
                                navigation?.navigate(screens?.UserDetails, {
                                    user: patient,
                                });
                            }}
                            key={patient?.user_id}>
                            <View style={[style?.contentView, { flex: 3 }]}>
                                <Text style={[style?.listItemContent, { color: PRIMARY_COLOR }]}>
                                    {patient?.user_name}
                                </Text>
                                <View style={style?.rowView}>
                                    <Icon name={'phone-call'} size={16} style={style?.icon} />
                                    <Text style={style?.listItemContent2}>
                                        {patient?.telphone}
                                    </Text>
                                </View>
                            </View>
                            <View style={style?.imageView}>
                                {patient?.user_role && patient?.user_gender &&
                                    <Image
                                        source={getUserImage(patient?.user_role as UserRole, patient?.user_gender as UserGender)}
                                        style={style?.image} />}
                            </View>
                        </TouchableOpacity>
                    )} />
            }
        </View>
    );
};

