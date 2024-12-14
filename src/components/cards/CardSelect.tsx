import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { FeIcon, myColors, myFonts } from '../../utils'

interface CardProps {
    title: string,
    iconName?: string,
    onPress: () => void,
    disabled?: boolean,
    isLoading?: boolean,
    style?: ViewStyle,
}

export default function CardSelect({ title, iconName, onPress, disabled, isLoading, style }: CardProps) {
    return (
        <TouchableOpacity style={[asdasd.card, style]}
            disabled={disabled}
            onPress={onPress}>
            <View style={asdasd.content}>
                {iconName && <FeIcon name={iconName} size={22} color={myColors.black}
                    style={asdasd.icon} />}
                <Text style={asdasd.title}>{title}</Text>
            </View>
            {isLoading ?
                <ActivityIndicator size={'small'} color={myColors.black} /> :
                <FeIcon name={'chevron-right'} size={22} color={myColors.black} />
            }
        </TouchableOpacity>
    )
}

const asdasd = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    card: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: myFonts.dmsans,
        fontSize: 15,
        color: myColors.black,
    },
    icon: {
        marginRight: 16
    },
})

