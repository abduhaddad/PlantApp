import { configureStore } from "@reduxjs/toolkit";
import plantReducer from './reducers/plantReducer'
import authReducer from './reducers/authReducer'
import categoryReducer from './reducers/categoryReducer'
import uploadReducer from './reducers/uploadReducer'

export const store = configureStore({
    reducer: {
        plants: plantReducer,
        auth: authReducer,
        category: categoryReducer,
        upload: uploadReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch