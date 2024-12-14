import { PermissionsAndroid } from "react-native"
import { msgInfo } from "./toast"

/**
 * Checks and requests camera permission on Android devices.
 *
 * @returns A promise that resolves to `true` if the permission is granted, or `false` if denied.
 * @throws Displays a message prompting the user to grant camera permission if not already granted.
 */
export async function checkCameraPermission() {
    const isGranted = await PermissionsAndroid.request('android.permission.CAMERA')
    if (!isGranted) {
        msgInfo('Harap memberikan izin camera agar aplikasi dapat berfungsi dengan baik', true)
        return false
    }
    return true
}