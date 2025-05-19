import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import { styles } from 'src/Assets/Styles/global';
import { getAllDoctors, getDoctorsCount } from 'src/MockDatabase/MockAPIs/users';
import { useEffect, useState } from 'react';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup/CustomPopup';
import { User } from 'src/MockDatabase/Types/Types';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../Authentication/SigninScreen';
import { ViewUser } from '../Custom/ViewUser';
import { CustomList } from '../Custom/CustomList/CustomList';
import { style } from 'src/Assets/Styles/list';
import cardiology from 'src/Assets/Images/cardiology.png';
import dermatology from 'src/Assets/Images/dermatology.png';
import { DoctorSpecialists } from 'src/MockDatabase/Enums/users';
import  Icon  from 'react-native-vector-icons/Feather';
import { PRIMARY_COLOR } from 'src/Assets/Enums/colors';

export const DoctorsScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<User | undefined>();
    const [totalCount, setTotalCount] = useState<number>();
    const limit = 5;

    const fetchTotalCount = (search?: string) => {
        setTotalCount(getDoctorsCount({
            search: search,
        }));
    };

    useEffect(() => {
        navigation?.addListener('focus', () => {
            fetchTotalCount();
        });
    }, [navigation]);

    const getSpecialityImage = (speciality: string | undefined): ImageSourcePropType | undefined => {
        if (speciality as DoctorSpecialists) {
            switch (speciality) {
                case DoctorSpecialists?.CARDIOLOGY:
                    return cardiology;
                case DoctorSpecialists?.DERMATOLOGY:
                    return dermatology;
            }
        }
    };
    return (
        <View style={style?.screen}>
            <CustomList
                listDirection={'column'}
                listStyle={style?.listContainer}
                limit={limit}
                searchPlaceholder={'doctor name'}
                totalCount={totalCount}
                fetchListItemsCount={(props)=>{
                  fetchTotalCount(props?.searchInput);
                }}
                fetchListItems={(props) => (
                    getAllDoctors({
                        limit: props?.limit,
                        offset: props?.offset,
                        search: props?.searchInput,
                    })
                )}
                renderItem={({ item: doctor }) => (
                    <TouchableOpacity style={style?.listItem}
                        onPress={()=> {
                            setSelectedDoctor(doctor);
                            setShowPopup(true);
                        }}
                        key={doctor?.doctor_id}>
                        <View style={style?.contentView}>
                            <View style={style?.view}>
                                <Text style={[style?.listItemHeading, { color: PRIMARY_COLOR }]}>
                                    Dr.
                                </Text>
                                <Text style={[style?.listItemContent, { color: PRIMARY_COLOR }]} numberOfLines={1}>
                                    {doctor?.user_name}
                                </Text>
                            </View>
                            <View style={style?.view}>
                                <Text style={[style?.listItemContent2]}>
                                    {doctor?.speciality}
                                </Text>
                            </View>
                            <View style={style?.view}>
                                <Icon name={'phone-call'} size={16} style={style?.icon}/>
                                <Text style={[style?.listItemContent2]}>
                                    {doctor?.telphone}
                                </Text>
                            </View>
                        </View>
                        <View style={style?.imageView}>
                            <Image
                                source={getSpecialityImage(doctor?.speciality)}
                                style={style?.image}
                            />
                        </View>
                    </TouchableOpacity>
                )} />
            <CustomPopup
                type={CustomPopupTypes?.INFO}
                title={'Doctor details'}
                titleStyle={{ fontSize: 25 }}
                isOpen={showPopup}
                closeButtonText={'Ok'}
                onClose={() => setShowPopup(false)}
                childComponent={ViewUser(selectedDoctor)}
                buttonStyle={styles?.popupButton}
                buttonTextStyle={styles?.popupButtonText} />
        </View>
    );
};

