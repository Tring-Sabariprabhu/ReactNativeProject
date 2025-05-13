import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
// import { styles } from 'src/Assets/Styles/global';
import { CustomButton, CustomButtonTypes } from '../CustomButton/CustomButton';
import { fonts } from 'src/Assets/Fonts';
import { ReactNode } from 'react';
import { colors } from 'src/Assets/Enums/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export enum CustomPopupTypes {
    SUCCESS = 'success',
    INFO = 'info',
    ERROR = 'error',
    VIEW = 'view',
}
enum PopupColors {
    success = colors?.GREEN,
    info = colors?.BLUE,
    error = colors?.RED,
    view = colors?.DARK_BLUE,
}
enum IconNames {
    success = 'check-circle',
    info = 'info',
    error = 'error',
    view = 'remove-red-eye',
}
interface CustomPopupProps {
    type: CustomPopupTypes
    isOpen: boolean
    closeButtonText: string,
    onClose: () => void,
    title?: string
    titleStyle?: TextStyle
    textBody?: string
    childComponent?: ReactNode
    buttonStyle?: ViewStyle
    buttonTextStyle?: TextStyle
    successButtonText?: string
    onSuccess?: () => void
}
export const CustomPopup = ({ type,
    title,
    titleStyle,
    textBody,
    isOpen,
    onClose,
    closeButtonText,
    onSuccess,
    successButtonText,
    childComponent,
    buttonStyle,
    buttonTextStyle,
}: CustomPopupProps) => {

    return (
        <Modal
            isVisible={isOpen}
            style={style?.modal}>
            <View style={{ ...style?.container, borderColor: PopupColors[type] }}>
                {title &&
                    <View style={style?.heading}>
                        <Icon name={IconNames[type]} color={PopupColors[type]} size={55} style={style?.iconStyle} />
                        <Text style={{ ...style?.headingText, ...titleStyle }}>
                            {title}
                        </Text>
                    </View>}
                {
                    textBody &&
                    <Text style={style?.textBody}>
                        {textBody}
                    </Text>
                }
                {childComponent}
                <View style={style?.modalFooter}>
                    <CustomButton
                        buttonStyle={{ ...style?.button, ...buttonStyle, backgroundColor: PopupColors[type] }}
                        textStyle={{ ...style?.buttonTextStyle, ...buttonTextStyle }}
                        type={CustomButtonTypes.OPASITYBUTTON}
                        title={closeButtonText}
                        onPress={onClose} />
                    {onSuccess &&
                        successButtonText &&
                        <CustomButton
                            buttonStyle={{ ...style?.button, ...buttonStyle, backgroundColor: PopupColors[type] }}
                            textStyle={{ ...style?.buttonTextStyle, ...buttonTextStyle }}
                            type={CustomButtonTypes.OPASITYBUTTON}
                            title={successButtonText}
                            onPress={onSuccess} />}
                </View>
            </View>
        </Modal>
    );
};

const style = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        borderRadius: 50,
        backgroundColor: colors?.WHITE,
        padding: 5,
        position: 'absolute',
        bottom: '85%',
    },
    heading: {
        paddingTop: 10,
        alignItems: 'center',
        gap: 10,
    },
    headingText: {
        fontFamily: fonts?.MEDIUM,
        fontWeight: 600,
        fontSize: 20,
    },
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: colors?.WHITE,
        gap: 10,
    },
    textBody: {
        fontFamily: fonts?.LIGHT,
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 20,
        padding: 10,
    },
    button: {
        borderRadius: 5,
        backgroundColor: colors?.BLUE,
        paddingHorizontal: 10,
    },
    buttonTextStyle: {
        color: colors?.WHITE,
        fontSize: 18,
    },
});
