import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../../assets/styles/global';
import { ButtonField } from '../custom/ButtonField';
import { NavigationProp, SigninFormStyles } from './SigninForm';
import logo from '../../assets/images/galaxy_logo.png';
import {  useNavigation } from '@react-navigation/native';

export const SignupForm = () => {
    const navigation = useNavigation<NavigationProp>();
    return (
        <View style={SigninFormStyles?.screen}>
            <View style={SigninFormStyles.imageContainer}>
                <Image source={logo} style={SigninFormStyles?.image}/>
            </View>
            <View style={SigninFormStyles?.container}>
                <Text style={SigninFormStyles?.heading}>Sign up</Text>
                <View>
                    <TextInput placeholder="Name" style={SigninFormStyles?.textInput} />
                </View>
                <View>
                    <TextInput placeholder="Email" style={SigninFormStyles?.textInput} />
                </View>
                <View>
                    <TextInput placeholder="Password" style={SigninFormStyles?.textInput} />
                </View>
                <View>
                    <TextInput placeholder="Confirm password" style={SigninFormStyles?.textInput} />
                </View>
                <ButtonField title={'Sign up'} style={SigninFormStyles?.button}/>
                <View style={SigninFormStyles?.footer}>
                    <Text style={styles?.text}>
                        Already have an Account?
                    </Text>
                    <TouchableOpacity>
                        <Text style={SigninFormStyles?.navigator}
                            onPress={()=> navigation?.navigate('Signin')}>
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
