import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setLoading } from '../../redux/reducers/authReducer';
import { StackActions, useNavigation } from '@react-navigation/native';
import { myColors, myFonts } from '../../utils';
import { fetchUserData } from '../../services/auth';
import { AppDispatch, RootState } from '../../redux/store';
import { RefreshControl } from 'react-native';
import Button from '../../components/buttons/Button';

const { height } = Dimensions.get('window')

export default function Profile() {

    const nav = useNavigation()
    const dispatch = useDispatch<AppDispatch>()
    const { user, loading } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        init()
    }, [])

    function init() {
        dispatch(fetchUserData())
    }

    function onLogout() {
        dispatch(logout())
        nav.dispatch(StackActions.replace('Login'))
    }

    function onRefresh() {
        dispatch(setLoading(true))
        init()
    }

    return (
        <ScrollView refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={loading} />
        } style={styles.container}>
            <ImageBackground style={styles.content} source={require('../../assets/images/bgProfile.png')}>
                <FastImage style={styles.img}
                    source={{ uri: 'https://picsum.photos/200', cache: 'web' }} />
                <Text style={styles.name}>{user?.username || '-'}</Text>
                <Text style={styles.email} numberOfLines={2}>{user?.email || '-'}</Text>
                <Button onPress={onLogout} title='Logout' iconName='log-out' style={{
                    paddingHorizontal: 24,
                    paddingVertical: 6,
                    borderRadius: 24
                }} />

            </ImageBackground>

        </ScrollView>
    )
};

const styles = StyleSheet.create({
    content: {
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutBtn: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: myColors.primary,
        width: 35,
        height: 35,
        borderRadius: 24,
    },
    email: {
        fontFamily: myFonts.dmsans,
        color: myColors.black,
        opacity: 0.4,
        marginTop: 8,
        marginBottom: 24
    },
    name: {
        fontFamily: myFonts.dmsansBold,
        fontSize: 16,
        color: myColors.black,
        marginTop: 16
    },
    img: {
        resizeMode: 'cover',
        width: 70,
        height: 70,
        borderRadius: 40
    },
    contentHeader: {
        flex: 1,
        marginHorizontal: 12
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingHorizontal: 24,
        paddingVertical: 16
    },
    container: {
        flex: 1,
    },
})
