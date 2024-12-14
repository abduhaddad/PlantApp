import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addPlantData, deletePlantData, fetchPlantData, fetchPlantDataById, updatePlantData } from "../../services/plants"

interface PlantState {
    plants: any[],
    savedPlants: any[],
    plant: Record<string, any> | null,
    loading: boolean,
    error: string | null,
    loadingMore: boolean,
    hasMore: boolean,
    page: number,
    pageSize: number,
    isUpdate: boolean,
}

const initialState: PlantState = {
    plants: [],
    savedPlants: [],
    plant: null,
    loading: false,
    loadingMore: false,
    error: null,
    hasMore: true,
    page: 1,
    pageSize: 15,
    isUpdate: false,
}

const plantSlice = createSlice({
    name: 'plants',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setLoadingMore(state, action: PayloadAction<boolean>) {
            state.loadingMore = action.payload
        },
        setisUpdate(state, action: PayloadAction<boolean>) {
            state.isUpdate = action.payload
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
        addSavedPlants(state, action: PayloadAction<Record<string, any>>) {
            const idx = state.savedPlants.findIndex((item) => item.id == state.plant?.id)
            if (idx >= 0) {
                state.savedPlants.splice(idx, 1)
            } else {
                state.savedPlants.push(action.payload)
            }
        },
        setPlant(state, action: PayloadAction<Record<string, any>>) {
            state.plant = action.payload
        },
        addPlant(state, action: PayloadAction<Record<string, any>>) {
            state.plants.push(action.payload)
        },
        deletePlant(state, action: PayloadAction<number>) {
            const filter = state.plants.filter((item) => item.id == action.payload)
            state.plants = filter
        },
        setHasMore(state, action: PayloadAction<boolean>) {
            state.hasMore = action.payload
        },
        incrementPage(state) {
            state.page += 1
        },
        resetPlants(state) {
            state.plants = []
            state.page = 1
            state.hasMore = true
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPlantData.pending, (state, action) => {
                state.loading = state.plants.length == 0
                state.error = null
            })
            .addCase(fetchPlantData.fulfilled, (state, action) => {
                const { data } = action.payload
                state.plants = [...state.plants, ...data]
                state.hasMore = data.length > 0
                state.loading = false
                state.loadingMore = false
            })
            .addCase(fetchPlantData.rejected, (state, action) => {
                state.error = action.payload as string
                state.loading = false
                state.loadingMore = false
            })
            .addCase(fetchPlantDataById.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPlantDataById.fulfilled, (state, action) => {
                const { data } = action.payload
                state.plant = data
                state.loading = false
            })
            .addCase(fetchPlantDataById.rejected, (state, action) => {
                state.error = action.payload as string
                state.loading = false
            })
            .addCase(addPlantData.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(addPlantData.fulfilled, (state, action) => {
                const { data } = action.payload
                state.plants = [...state.plants, data]
                state.loading = false
            })
            .addCase(addPlantData.rejected, (state, action) => {
                state.error = action.payload as string
                state.loading = false
            })
            .addCase(updatePlantData.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(updatePlantData.fulfilled, (state, action) => {
                const { data } = action.payload
                const index = state.plants.findIndex(item => item.documentId === data?.documentId);
                if (index >= 0) {
                    state.plants[index] = data
                }
                state.loading = false
            })
            .addCase(updatePlantData.rejected, (state, action) => {
                state.error = action.payload as string
                state.loading = false
            })

            .addCase(deletePlantData.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(deletePlantData.fulfilled, (state, action) => {
                const { id } = action.payload
                state.plants = state.plants.filter(item => item.documentId != id)
                state.loading = false
            })
            .addCase(deletePlantData.rejected, (state, action) => {
                state.error = action.payload as string
                state.loading = false
            })

    },
})

export const { setLoading, setLoadingMore, setError, addPlant, deletePlant,
    addSavedPlants, setHasMore, incrementPage, resetPlants,
    setisUpdate, setPlant } = plantSlice.actions

export default plantSlice.reducer