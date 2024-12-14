import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { myColors, myFonts } from '../../utils'

interface CardProps {
    item: any,
    onPress?: (ev: any) => void
}

export default function CardPlant({ item, onPress }: CardProps) {

    return (
        <TouchableOpacity style={asdasd.card} onPress={onPress}>
            <View style={asdasd.content}>
                <Text style={asdasd.subTitle}>{item?.light}</Text>
                <Text style={asdasd.title}>{item?.title}</Text>
            </View>
            <Image style={asdasd.img} source={require('../../assets/images/plant.png')} />
        </TouchableOpacity>
    )
}

const asdasd = StyleSheet.create({
    img: {
        resizeMode: 'contain',
        right: 0,
        position: 'absolute',
        top: -24,
    },
    content: {
        width: '70%',
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: myFonts.dmsansBold,
        fontSize: 16,
        color: myColors.black
    },
    subTitle: {
        fontFamily: myFonts.dmsansSemibold,
        fontSize: 12,
        color: myColors.primary
    },
    card: {
        flexDirection: 'row',
        backgroundColor: myColors.lightGray,
        width: 180,
        height: 130,
        borderRadius: 12,
        padding: 12,
        marginTop: 32,
    },
    container: {
        marginTop: 32
    }
})