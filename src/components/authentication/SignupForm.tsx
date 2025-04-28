import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../assets/styles/global';
import { ButtonField } from '../custom/ButtonField';
import { NavigationProp, SigninFormStyles } from './SigninForm';
import logo from '../../assets/images/galaxy_logo.png';
import {  useNavigation } from '@react-navigation/native';
import { TextInputField } from '../custom/TextInputField';

export const SignupForm = () => {
    const navigation = useNavigation<NavigationProp>();
    return (
        <View style={SigninFormStyles?.screen}>
            <View style={SigninFormStyles.imageContainer}>
                <Image source={logo} style={SigninFormStyles?.image}/>
            </View>
            <View style={SigninFormStyles?.container}>
                <Text style={SigninFormStyles?.heading}>Sign up</Text>
                <TextInputField placeholder={'Name'} style={SigninFormStyles?.textInput}/>
                <TextInputField placeholder={'Email'} style={SigninFormStyles?.textInput}/>
                <TextInputField placeholder={'Age'} style={SigninFormStyles?.textInput}/>
                <TextInputField placeholder={'Password'} style={SigninFormStyles?.textInput}/>
                <TextInputField placeholder={'Confirm password'} style={SigninFormStyles?.textInput}/>
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
