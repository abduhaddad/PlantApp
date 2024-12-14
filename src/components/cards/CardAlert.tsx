import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FeIcon, myColors, myFonts } from '../../utils'
import FastImage from 'react-native-fast-image'

interface CardProps {
    item: any,
    onPress?: (ev: any) => void
}

export default function CardAlert({ item, onPress }: CardProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <FastImage style={styles.img}
                source={{ uri: `https://picsum.photos/seed/${item?.id}/200`, cache: 'web' }} />
            <View style={styles.content}>
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.subTitle} numberOfLines={1}>{item?.subTitle}</Text>
            </View>
            <FeIcon name={'chevron-right'} size={22} color={myColors.black} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginHorizontal: 16,
        justifyContent: 'center'
    },
    img: {
        resizeMode: 'cover',
        width: 50,
        height: 50,
        borderRadius: 8
    },
    title: {
        fontFamily: myFonts.dmsansMedium
    },
    subTitle: {
        fontFamily: myFonts.dmsans,
        fontSize: 13
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})