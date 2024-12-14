import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FeIcon, myColors, myFonts } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import CardPlant from '../../components/cards/CardPlant'
import { NoData } from '../../components/helpers/NoData'
import { fetchPlantData } from '../../services/plants'
import { fetchCategoriesData } from '../../services/categories'
import { setLoading } from '../../redux/reducers/categoryReducer'
import CardCategory from '../../components/cards/CardCategory'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { setisUpdate } from '../../redux/reducers/plantReducer'
import CardAlert from '../../components/cards/CardAlert'

export default function Home() {

    const nav = useNavigation()
    const dispatch = useDispatch<AppDispatch>()
    const { plants } = useSelector((state: RootState) => state.plants)
    const { categories, loading } = useSelector((state: RootState) => state.category)
    const [alertsData, setAlertsData] = useState([
        { id: 1, title: 'Water your Cactus today (living room)', subTitle: 'Its 2 weeks old, you have to water it twice a week' },
        { id: 2, title: 'Prune the dead branches of Bamboo', subTitle: 'Its been 2-3 weeks since you have prune the day' },
        { id: 3, title: 'Lafe of branches living room with ba', subTitle: 'Now its the time to confess the plants has nice height' },
    ])

    useEffect(() => {
        init()
    }, [])

    function RenderPlant({ item }: { item: any }) {
        return <CardPlant item={item} onPress={() => onPlantDetail(item?.documentId)} />
    }

    function RenderCategory({ item, index }: { item: any, index: number }) {
        return <CardCategory item={item} onPress={() => onPlantsByCategory(item, index)} />
    }

    function RenderAlert({ item }: { item: any }) {
        return <CardAlert item={item} />
    }

    async function init() {
        dispatch(fetchPlantData({ pageSize: 5 }))
        dispatch(fetchCategoriesData({ pageSize: 4 }))
    }

    function onPlantDetail(id: number) {
        nav.dispatch(CommonActions.navigate('PlantDetail', { id }))
    }

    function onPlantsByCategory(data: any, idx: number) {
        nav.dispatch(CommonActions.navigate('Plants', { category: { data, idx } }))
    }

    function onCategories() {
        nav.dispatch(CommonActions.navigate('Categories'))
    }

    function onPlants() {
        nav.dispatch(CommonActions.navigate('Plants'))
    }

    function onAdd() {
        dispatch(setisUpdate(false))
        nav.dispatch(CommonActions.navigate('AUPlant'))
    }

    function onRefresh() {
        dispatch(setLoading(true))
        init()
    }

    return (
        <ScrollView style={asdasd.container} refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={loading} />
        }>
            <View style={asdasd.containerHeaderTitle}>
                <Text style={asdasd.headerTitle}>My Plants</Text>
                <TouchableOpacity onPress={onAdd}>
                    <FeIcon name='plus-square' size={24} color={myColors.black} />
                </TouchableOpacity>
            </View>

            <View style={asdasd.header}>
                <Text style={asdasd.title}>Popular plants</Text>
                <TouchableOpacity onPress={onPlants}>
                    <Text style={asdasd.subTitle}>View all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={plants}
                horizontal={true}
                ListEmptyComponent={NoData}
                contentContainerStyle={asdasd.containerPlants}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={RenderPlant}
            />
            <View style={asdasd.divider} />
            <View style={asdasd.header}>
                <Text style={asdasd.title}>Categories</Text>
                <TouchableOpacity onPress={onCategories}>
                    <Text style={asdasd.subTitle}>View all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={categories}
                numColumns={2}
                ListEmptyComponent={NoData}
                contentContainerStyle={asdasd.containerCategory}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={RenderCategory}
            />
            <View style={asdasd.divider} />
            <View style={asdasd.header}>
                <Text style={asdasd.title}>Alerts for today</Text>
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={alertsData}
                ListEmptyComponent={NoData}
                contentContainerStyle={asdasd.containerAlerts}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={RenderAlert}
            />

        </ScrollView>
    )
}

const asdasd = StyleSheet.create({
    containerAlerts: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        rowGap: 24,
    },
    containerCategory: {
        paddingHorizontal: 24,
        marginTop: 24,
        rowGap: 24
    },
    containerPlants: {
        paddingHorizontal: 20,
        columnGap: 16
    },
    divider: {
        backgroundColor: myColors.lightGray,
        marginVertical: 24,
        marginHorizontal: 20,
        height: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    subTitle: {
        fontFamily: myFonts.dmsansSemibold,
        fontSize: 13,
        color: myColors.primary,
        textDecorationLine: 'underline'
    },
    title: {
        fontFamily: myFonts.dmsansSemibold,
        fontSize: 18
    },
    headerTitle: {
        fontFamily: myFonts.dmsansBold,
        fontSize: 24
    },
    containerHeaderTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 16,
        marginBottom: 32
    },
    container: {
        flex: 1,
        backgroundColor: myColors.white
    }
})