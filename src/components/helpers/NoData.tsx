import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { myColors, myFonts } from '../../utils'

const { width } = Dimensions.get('window')
export function NoData() {

    return (
        <View style={styles.container}>
            <Image resizeMode='contain' style={styles.img}
                source={require('../../assets/images/noData.png')} />
            <Text style={styles.text}>No Data..</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: myFonts.dmsansSemibold,
        fontSize: 16,
        color: myColors.black,
        marginTop: 8
    },
    img: {
        width: 150,
        height: 150,
    },
    container: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center'
    }
})