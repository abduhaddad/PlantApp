import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FeIcon, myColors, myFonts } from '../../utils'

interface CardProps {
    item: any,
    onPress: (ev: any) => void
}

export default function CardCategory({ item, onPress }: CardProps) {

    return (
        <TouchableOpacity style={asdasd.card} onPress={onPress}>
            <View style={asdasd.icon}>
                <FeIcon name={'command'} size={20} color={myColors.primary} />
            </View>
            <View style={asdasd.content}>
                <Text style={asdasd.subTitle}>{item?.plants?.length || item?.id} Plants</Text>
                <Text style={asdasd.title}>{item?.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const asdasd = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: '50%',
        marginRight: 8
    },
    icon: {
        backgroundColor: myColors.lightGreen,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },
    content: {
        justifyContent: 'space-evenly',
        marginLeft: 8
    },
    title: {
        fontFamily: myFonts.dmsansSemibold,
        color: myColors.black,
        fontSize: 16
    },
    subTitle: {
        fontFamily: myFonts.dmsansMedium,
        color: myColors.lightBlueGray,
        fontSize: 13
    },
})