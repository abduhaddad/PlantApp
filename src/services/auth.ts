import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "./api";
import SecureStorage, { ACCESSIBLE } from "rn-secure-storage";

async function saveCredentials(token: string, user: Record<string, any>) {
    const options = { accessible: ACCESSIBLE.WHEN_UNLOCKED }
    await SecureStorage.setItem('token', token, options)
    await SecureStorage.setItem('user', JSON.stringify(user), options)
}

/**
 * Log in a user with the provided credentials.
 *
 * @param params - An object containing:
 *   - `identifier`: The user's identifier (e.g., email or username).
 *   - `password`: The user's password.
 * @returns A promise that resolves to the login response, including the JWT and user data.
 */
export const login = createAsyncThunk('auth/login',
    async ({ identifier, password }: { identifier: string, password: string }) => {
        const response = await fetchData('POST', 'auth/local', {
            identifier,
            password
        })
        await saveCredentials(response.jwt, response.user)
        return response
    })

/**
* Registers a new user with the provided details.
*
* @param params - An object containing:
*   - `email`: The user's email address.
*   - `username`: The user's chosen username.
*   - `password`: The user's password.
* @returns A promise that resolves to the registration response, including the JWT and user data.
*/
export const register = createAsyncThunk('auth/register',
    async ({ email, username, password }: { email: string, username: string, password: string }) => {
        const response = await fetchData('POST', 'auth/local/register', {
            email,
            username,
            password
        })
        await saveCredentials(response.jwt, response.user)
        return response
    })

/**
 * Fetches the current authenticated user's data.
 *
 * @returns A promise that resolves to the current user's data.
 */
export const fetchUserData = createAsyncThunk('auth/me',
    async () => {
        const response = await fetchData('GET', 'users/me')
        // await saveCredentials(response.jwt, response.user)
        return response
    })