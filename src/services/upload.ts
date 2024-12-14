import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchData } from "./api"

/**
 * Uploads a file to the server using the `/upload` endpoint.
 *
 * @param payload - The payload containing the file to be uploaded:
 *   - `file`: The file object to upload.
 *     - `uri`: The URI of the file to upload.
 *     - `fileName` (optional): The name of the file (defaults to "image.jpg").
 *     - `type` (optional): The MIME type of the file (defaults to "image/jpeg").
 * @returns A promise that resolves to the server response, typically including details about the uploaded file.
 * @example
 * const uploadedImage = await dispatch(upload({ file: selectedImage }))
 */
export const upload = createAsyncThunk('upload',
    async ({ file }: { file: Record<string, any> }) => {
        const formData = new FormData()
        formData.append('files', {
            uri: file?.uri,
            name: file?.fileName || 'image.jpg',
            type: file?.type || 'image/jpeg',
        })

        const response = await fetchData('POST', 'upload', formData, {
            'Content-Type': 'multipart/form-data'
        })
        return response
    }
)