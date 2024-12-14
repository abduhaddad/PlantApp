import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import SecureStorage, { ACCESSIBLE } from "rn-secure-storage";
import { fetchUserData, login, register } from "../../services/auth";

interface AuthProps {
    token: string | null,
    user: Record<string, any> | null,
    name: string | null,
    loading: boolean,
    error: string | null
}

const initialState: AuthProps = {
    token: null,
    user: null,
    name: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null
            state.token = null
            state.error = null
            SecureStorage.removeItem('token')
            SecureStorage.removeItem('user')
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                const { jwt, user } = action.payload;
                state.user = user;
                state.token = jwt;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                const { jwt, user } = action.payload;
                state.user = user;
                state.token = jwt;
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
    },
})

export const { logout, setLoading } = authSlice.actions

export default authSlice.reducer