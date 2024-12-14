import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, FlatList, Keyboard } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Input from '../../components/inputs/Input';
import InputBtn from '../../components/inputs/InputBtn';
import { Modalize } from 'react-native-modalize'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { FeIcon, IoIcon, msgError, msgInfo, myColors, myFonts } from '../../utils';
import CardSelect from '../../components/cards/CardSelect';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { checkCameraPermission } from '../../utils/permissions';
import { NoData } from '../../components/helpers/NoData';
import { upload } from '../../services/upload';
import { addPlantData, updatePlantData } from '../../services/plants';
import { setLoading } from '../../redux/reducers/plantReducer';
import Button from '../../components/buttons/Button';
import { fetchCategoriesData } from '../../services/categories';

export default function AUPlant() {

    const nav = useNavigation()
    const { isUpdate, plant, loading } = useSelector((state: RootState) => state.plants)
    const { categories, pageSize } = useSelector((state: RootState) => state.category)
    const dispatch = useDispatch<AppDispatch>()

    const [selectedImage, setSelectedImage] = useState<Record<string, any> | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnailImage: '',
        height: '',
        waterCapacity: '',
        humidity: '',
        light: '',
        category: null,
    })

    const [selectedCategory, setSelectedCategory] = useState({
        id: 0,
        name: 'Select a category'
    })
    const pickerData = [
        { id: 1, title: 'Kamera', icon: 'camera' },
        { id: 2, title: 'Galeri', icon: 'folder' },
        { id: 3, title: 'Hapus Foto', icon: 'trash' },
    ]
    const refModal = useRef<Modalize>(null)
    const refModalPicker = useRef<Modalize>(null)

    useEffect(() => {
        init()
    }, [isUpdate, plant])

    function CardCategories({ item }: { item: any }) {
        return <CardSelect style={asdasd.cardCategory} title={item.name} onPress={() => onSelectCategory(item)} />
    }

    function CardPickers({ item }: { item: any }) {
        return (
            <CardSelect onPress={() => onSelectPicker(item.id)} title={item.title} iconName={item.icon} />
        )
    }

    function init() {
        dispatch(fetchCategoriesData({ pageSize }))
        if (isUpdate && plant) onGetPrevData()
    }

    function onGetPrevData() {
        setFormData({
            title: plant?.title || '',
            description: plant?.description || '',
            thumbnailImage: plant?.thumbnailImage || '',
            height: plant?.height.toString() || '',
            waterCapacity: plant?.waterCapacity.toString() || '',
            humidity: plant?.humidity.toString() || '',
            light: plant?.light || '',
            category: plant?.category?.id || '',
        })
        setSelectedCategory({
            id: plant?.category?.id || 0,
            name: plant?.category?.name || 'Select a category',
        })
    };

    function onSelectCategory(categoryItem: any) {
        onUpdateForm('category', categoryItem?.id)
        setSelectedCategory(categoryItem)
        refModal.current?.close()
    };

    function onPickImage() {
        Keyboard.dismiss()
        refModalPicker.current?.open()
    };

    async function onSelectPicker(id: number) {
        refModalPicker.current?.close()
        if (id === 3) {
            onUpdateForm('thumbnailImage', '')
            setSelectedImage(null)
        } else {
            try {
                const isPermissionGranted = await checkCameraPermission()
                if (!isPermissionGranted) return

                const optionsPicker = {
                    quality: 0.3,
                    maxWidth: 300,
                    maxHeight: 300,
                    mediaType: 'photo',
                } as CameraOptions;

                const resImage = id === 1 ? await launchCamera(optionsPicker) :
                    await launchImageLibrary(optionsPicker)

                if (!resImage.didCancel && resImage?.assets && resImage?.assets[0]?.uri) {
                    setSelectedImage(resImage?.assets[0])
                    onUpdateForm('thumbnailImage', resImage?.assets[0]?.uri)
                }
            } catch (e) {
                msgError(e)
            }
        }
    };

    function onCategories() {
        Keyboard.dismiss()
        refModal.current?.open()
    };

    function onUpdateForm(name: string, value: string) {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    async function onAddPlant() {
        try {
            let resUpload
            dispatch(setLoading(true))
            if (selectedImage) {
                resUpload = await dispatch(upload({ file: selectedImage })).unwrap()
                formData['thumbnailImage'] = resUpload[0]?.url
            }
            const response = await dispatch(addPlantData({ plant: { data: formData } })).unwrap()
            if (response?.error) {
                msgInfo(`Add Plant Article Failed : ${response?.error}`, true)
                return
            }
            msgInfo('Add Plant Article Successfully')
            nav.goBack()
        } catch (e) {
            msgError(e)
        } finally {
            dispatch(setLoading(false))
        }
    };

    async function onUpdatePlant() {
        try {
            let resUpload
            dispatch(setLoading(true))
            if (selectedImage) {
                resUpload = await dispatch(upload({ file: selectedImage })).unwrap()
                formData['thumbnailImage'] = resUpload[0]?.url
            }

            const response = await dispatch(updatePlantData({
                id: plant?.documentId,
                plant: { data: formData }
            })).unwrap()
            if (response?.error) {
                msgInfo(`Update Plant Article Failed : ${response?.error}`, true)
                return
            }
            msgInfo('Update Plant Article Successfully')
            nav.goBack()
        } catch (e) {
            msgError(e)
        }
    }

    function onSave() {
        if (!formData.title.trim() ||
            !formData.description.trim() ||
            !formData.thumbnailImage ||
            !formData.height ||
            !formData.waterCapacity ||
            !formData.humidity ||
            !formData.light ||
            selectedCategory.id === 0) {
            msgInfo('Please fill in all the required data.')
            return
        }
        if (isUpdate) {
            onUpdatePlant()
        } else {
            onAddPlant()
        }
    }

    return (
        <GestureHandlerRootView style={asdasd.container}>
            <Header title={(isUpdate ? 'Update' : 'Add') + ' Plant Article'} />
            <ScrollView style={asdasd.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'>
                <View style={asdasd.containerImg}>
                    {formData.thumbnailImage != '' ?
                        <TouchableOpacity onPress={onPickImage}>
                            <Image style={asdasd.img}
                                source={{ uri: formData.thumbnailImage }} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={asdasd.imgDefault}
                            onPress={onPickImage}>
                            <IoIcon name='add' size={32} color={myColors.black} />
                        </TouchableOpacity>
                    }
                </View>

                <View style={asdasd.containerContent}>
                    <Input
                        title={'Title*'}
                        style={asdasd.inp}
                        placeholder={'Enter plant title (e.g., Papaver Somniferum)'}
                        value={formData.title}
                        autoCapitalize='words'
                        onChangeText={(text) => onUpdateForm('title', text)}
                    />

                    <Input
                        title={'Description*'}
                        style={asdasd.inp}
                        placeholder={'Provide a brief description of the plant'}
                        value={formData.description}
                        multiline
                        onChangeText={(text) => onUpdateForm('description', text)}
                    />

                    <Input
                        title={'Height*'}
                        style={asdasd.inp}
                        placeholder={'Enter the plant height (small,medium,large)'}
                        value={formData.height}
                        onChangeText={(text) => onUpdateForm('height', text)}
                    />

                    <Input
                        title={'Water Capacity (in ml)*'}
                        style={asdasd.inp}
                        placeholder={'Enter the water capacity in mililiters'}
                        value={formData.waterCapacity}
                        keyboardType='numeric'
                        onChangeText={(text) => onUpdateForm('waterCapacity', text)}
                    />

                    <Input
                        title={'Humidity*'}
                        style={asdasd.inp}
                        placeholder={'Enter the ideal humidity level for the plant'}
                        value={formData.humidity}
                        keyboardType='numeric'
                        onChangeText={(text) => onUpdateForm('humidity', text)}
                    />

                    <Input
                        title={'Light*'}
                        style={asdasd.inp}
                        placeholder={'Enter the light (low,normal,high)'}
                        value={formData.light}
                        onChangeText={(text) => onUpdateForm('light', text)}
                    />
                    <InputBtn
                        title={'Category*'}
                        style={asdasd.inp}
                        value={selectedCategory.name}
                        onPress={onCategories}
                    />
                    <Button style={{
                        backgroundColor: myColors.black
                    }} title='Save Article' onPress={onSave} loading={loading}
                        disabled={loading} />

                </View>

            </ScrollView>
            <Modalize
                snapPoint={400}
                handlePosition='inside'
                closeSnapPointStraightEnabled={false}
                ref={refModal}>
                <View style={asdasd.containerModal}>
                    <View style={asdasd.containerTitleModal}>
                        <Text style={asdasd.titleModal}>Select a category</Text>
                    </View>
                    <FlatList
                        data={categories}
                        keyExtractor={(item, idx) => idx.toString()}
                        ListEmptyComponent={NoData}
                        renderItem={CardCategories}
                    />
                </View>
            </Modalize>

            <Modalize
                snapPoint={300}
                handlePosition='inside'
                closeSnapPointStraightEnabled={false}
                ref={refModalPicker}>
                <View style={asdasd.containerModal}>
                    <FlatList
                        data={pickerData}
                        ListEmptyComponent={NoData}
                        keyExtractor={(item, idx) => idx.toString()}
                        renderItem={CardPickers}
                    />
                </View>
            </Modalize>
        </GestureHandlerRootView>

    )
}

const asdasd = StyleSheet.create({
    inp: {
        marginBottom: 12
    },
    containerTitleModal: {
        flexDirection: 'row',
        marginHorizontal: 24
    },
    cardCategory: {
        borderBottomColor: myColors.lightGray,
        borderBottomWidth: 1,
    },
    containerSaveBtn: {
        backgroundColor: myColors.black,
        paddingVertical: 16,
        paddingHorizontal: 28,
        borderRadius: 16,
        marginTop: 16
    },
    titleModal: {
        fontFamily: myFonts.dmsansSemibold,
        fontSize: 18,
        color: myColors.black,
        marginBottom: 8,
    },
    containerModal: {
        flex: 1,
        marginTop: 32
    },
    containerContent: {
        marginVertical: 32,
        marginHorizontal: 24
    },
    containerImg: {
        marginTop: 24,
        alignItems: 'center'
    },
    imgDefault: {
        width: 100,
        height: 100,
        borderRadius: 8,
        borderStyle: 'dashed',
        borderColor: myColors.black,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 8
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    }
})