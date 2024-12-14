import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "./api";

/**
 * Fetches category data with optional pagination.
 *
 * @param params - The parameters for pagination:
 *   - `page` (optional): The page number (default is 1).
 *   - `pageSize` (optional): The number of items per page.
 * @returns A promise that resolves to the fetched category data.
 */
export const fetchCategoriesData = createAsyncThunk('categories/get',
    async ({ page = 1, pageSize }:
        { page?: number, pageSize?: number }) => {
        const params: Record<string, any> = {
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
            'populate': '*'
        };
        const response = await fetchData('GET', 'categories', params)
        return response
    }
)