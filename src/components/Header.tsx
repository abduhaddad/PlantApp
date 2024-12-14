import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { FeIcon, myColors, myFonts } from '../utils'
import Input from './inputs/Input'

interface HeaderProps {
    title: string,
    isLoading?: boolean,
    withSearch?: boolean,
    withBack?: boolean,
    actionButton?: JSX.Element,
    onChangeText?: (text: string) => void,
}

export default function Header({ title, isLoading, withBack = true, actionButton,
    withSearch, onChangeText }: HeaderProps) {

    const nav = useNavigation()

    return (
        <View style={asdasd.containerHeader}>
            {withBack &&
                <TouchableOpacity onPress={() => nav.goBack()}>
                    <FeIcon name='chevron-left' size={28} color={myColors.black} />
                </TouchableOpacity>
            }
            {withSearch ?
                <Input style={{
                    flex: 1
                }} onChangeText={onChangeText} placeholder='Search your data here...' /> :
                <Text style={asdasd.title}>{title}</Text>
            }
            {isLoading ?
                <ActivityIndicator size={'small'} color={myColors.black} /> :
                actionButton}
        </View>
    )
}

const asdasd = StyleSheet.create({
    title: {
        flex: 1,
        textAlign: 'center',
        fontFamily: myFonts.dmsansMedium,
        fontSize: 16,
        color: myColors.black,
    },
    containerHeader: {
        backgroundColor: myColors.white,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: myColors.lightGray,
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
})