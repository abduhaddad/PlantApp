import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { myColors } from '../../utils'

export default function Loader() {
    return (
        <View style={asdasd.container}>
            <ActivityIndicator size={'large'} color={myColors.black} />
        </View>
    )
}

const asdasd = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
})