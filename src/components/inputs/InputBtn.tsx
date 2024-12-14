import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, ViewStyle, TextStyle, StyleProp, TouchableOpacity } from 'react-native';
import { FeIcon, myColors, myFonts } from '../../utils';

interface InputProps extends TextInputProps {
    title?: string,
    value?: string,
    style?: StyleProp<ViewStyle>,
    onPress?: (ev: any) => void
}

export default function Input({ title, style, value, onPress }: InputProps) {

    return (
        <>
            {title && <Text style={styles.title}>{title}</Text>}
            <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.value}>{value}</Text>
                </View>
            </TouchableOpacity >
        </>
    )
}

const styles = StyleSheet.create({
    value: {
        marginVertical: 8,
        fontFamily: myFonts.dmsans,
        color: myColors.gray
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