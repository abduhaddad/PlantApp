import { Animated, StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React, { useEffect } from 'react'
import { StackActions, useNavigation } from '@react-navigation/native';
import { getCurrentUser, myColors, myFonts } from '../utils';

export default function SplashScreen() {

    const nav = useNavigation()
    const animatedLogo = useAnimatedValue(0)

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const currUser = await getCurrentUser()
        
        Animated.spring(animatedLogo, {
            toValue: 1,
            bounciness: 20,
            useNativeDriver: true,
        }).start()
        setTimeout(() => {
            if (currUser) {
                nav.dispatch(StackActions.replace('TabMenu'))
            } else {
                nav.dispatch(StackActions.replace('Login'))
            }
        }, 1500)
    }

    return (
        <View style={styles.container}>
            <Animated.Image style={[styles.img, {
                transform: [{ scale: animatedLogo }]
            }]} source={require('../assets/images/logo.png')} />
            <Text style={styles.title}>PlantApp</Text>
            <Text style={styles.subTitle}>Smart reminder to care for{"\n"}each of your plants</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        fontFamily: myFonts.dmsansMedium,
        fontSize: 16,
        marginTop: 8,
        textAlign: 'center',
        color: myColors.darkGray
    },
    title: {
        fontFamily: myFonts.dmsansBold,
        fontSize: 18,
        marginTop: 24,
        color: myColors.black,
        textAlign: 'center'
    },
    img: {
        width: 100,
        height: 100
    },
    container: {
        flex: 1,
        backgroundColor: myColors.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24
    }
})