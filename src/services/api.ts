import axios from "axios"
import { getToken, msgError, msgInfo } from "../utils"

const BASE_URL = 'http://172.235.246.30:1337/api/'

const api = axios.create({
    baseURL: BASE_URL,
})

/**
 * Fetches data from a specified API endpoint with support for various HTTP methods.
 *
 * @param method - The HTTP method to use for the request.
 * @param endpoint - The API endpoint to call.
 * @param params - The parameters to send with the request.
 *   - For GET requests, these will be sent as query parameters.
 *   - For other methods, these will be sent as the request body.
 * @param headers - Headers to include in the request.
 *   - The Authorization header is automatically added if a token is available.
 * @returns A promise that resolves with the response data or rejects with an error object.
 * @throws An error object containing:
 *   - `message`: A descriptive error message.
 *   - `status`: The HTTP status code (default: 500).
 *   - `error`: The full error object for additional debugging information.
 */
export async function fetchData(method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    endpoint: string, params: Record<string, any> = {},
    headers: Record<string, any> = {
        'Content-Type': 'application/json'
    }) {
    try {
        const token = await getToken()
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        const config = {
            method,
            url: endpoint,
            headers,
            ...(method === 'GET' ? { params } : { data: params })
        }

        const response = await api(config)
        return response.data
    } catch (e: any) {
        const errMsg = {
            message: e.response?.data?.error?.message || 'Terdapat kesalahan!',
            status: e.response?.status || 500,
            error: e
        }
        msgInfo(errMsg?.message)
        throw errMsg
    }
}

export default api