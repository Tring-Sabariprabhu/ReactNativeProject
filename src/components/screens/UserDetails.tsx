import { View, Text, StyleSheet, Image } from 'react-native';
import { fonts } from 'src/Assets/Fonts';
import { getUserImage } from 'src/Assets/Images';
import { styles } from 'src/Assets/Styles/global';
import moment from 'moment';
import { getTime } from 'src/Schema/MomentFunctions';

export const UserDetails = ({ route }) => {

    const { user } = route.params;
    console.log(user);
    if (!user) {
        return <Text>No User found</Text>;
    }
    return (
        <View style={style?.screen}>
            <View style={style?.imageContainer}>
                <Image source={getUserImage(user?.user_role, user?.user_gender)} style={style?.image} />
            </View>
            <View >
                <View style={style?.contentContainer}>
                    <Text style={style?.label}>Name : </Text>
                    <Text style={style?.contentWithCapitalized}>
                        {user?.user_name}
                    </Text>
                </View>
                <View style={style?.contentContainer}>
                    <Text style={style?.label}>Email : </Text>
                    <Text style={style?.content}>
                        {user?.email}
                    </Text>
                </View>
                <View style={style?.contentContainer}>
                    <Text style={style?.label}>Age : </Text>
                    <Text style={style?.content}>
                        {user?.user_age}
                    </Text>
                </View>
                <View style={style?.contentContainer}>
                    <Text style={style?.label}>Gender : </Text>
                    <Text style={style?.contentWithCapitalized}>
                        {user?.user_gender}
                    </Text>
                </View>
                <View style={style?.contentContainer}>
                    <Text style={style?.label}>Phone : </Text>
                    <Text style={style?.contentWithCapitalized}>
                        {user?.telphone}
                    </Text>
                </View>
                {
                    user &&
                    'speciality' in user &&
                    <View style={style?.contentContainer}>
                        <Text style={style?.label}>Speciality : </Text>
                        <Text style={style?.contentWithCapitalized}>
                            {user?.speciality}
                        </Text>
                    </View>
                }
                {
                    user &&
                    'work_days' in user &&
                    user?.work_days &&
                    <View >
                        <Text style={style?.label}>Work days : </Text>
                        {
                            user?.work_days?.map((day, index) => (
                                <Text key={day} style={style?.content}>
                                    {day}
                                </Text>
                            ))
                        }
                    </View>
                }
                {
                    user &&
                    'inTime' in user &&
                    'outTime' in user &&
                    user?.inTime &&
                   <View>
                    <Text style={style?.label}>Work time : </Text>
                     <View>
                        <Text style={style?.content}>
                            {getTime(user?.inTime)} - {getTime(user?.outTime)}
                        </Text>
                    </View>
                   </View>
                }
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    screen: {
        ...styles?.screen,
        gap: 20,
    },
    imageContainer: {
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
    },
    contentContainer: {
        flexDirection: 'row',
    },
    label: {
        ...styles?.capitalizedContent,
        fontFamily: fonts?.REGULAR,
        fontSize: 16,
    },
    content: {
        ...styles?.paragraph,
        fontSize: 16,
    },
    contentWithCapitalized: {
        ...styles?.capitalizedContent,
        fontSize: 16,
    },
});
