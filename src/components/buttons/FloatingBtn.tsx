import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FeIcon, myColors } from '../../utils'

interface ButtonProps {
    iconName: string,
    onPress?: (ev: any) => void
}

export default function FloatingBtn({ iconName = 'plus', onPress }: ButtonProps) {
    return (
        <TouchableOpacity style={asdasd.floatBtn} onPress={onPress}>
            <FeIcon name={iconName} size={24} color='#FFF' />
        </TouchableOpacity>
    )
}

const asdasd = StyleSheet.create({
    floatBtn: {
        backgroundColor: myColors.primary,
        position: 'absolute',
        width: 55,
        height: 55,
        bottom: 48,
        right: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
})