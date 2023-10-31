import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

/**
 *
 * @param error - `any`
 * @param message - `string`
 * @description Show toast message or error
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error?: any, message?: string) => {
    if (isAxiosError<{ content: string }>(error)) {
        const errorMessage = error.response?.data?.content || message;
        toast.error(errorMessage, {
            position: "top-center",
            autoClose: 800,
        })
    }
}
