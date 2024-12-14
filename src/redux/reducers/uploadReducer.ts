import { createSlice } from "@reduxjs/toolkit"
import { upload } from "../../services/upload"


interface UploadState {
    uploadUrl: string,
    error: string | null,
    loading: boolean
}

const initialState: UploadState = {
    uploadUrl: '',
    error: null,
    loading: false
}

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(upload.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(upload.fulfilled, (state, action) => {
                state.uploadUrl = action.payload[0].url
                state.loading = false
            })
            .addCase(upload.rejected, (state, action) => {
                state.error = action.payload as string
                state.loading = false
            })
    }
})

export default uploadSlice.reducer