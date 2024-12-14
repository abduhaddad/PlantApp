import SecureStorage from "rn-secure-storage";

/**
 * Retrieves the current user data stored securely.
 *
 * @returns A promise that resolves to the parsed user data if available, or `null` if not found or an error occurs.
 */
export async function getCurrentUser() {
    try {
        const data = await SecureStorage.getItem('user')
        return data && JSON.parse(data)
    } catch (e) {
        return null
    }
}

/**
 * Retrieves the authentication token stored securely.
 *
 * @returns A promise that resolves to the token string if available, or `null` if not found or an error occurs.
 */
export async function getToken() {
    try {
        const data = await SecureStorage.getItem('token')
        return data || null
    } catch (e) {
        return null
    }
}