import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IoIcon, myColors, myFonts } from '../../utils'
import FastImage from 'react-native-fast-image'

interface CardProps {
    item: any,
    saved?: boolean,
    onPress?: (ev: any) => void,
    onPressSave?: (ev: any) => void,
}

export default function CardSavedPlant({ item, onPress, onPressSave, saved = true }: CardProps) {

    return (
        <TouchableOpacity style={asdasd.card} onPress={onPress} testID='save-button'>
            <FastImage style={asdasd.img} source={{ uri: item?.thumbnailImage }} />
            <TouchableOpacity style={asdasd.saveBtn} onPress={onPressSave}>
                <IoIcon name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color={myColors.white} />
            </TouchableOpacity>
            <View style={asdasd.content}>
                <Text style={asdasd.subTitle}>{item?.light}</Text>
                <Text style={asdasd.title}>{item?.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const asdasd = StyleSheet.create({
    saveBtn: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 24,
        padding: 8,
        position: 'absolute',
        right: 16,
        top: 16
    },
    img: {
        height: 150,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12
    },
    content: {
        margin: 12,
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
        backgroundColor: myColors.white,
        borderWidth: 1.5,
        borderColor: myColors.lightGray,
        borderRadius: 12,
        marginBottom: 20,
    },
})