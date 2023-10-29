import { apiInstance } from 'constant/apiInstance'
import { FeedbackListType, FeedbackType } from 'types'

const api = apiInstance({
    baseURL: import.meta.env.VITE_FEEDBACK_API,
})

export const feedbackServices = {
    getFeedbackList: () => api.get<ApiResponse<FeedbackListType>>(''),
    postFeedback:(data:FeedbackType)=>api.post<ApiResponse<FeedbackType>>("",data),
}