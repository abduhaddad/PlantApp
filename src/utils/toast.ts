import { ToastAndroid } from "react-native";

/**
 * Displays an informational toast message on Android devices.
 *
 * @param text - The message text to display.
 * @param isLong - Whether the toast duration should be long (`true`) or short (`false`). Defaults to `false`.
 */
export function msgInfo(text: string, isLong: boolean = false) {
    ToastAndroid.show(text, isLong ? ToastAndroid.LONG : ToastAndroid.SHORT)
}

/**
 * Displays a generic error toast message on Android devices.
 *
 * @param e - The error object or message to log or handle.
 */
export function msgError(e: any) {
    const err = String(e)
    if (err.includes('User did not share')) {
        msgInfo('Batal membagikan data')
        return
    }
    ToastAndroid.show('Terdapat kesalahan!', ToastAndroid.LONG)
}