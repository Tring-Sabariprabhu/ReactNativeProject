
import { publicScreens } from 'src/Assets/Enums/screens';
import { SigninScreen } from 'src/Components/Authentication/SigninScreen';
import { SignupScreen } from 'src/Components/Authentication/SignupScreen';
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
