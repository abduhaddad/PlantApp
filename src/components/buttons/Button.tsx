import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { FeIcon, IoIcon, myColors, myFonts } from '../../utils'
import Feather from 'react-native-vector-icons/Feather'


interface ButtonProps {
    title?: string,
    iconType?: 'Feather' | 'Ionicons',
    iconName?: string,
    style?: StyleProp<ViewStyle>,
    disabled?: boolean,
    loading?: boolean,
    onPress?: (ev: any) => void
}

export default function Button({ title, iconName, iconType = 'Feather', style, disabled, loading, onPress }: ButtonProps) {
    return (
        <TouchableOpacity style={[asdasd.container, style]} disabled={disabled} onPress={onPress}>
            {iconName && (
                iconType === 'Feather' ?
                    <FeIcon style={[asdasd.icon, { marginRight: title ? 12 : 0 }]}
                        name={iconName} size={24} color={myColors.white} />
                    :
                    <IoIcon style={[asdasd.icon, { marginRight: title ? 12 : 0 }]}
                        name={iconName} size={24} color={myColors.white} />
            )}
            {loading ? <ActivityIndicator size={'small'} color={myColors.white} /> :
                <Text style={asdasd.title}>{title}</Text>}
        </TouchableOpacity >
    )
}

const asdasd = StyleSheet.create({
    icon: {
        marginRight: 12,
        color: 'white'
    },
    title: {
        fontFamily: myFonts.dmsansSemibold,
        color: myColors.white,
        fontSize: 15
    },
    container: {
        flexDirection: 'row',
        backgroundColor: myColors.primary,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal : 12,
        borderRadius: 8
    }
})