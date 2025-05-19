import { useEffect, useState } from 'react';
import { styles } from 'src/Assets/Styles/global';
import { getAllPatients, getDoctorsCount, getPatientsCount } from 'src/MockDatabase/MockAPIs/users';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup/CustomPopup';
import { Patient, ViewUser } from '../Custom/ViewUser';
import { CustomList } from '../Custom/CustomList/CustomList';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../Authentication/SigninScreen';
import { User } from 'src/MockDatabase/Types/Types';
import { style } from 'src/Assets/Styles/list';
import { Image, Text, View } from 'react-native';
import male from 'src/Assets/Images/man.png';
import female from 'src/Assets/Images/woman.png';
import { UserGender } from 'src/MockDatabase/Enums/users';
import { colors, PRIMARY_COLOR } from 'src/Assets/Enums/colors';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';

export const PatientsScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<User>();
    const [totalCount, setTotalCount] = useState<number>();
    const limit = 6;

    const fetchTotalCount = (search?: string) => {
        setTotalCount(getPatientsCount({
            search: search,
        }));
    };

    useEffect(() => {
        navigation?.addListener('focus', () => {
            fetchTotalCount();
        });
    }, [navigation]);


    return (
        <View style={style?.screen}>
            {
                <CustomList
                    searchPlaceholder={'patient name'}
                    listDirection={'column'}
                    listStyle={style?.listContainer}
                    limit={limit}
                    totalCount={totalCount}
                    fetchListItemsCount={(props) => (
                        fetchTotalCount(props?.searchInput)
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
                                setSelectedPatient(patient);
                                setShowPopup(true);
                            }}
                            key={patient?.user_id}>
                            <View style={[style?.contentView, { flex: 3 }]}>
                                <Text style={[style?.listItemContent, { color: PRIMARY_COLOR }]}>
                                    {patient?.user_name}
                                </Text>
                                <View style={style?.view}>
                                    <Icon name={'phone-call'} size={16} style={style?.icon} />
                                    <Text style={style?.listItemContent2}>
                                        {patient?.telphone}
                                    </Text>
                                </View>
                            </View>
                            <View style={style?.imageView}>
                                <Image
                                    source={patient?.user_gender === UserGender?.MALE ? male : female}
                                    style={[style?.image, style?.icon]} />
                            </View>
                        </TouchableOpacity>
                    )} />
            }
            <CustomPopup
                type={CustomPopupTypes?.INFO}
                title={'Patient details'}
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                closeButtonText={'Ok'}
                childComponent={ViewUser(selectedPatient)}
                buttonStyle={styles?.popupButton}
                buttonTextStyle={styles?.popupButtonText} />
        </View>
    );
};

