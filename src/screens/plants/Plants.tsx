import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { CommonActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchPlantData } from '../../services/plants'
import { myColors, myFonts } from '../../utils'
import { NoData } from '../../components/helpers/NoData'
import CardPlant from '../../components/cards/CardPlant'
import Header from '../../components/Header'
import { incrementPage, resetPlants, setLoadingMore } from '../../redux/reducers/plantReducer'

export default function Plants() {

  type ParamList = {
    Plants: { category: Record<string, any> }
  }

  const nav = useNavigation()
  const route = useRoute<RouteProp<ParamList, 'Plants'>>()
  const dispatch = useDispatch<AppDispatch>()
  const { plants, page, pageSize, loading, hasMore, loadingMore } = useSelector((state: RootState) => state.plants)
  const { categories } = useSelector((state: RootState) => state.category)
  const [categoryName, setCategoryName] = useState('')
  const [categoriesData, setCategoriesData] = useState([{ id: 0, name: 'All', selected: true },
  ...categories])

  useEffect(() => {
    init()
  }, [])

  function RenderCategories({ item, index }: { item: any, index: number }) {
    return (
      <TouchableOpacity onPress={() => onCategory(item, index)}
        style={asdasd.categoryItem}>
        <Text style={[asdasd.categoryItemText, {
          color: item.selected ? myColors.black :
            myColors.darkGray,
          fontSize: item.selected ? 17 :
            15
        }]}>{item.name}</Text>
        {item.selected && <View style={asdasd.categoryItemSelected} />}
      </TouchableOpacity>
    )
  }

  function RenderPlant({ item }: { item: any }) {
    return <CardPlant item={item} onPress={() => onPlantsByCategory(item?.documentId)} />
  }

  async function init() {

    const category = route.params?.category
    onCategory(category?.data || categoriesData[0], (category?.idx + 1) || 0)
  }

  function onCategory(data: any, idx: number) {
    const updatedCategory = categoriesData.map((item, i) => {
      return { ...item, selected: idx == i }
    })
    setCategoriesData(updatedCategory)
    dispatch(resetPlants())
    const _categoryName = data.id != 0 ? data.name : ''
    setCategoryName(_categoryName)
    dispatch(fetchPlantData({ pageSize, categoryName: _categoryName }))
  }

  function onPlantsByCategory(id: number) {
    nav.dispatch(CommonActions.navigate('PlantDetail', { id }))
  }

  function onRefresh() {
    init()
  }

  function loadMore() {

    if (hasMore && !loading) {
      dispatch(setLoadingMore(true))
      dispatch(incrementPage())
      dispatch(fetchPlantData({ page: page + 1, pageSize, categoryName }))
    }
  }

  function RenderFooter() {
    if (loadingMore) {
      return <ActivityIndicator size='small' color={myColors.black} />
    }
  }


  return (
    <View style={asdasd.container} >
      <Header title='All Plants' />

      <FlatList
        ListHeaderComponent={
          <FlatList
            data={categoriesData}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={asdasd.containerCategories}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={RenderCategories}
          />
        }
        showsHorizontalScrollIndicator={false}
        data={plants}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={loading} />
        }
        numColumns={2}
        ListEmptyComponent={NoData}
        ListFooterComponent={RenderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.05}
        columnWrapperStyle={asdasd.containerItemPlant}
        contentContainerStyle={asdasd.containerPlants}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={RenderPlant}
      />
    </View>
  )
}

const asdasd = StyleSheet.create({
  containerCategories: {
    marginTop: 16,
    marginBottom: 8,
    alignItems: 'center'
  },
  categoryItemSelected: {
    backgroundColor: myColors.primary,
    height: 3,
    width: '30%',
    marginHorizontal: 8,
    borderRadius: 4
  },
  categoryItemText: {
    fontFamily: myFonts.dmsansMedium,
    color: myColors.darkGray,
    marginBottom: 4
  },
  categoryItem: {
    marginRight: 8,
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