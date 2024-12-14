import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, ViewStyle, TextStyle, StyleProp, TouchableOpacity } from 'react-native';
import { FeIcon, myColors, myFonts } from '../../utils';

interface InputProps extends TextInputProps {
    title?: string,
    style?: StyleProp<ViewStyle>,
    isPassword?: boolean,
    inpStyle?: StyleProp<TextStyle>,
}

export default function Input({ title, style, isPassword = false, inpStyle, ...inpProps }: InputProps) {
    const isMultiline = inpProps?.multiline || false
    const [isShowPassword, setIsShowPassword] = useState(isPassword)

    function onShow() {
        setIsShowPassword(!isShowPassword)
    }

    return (
        <>
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={[styles.container, style]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput style={[styles.inp, inpStyle, {
                        minHeight: isMultiline ? 100 : 'auto',
                        textAlignVertical: isMultiline ? 'top' : 'center',
                    }]}
                        placeholderTextColor={myColors.gray}
                        secureTextEntry={isShowPassword}
                        {...inpProps}
                    />
                    {isPassword &&
                        <TouchableOpacity onPress={onShow}>
                            <FeIcon name={isShowPassword ? 'eye' : 'eye-off'} size={20} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    inp: {
        flex: 1,
        fontFamily: myFonts.dmsans,
    },
    title: {
        fontFamily: myFonts.dmsansSemibold,
        color: myColors.black,
        fontSize: 16
    },
    container: {
        borderColor: myColors.lightGray,
        borderWidth: 1.5,
        borderRadius: 8,
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 4
    },
})