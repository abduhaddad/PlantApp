import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { deletePlantData, fetchPlantData } from '../../services/plants'
import { FeIcon, myColors, myFonts } from '../../utils'
import { NoData } from '../../components/helpers/NoData'
import Header from '../../components/Header'
import FastImage from 'react-native-fast-image'
import { deletePlant, incrementPage, resetPlants, setisUpdate, setLoadingMore, setPlant } from '../../redux/reducers/plantReducer'
import { CommonActions, useNavigation } from '@react-navigation/native'

export default function Articles() {

    const nav = useNavigation()
    const dispatch = useDispatch<AppDispatch>()
    const [searchText, setSearchText] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const { plants, page, pageSize, loading, loadingMore, hasMore } = useSelector((state: RootState) => state.plants)
    const { categories } = useSelector((state: RootState) => state.category)
    const [categoriesData, setCategoriesData] = useState([{ id: 0, name: 'All', selected: true },
    ...categories])
    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {

    }, [])

    function RenderCategories({ item, index }: { item: any, index: number }) {
        return (
            <TouchableOpacity onPress={() => onCategory(item, index)}
                style={[asdasd.categoryItem, {
                    backgroundColor: item?.selected ? myColors.lightGreen : myColors.white
                }]}>
                <Text style={[asdasd.categoryItemText, {
                    color: item?.selected ? myColors.green :
                        myColors.darkGray,
                }]}>{item?.name}</Text>
            </TouchableOpacity>
        )
    }

    function RenderPlant({ item }: { item: any }) {
        return (
            <View style={asdasd.card}>
                <FastImage style={asdasd.img} source={{ uri: item?.thumbnailImage }} />
                <View style={asdasd.containerContent}>
                    <View style={asdasd.content}>
                        <Text style={asdasd.subTitle}>{item?.light}</Text>
                        <Text style={asdasd.title}>{item?.title}</Text>
                    </View>
                    <View style={asdasd.content}>
                        <TouchableOpacity onPress={() => onEdit(item)}>
                            <FeIcon name='edit-3' color={myColors.black} size={18} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onDeleteConfirm(item?.documentId)}>
                            <FeIcon name='trash-2' color={myColors.black} size={18} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }


    function onDeleteConfirm(id: number) {
        Alert.alert('Warning!', 'Are you sure to delete this item?', [
            { text: 'Delete', onPress: () => onDelete(id) },
            { text: 'Cancel' },
        ])
    }

    function onDelete(id: number) {
        dispatch(deletePlantData({ id }))
    }

    function onAdd() {
        dispatch(setisUpdate(false))
        nav.dispatch(CommonActions.navigate('AUPlant'))
    }

    function onEdit(plant: Record<string, any>) {
        dispatch(setisUpdate(true))
        dispatch(setPlant(plant))
        nav.dispatch(CommonActions.navigate('AUPlant'))
    }

    function onCategory(data: any, idx: number) {
        const updatedCategory = categoriesData.map((item, i) => {
            return { ...item, selected: idx == i }
        })
        setCategoriesData(updatedCategory)
        const _categoryName = data.id != 0 ? data.name : ''
        setCategoryName(_categoryName)
        dispatch(resetPlants())
        dispatch(fetchPlantData({
            page: 1,
            pageSize,
            categoryName: _categoryName
        }))
    }

    async function init() {
        onCategory(categoriesData[0], 0)
    }

    function onRefresh() {
        init()
    }

    function onSearch(text: string) {
        setSearchText(text)
        searchTimeout.current && clearTimeout(searchTimeout.current)
        searchTimeout.current = setTimeout(() => {
            dispatch(resetPlants())
            dispatch(fetchPlantData({ page: 1, pageSize, title: text }))
        }, 1000)
    }

    function loadMore() {
        if (hasMore && !loading) {
            dispatch(setLoadingMore(true))
            dispatch(incrementPage())
            dispatch(fetchPlantData({ page: page + 1, pageSize, categoryName, title: searchText }))
        }
    }

    function RenderFooter() {
        if (loadingMore) {
            return <ActivityIndicator size='small' color={myColors.black} />
        }
    }


    return (
        <View style={asdasd.container} >
            <Header title='All Plants' withSearch={true} withBack={false}
                onChangeText={onSearch} actionButton={
                    <TouchableOpacity style={asdasd.actionBtn} onPress={onAdd}>
                        <FeIcon name='plus-square' size={24} color={myColors.black} />
                    </TouchableOpacity>
                } />
            <FlatList
                ListHeaderComponent={
                    <FlatList
                        data={categoriesData}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={asdasd.containerCategories}
                        keyExtractor={(item, idx) => idx.toString()}
                        renderItem={RenderCategories} />
                }
                showsHorizontalScrollIndicator={false}
                data={plants}
                ListEmptyComponent={NoData}
                contentContainerStyle={asdasd.containerPlants}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={RenderPlant}
                ListFooterComponent={RenderFooter}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                refreshControl={
                    <RefreshControl onRefresh={onRefresh} refreshing={loading} />
                }
            />
        </View>
    )
}

const asdasd = StyleSheet.create({
    actionBtn: {
        marginLeft: 8
    },
    content: {
        rowGap: 6
    },
    img: {
        height: 150,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12
    },
    containerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 12,
        marginHorizontal: 16
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
        marginTop: 16,
    },
    containerCategories: {
        marginTop: 16,
        marginBottom: 8,
        alignItems: 'center'
    },
    categoryItemText: {
        fontFamily: myFonts.dmsansMedium,
        color: myColors.darkGray,
        marginBottom: 4
    },
    categoryItem: {
        marginRight: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: myColors.lightGray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerItemPlant: {
        columnGap: 10
    },
    containerPlants: {
        paddingHorizontal: 20,
        paddingBottom: 32
    },
    container: {
        flex: 1,
        backgroundColor: myColors.white
    }
})