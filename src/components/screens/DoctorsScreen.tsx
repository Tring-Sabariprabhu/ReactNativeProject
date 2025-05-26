import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import { getAllDoctors, getDoctorsCount } from 'src/MockDatabase/MockAPIs/users';
import { useNavigation } from '@react-navigation/native';
import { CustomList } from '../Custom/CustomList/CustomList';
import { style } from 'src/Assets/Styles/list';
import cardiology from 'src/Assets/Images/cardiology.png';
import dermatology from 'src/Assets/Images/dermatology.png';
import { DoctorSpecialists } from 'src/MockDatabase/Enums/doctors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR } from 'src/Assets/Enums/colors';
import { NavigationProp } from '../Types/NavigationProp';
import { screens } from 'src/Assets/Enums/screens';
import { getTime } from 'src/Schema/MomentFunctions';
import { getWorkdaysFormat } from 'src/Schema/Workdays';

export const DoctorsScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const limit = 5;

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
                fetchListItemsCount={(props) => (
                    getDoctorsCount({
                        search: props?.searchInput,
                    })
                )}
                fetchListItems={(props) => (
                    getAllDoctors({
                        limit: props?.limit,
                        offset: props?.offset,
                        search: props?.searchInput,
                    })
                )}
                renderItem={({ item: doctor }) => (
                    <TouchableOpacity style={style?.listItem}
                        onPress={() =>
                            navigation?.navigate(screens?.UserDetails,
                                {
                                    user: doctor,
                                })
                        }
                        key={doctor?.doctor_id}>
                        <View style={style?.contentView}>
                            <View style={style?.view}>
                                <Text style={[style?.listItemHeading, { color: PRIMARY_COLOR }]}>
                                    Dr.
                                </Text>
                                <Text style={[style?.listItemHeading, { color: PRIMARY_COLOR }]} numberOfLines={1}>
                                    {doctor?.user_name}
                                </Text>
                            </View>
                            <Text style={[style?.listItemContent2]}>
                                {doctor?.speciality}
                            </Text>
                            <View style={style?.rowView}>
                                <Icon name={'today'} size={18} style={style?.icon} />
                                {
                                    doctor?.work_days &&
                                    <Text style={[style?.listItemContent3]}>
                                        {getWorkdaysFormat(doctor?.work_days)}
                                    </Text>
                                }
                            </View>
                        </View>
                        <View style={style?.imageView}>
                            <Image
                                source={getSpecialityImage(doctor?.speciality)}
                                style={style?.image}
                            />
                            {
                                <View style={style?.rowView}>
                                    <Icon name={'access-time'} size={style?.listItemContent3?.fontSize} style={style?.icon} />
                                    <Text style={[style?.listItemContent3]}>
                                        {
                                            (doctor?.inTime && doctor?.outTime) ?
                                                getTime(doctor?.inTime) + ' - ' + getTime(doctor?.outTime) :
                                                '12:00 PM - 2:00 PM'
                                        }
                                    </Text>
                                </View>
                            }
                        </View>
                    </TouchableOpacity>
                )} />
        </View>
    );
};

