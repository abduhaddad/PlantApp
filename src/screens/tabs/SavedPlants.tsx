import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { myColors } from '../../utils';
import Header from '../../components/Header';
import CardSavedPlant from '../../components/cards/CardSavedPlant';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { addSavedPlants, setPlant } from '../../redux/reducers/plantReducer';
import { NoData } from '../../components/helpers/NoData';

export default function SavedPlants() {

    const nav = useNavigation()
    const dispatch = useDispatch<AppDispatch>()
    const { savedPlants, loading } = useSelector((state: RootState) => state.plants)

    function RenderCard({ item }: { item: any }) {
        return <CardSavedPlant item={item} onPressSave={() => onSavePlant(item)}
            onPress={() => onPlantDetail(item?.documentId)} />
    }

    function onSavePlant(item: any) {
        dispatch(setPlant(item))
        dispatch(addSavedPlants(item))
    }

    function onPlantDetail(id: number) {
        nav.dispatch(CommonActions.navigate('PlantDetail', { id }))
    }

    return (
        <View style={asdasd.container}>
            <Header title='Saved Plants' />
            <FlatList
                data={savedPlants}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, idx) => idx.toString()}
                ListEmptyComponent={NoData}
                renderItem={RenderCard}
                contentContainerStyle={asdasd.containerPlants}
            />
        </View>
    )
}

const asdasd = StyleSheet.create({
    containerPlants: {
        paddingVertical : 24,
        marginHorizontal: 32
    },
    container: {
        flex: 1,
        backgroundColor: myColors.white
    }
})