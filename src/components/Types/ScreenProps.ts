import { screens } from 'src/Assets/Enums/screens';

export interface ScreenProps {
    name: screens;
    component: React.ComponentType;
    options?: {
        headerTitle: string;
        title: string;
    }
    iconName?: string
    iconFamily?: 'MaterialIcons' | 'FontAwesome',
    childRoutes?: ScreenProps[]
}
