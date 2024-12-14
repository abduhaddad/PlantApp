import { Animated, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FeIcon, msgError, myColors, myFonts } from '../../utils'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchPlantDataById } from '../../services/plants'
import { CommonActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import Button from '../../components/buttons/Button'
import { addSavedPlants } from '../../redux/reducers/plantReducer'
import Loader from '../../components/helpers/Loader'
import Share from 'react-native-share'

export default function PlantDetail() {

    type ParamList = {
        PlantDetail: {
            id: number
        }
    }

    const dispatch = useDispatch<AppDispatch>()
    const nav = useNavigation()
    const route = useRoute<RouteProp<ParamList, 'PlantDetail'>>()
    const { plant, savedPlants, loading } = useSelector((state: RootState) => state.plants)
    const [expanded, setExpanded] = useState(false)
    const animatedHeight = useRef(new Animated.Value(100)).current
    const [saved, setSaved] = useState(false)


    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        const filter = savedPlants.filter((item) => item.id == plant?.id)
        setSaved(filter.length > 0)
    }, [savedPlants, plant])

    function init() {
        dispatch(fetchPlantDataById({ id: route.params?.id }))
    }


    function onReadMore() {
        Animated.timing(animatedHeight, {
            toValue: expanded ? 100 : 500,
            duration: 300,
            useNativeDriver: false,
        }).start()
        setExpanded(!expanded)
    };

    function onBack() {
        nav.dispatch(CommonActions.goBack())
    }

    function onSavePlant() {
        dispatch(addSavedPlants({ ...plant }))
    }

    async function onShare() {
        try {
            await Share.open({
                url: plant?.thumbnailImage,
                message : 'Sharing this beautiful plant with you!'
            })
        } catch (e) {
            msgError(e)
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <ScrollView style={asdasd.container} showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl onRefresh={init} refreshing={loading} />
            }
        >
            <FastImage source={{ uri: plant?.thumbnailImage }} resizeMode='cover' style={asdasd.img} />
            <TouchableOpacity style={asdasd.closeBtn} onPress={onBack}>
                <FeIcon name='x' size={20} color={myColors.white} />
            </TouchableOpacity>
            <View style={asdasd.content}>
                <View style={asdasd.info}>
                    <FeIcon name='check' style={asdasd.infoIcon} size={17} color={myColors.primary} />
                    <Text style={asdasd.infoText}>Better read the whole article</Text>
                </View>
                <Text style={asdasd.title}>{plant?.title}</Text>
                <View style={asdasd.containerCategory}>
                    <Text style={asdasd.category}>{plant?.category?.name}</Text>
                </View>
                <Text style={asdasd.titleDesc}>Description</Text>
                <Text style={asdasd.subTitleDesc}>From Wikipedia, the free encyclopedia</Text>
                <Animated.View style={{
                    maxHeight: animatedHeight
                }}>
                    <Text style={asdasd.desc}>{plant?.description}</Text>
                    <TouchableOpacity onPress={onReadMore}>
                        <Text style={asdasd.readMoreText}>{expanded ? 'Read Less' : 'Read More'}</Text>
                    </TouchableOpacity>
                </Animated.View>
                <View style={asdasd.divider} />
                <View style={asdasd.containerOtherInfo}>
                    <View style={asdasd.otherInfo}>
                        <FeIcon name='layers' style={asdasd.otherInfoIcon} size={24} color={myColors.green} />
                        <View style={asdasd.contentOtherInfo}>
                            <Text style={asdasd.titleOtherInfo}>Height</Text>
                            <Text style={asdasd.subTitleOtherInfo}>{plant?.height}</Text>
                        </View>
                    </View>
                    <View style={asdasd.otherInfo}>
                        <FeIcon name='droplet' style={[asdasd.otherInfoIcon, {
                            backgroundColor: myColors.lightPurple
                        }]} size={24} color={myColors.purple} />
                        <View style={asdasd.contentOtherInfo}>
                            <Text style={[asdasd.titleOtherInfo, { color: myColors.purple }]}>Water</Text>
                            <Text style={asdasd.subTitleOtherInfo}>{plant?.waterCapacity}ml</Text>
                        </View>
                    </View>
                </View>
                <View style={asdasd.containerOtherInfo}>
                    <View style={asdasd.otherInfo}>
                        <FeIcon name='thermometer' style={[asdasd.otherInfoIcon, {
                            backgroundColor: myColors.lightOrange
                        }]} size={24} color={myColors.orange} />
                        <View style={asdasd.contentOtherInfo}>
                            <Text style={[asdasd.titleOtherInfo, { color: myColors.orange }]}>Light</Text>
                            <Text style={asdasd.subTitleOtherInfo}>{plant?.light}</Text>
                        </View>
                    </View>
                    <View style={asdasd.otherInfo}>
                        <FeIcon name='thermometer' style={[asdasd.otherInfoIcon, {
                            backgroundColor: myColors.lightPink
                        }]} size={24} color={myColors.pink} />
                        <View style={asdasd.contentOtherInfo}>
                            <Text style={[asdasd.titleOtherInfo, { color: myColors.pink }]}>Humidity</Text>
                            <Text style={asdasd.subTitleOtherInfo}>{plant?.humidity}%</Text>
                        </View>
                    </View>
                </View>

                <View style={asdasd.containerBtn}>
                    <Button onPress={onSavePlant} title='Save this plant'
                        iconType={'Ionicons'} iconName={saved ? 'bookmark' : 'bookmark-outline'} style={{
                            marginVertical: 16,
                            flex: 1
                        }} />
                    <Button onPress={onShare} iconType={'Ionicons'} iconName={'share-outline'} style={{
                        marginVertical: 16
                    }} />
                </View>

            </View>
        </ScrollView>
    )
}

const asdasd = StyleSheet.create({
    containerBtn: {
        flexDirection: 'row',
        columnGap: 12
    },
    titleOtherInfo: {
        fontFamily: myFonts.dmsansBold,
        color: myColors.green
    },
    subTitleOtherInfo: {
        fontFamily: myFonts.dmsansMedium,
        fontSize: 16,
        color: myColors.black
    },
    contentOtherInfo: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    otherInfoIcon: {
        backgroundColor: myColors.lightGreen,
        padding: 10,
        marginRight: 8,
        borderRadius: 12
    },
    otherInfo: {
        width: '50%',
        flexDirection: 'row',
    },
    containerOtherInfo: {
        flexDirection: 'row',
        marginBottom: 16
    },
    divider: {
        backgroundColor: myColors.lightGray,
        marginVertical: 24,
        marginHorizontal: 20,
        height: 1,
    },
    readMoreText: {
        fontFamily: myFonts.dmsansSemibold,
        color: myColors.black
    },
    desc: {
        fontFamily: myFonts.dmsans,
        fontSize: 16,
        color: myColors.black,
        opacity: 0.8,
        marginTop: 12
    },
    subTitleDesc: {
        fontFamily: myFonts.dmsansSemibold,
        fontSize: 16,
        color: myColors.gray,
        marginTop: 4
    },
    titleDesc: {
        fontFamily: myFonts.dmsansBold,
        fontSize: 22,
        color: myColors.black
    },
    category: {
        fontFamily: myFonts.dmsansSemibold,
        color: myColors.darkGray,
    },
    containerCategory: {
        alignSelf: 'flex-start',
        backgroundColor: myColors.lightGray,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginTop: 16,
        marginBottom: 22
    },
    title: {
        fontFamily: myFonts.dmsansBold,
        fontSize: 28,
        color: myColors.black
    },
    closeBtn: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 24,
        padding: 4,
        position: 'absolute',
        right: 16,
        top: 16
    },
    infoText: {
        fontFamily: myFonts.dmsansMedium,
        color: myColors.primary,
        fontSize: 16,
        marginLeft: 8
    },
    infoIcon: {
        backgroundColor: myColors.lightGreen,
        borderRadius: 16,
        padding: 3
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 20
    },
    content: {
        flex: 1,
        marginTop: -32,
        paddingHorizontal: 20,
        backgroundColor: myColors.white,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24
    },
    img: {
        height: 300,
        position: 'relative'
    },
    container: {
        flex: 1,
        backgroundColor: myColors.white
    }
})