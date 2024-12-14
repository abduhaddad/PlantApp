import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "./api";

/**
 * Fetches plant data with optional filters for pagination, title, and category.
 *
 * @param params - The parameters for filtering and pagination:
 *   - `page` (optional): The page number (default is 1).
 *   - `pageSize` (optional): The number of items per page.
 *   - `title` (optional): Filter by plant title.
 *   - `categoryName` (optional): Filter by category name.
 * @returns A promise that resolves to the fetched plant data.
 */
export const fetchPlantData = createAsyncThunk('plants/get',
    async ({ page = 1, pageSize, title = '', categoryName = '' }:
        { page?: number, pageSize?: number, title?: string, categoryName?: string }) => {
        const params: Record<string, any> = {
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
            'populate': '*'
        }
        if (title) { params['filters[title][$eqi]'] = title }
        if (categoryName) { params['filters[category][name][$eqi]'] = categoryName }
        const response = await fetchData('GET', 'plants', params)
        return response
    }
)

/**
 * Fetches plant data by a specific ID.
 *
 * @param params - An object containing:
 *   - `id`: The ID of the plant to fetch.
 * @returns A promise that resolves to the fetched plant data.
 */
export const fetchPlantDataById = createAsyncThunk('plants/id',
    async ({ id }: { id: number }) => {
        const response = await fetchData('GET', `plants/${id}`, {
            'populate': '*'
        })
        return response
    }
)

/**
 * Adds new plant data.
 *
 * @param params - An object containing:
 *   - `plant`: The plant data to add.
 * @returns A promise that resolves to the response after adding the plant.
 */
export const addPlantData = createAsyncThunk('plants/add',
    async ({ plant }: { plant: Record<string, any> }) => {
        const response = await fetchData('POST', 'plants', plant)
        return response
    }
)

/**
 * Updates plant data for a specific ID.
 *
 * @param params - An object containing:
 *   - `id`: The ID of the plant to update.
 *   - `plant`: The updated plant data.
 * @returns A promise that resolves to the response after updating the plant.
 */
export const updatePlantData = createAsyncThunk('plants/update',
    async ({ id, plant }: { id: number, plant: Record<string, any> }) => {
        const response = await fetchData('PUT', `plants/${id}`, plant)
        return response
    }
)

/**
 * Delete plant data for a specific ID.
 *
 * @param params - An object containing:
 *   - `id`: The ID of the plant to update.
 *   - `plant`: The updated plant data.
 * @returns A promise that resolves to the response after updating the plant.
 */
export const deletePlantData = createAsyncThunk('plants/delete',
    async ({ id }: { id: number }) => {
        const response = await fetchData('DELETE', `plants/${id}`)
        return { response, id }
    }
)