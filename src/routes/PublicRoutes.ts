
import { publicScreens } from 'src/assets/enums/screens';
import { SigninScreen } from 'src/components/authentication/SigninScreen';
import { SignupScreen } from 'src/components/authentication/SignupScreen';
export const publicRoutes = [
    {
        name: publicScreens?.Signin,
        component: SigninScreen,
    },
    {
        name: publicScreens?.Signup,
        component: SignupScreen,
    },
];
