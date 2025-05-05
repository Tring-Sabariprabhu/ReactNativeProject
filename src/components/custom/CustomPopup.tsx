import { Image, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { colors, styles } from 'src/Assets/Styles/global';
import { CustomButton, CustomButtonTypes } from './CustomButton/CustomButton';
import { fonts } from 'src/Assets/Fonts';
import { ReactNode } from 'react';

export enum CustomPopupTypes {
    SUCCESS = 'success',
    INFO = 'info',
    ERROR = 'error',
    VIEW = 'view',
}
enum PopupColors {
    'success' = 'green',
    'info' = colors?.BLUE,
    'error' = colors?.RED,
    'view' = colors?.DARK_BLUE,
}
interface CustomPopupProps {
    type: CustomPopupTypes
    isOpen: boolean
    closeButtonText: string
    onClose: () => void,
    title?: string
    textBody?: string
    childComponent?: ReactNode
    successButtonText?: string
    onSuccess?: () => void
}
export const CustomPopup = ({ type, title, textBody, isOpen, onClose, closeButtonText, onSuccess, successButtonText, childComponent }: CustomPopupProps) => {

    return (
        <Modal
            isVisible={isOpen}
            animationIn={'fadeInUpBig'}
            style={style?.modal}>
            <View style={{ ...style?.container, borderColor: PopupColors[type] }}>
                {title &&
                    <View>
                        <Text style={style?.heading}>
                            {title}
                        </Text>
                    </View>}
                {
                    textBody &&
                    <Text style={styles?.paragraph}>
                        {textBody}
                    </Text>
                }
                {childComponent}
                <View style={style?.modalFooter}>
                    <CustomButton
                        buttonStyle={{ ...style?.button, backgroundColor: PopupColors[type] }}
                        textStyle={style?.buttonTextStyle}
                        type={CustomButtonTypes.OPASITYBUTTON}
                        title={closeButtonText}
                        onPress={onClose} />
                    {onSuccess &&
                        successButtonText &&
                        <CustomButton
                            buttonStyle={{ ...style?.button, backgroundColor: PopupColors[type] }}
                            textStyle={style?.buttonTextStyle}
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
    heading: {
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
    button: {
        borderRadius: 5,
        backgroundColor: colors?.BLUE,
        paddingHorizontal: 10,
    },
    buttonTextStyle: {
        fontFamily: fonts?.MEDIUM,
        color: colors?.WHITE,
        fontSize: 18,
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 20,
        paddingVertical: 10,
    },
});
