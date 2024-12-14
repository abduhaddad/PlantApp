import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { RefreshControl } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { setLoading } from '../redux/reducers/categoryReducer'
import { fetchCategoriesData } from '../services/categories'
import { myColors, myFonts } from '../utils'
import { NoData } from '../components/helpers/NoData'
import CardCategory from '../components/cards/CardCategory'
import Header from '../components/Header'

export default function Categories() {

  const nav = useNavigation()
  const dispatch = useDispatch<AppDispatch>()
  const { categories, loading, pageSize } = useSelector((state: RootState) => state.category)

  useEffect(() => {
    init()
  }, [])


  function RenderCategory({ item, index }: { item: any, index: number }) {
    return <CardCategory item={item} onPress={() => onPlantsByCategory(item, index)} />
  }

  function onPlantsByCategory(data: any, idx: number) {
    nav.dispatch(CommonActions.navigate('Plants', { category: { data, idx } }))
  }

  async function init() {
    dispatch(fetchCategoriesData({ pageSize: pageSize }))
  }

  function onRefresh() {
    dispatch(setLoading(true))
    init()
  }


  return (
    <ScrollView style={asdasd.container} >
      <Header title='All Categories' />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={categories}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={loading} />
        }
        numColumns={2}
        ListEmptyComponent={NoData}
        contentContainerStyle={asdasd.containerCategory}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={RenderCategory}
      />
    </ScrollView>
  )
}

const asdasd = StyleSheet.create({
  containerCategory: {
    marginHorizontal: 24,
    marginTop: 24,
    rowGap: 24
  },
  container: {
    flex: 1,
    backgroundColor: myColors.white
  }
})