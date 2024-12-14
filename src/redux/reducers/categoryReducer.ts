import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchCategoriesData } from "../../services/categories"

interface CategoryState {
    categories: any[],
    loading: boolean,
    error: string | null,
    hasMore: boolean,
    page: number,
    pageSize: number
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
    hasMore: false,
    page: 1,
    pageSize: 10
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
        addCategory(state, action: PayloadAction<any[]>) {
            state.categories = action.payload
        },
        setHasMore(state, action: PayloadAction<boolean>) {
            state.hasMore = action.payload
        },
        incrementPage(state) {
            state.page += 1
        },
        resetCategories(state) {
            state.categories = []
            state.page = 1
            state.hasMore = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesData.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategoriesData.fulfilled, (state, action) => {
                const { data } = action.payload
                state.categories = data
                state.loading = false
            })
            .addCase(fetchCategoriesData.rejected, (state, action) => {
                state.error = action.payload as string
                state.loading = false
            })
    }
})

export const { addCategory, incrementPage, resetCategories,
    setError, setHasMore, setLoading } = categorySlice.actions

export default categorySlice.reducer