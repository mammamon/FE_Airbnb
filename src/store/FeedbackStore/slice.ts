import { createSlice } from '@reduxjs/toolkit'
import { FeedbackListType, FeedbackType } from 'types'
import { getFeedbackListThunk, postFeedbackThunk } from '.'

type feedbackInitialState = {
    feedbackList?: FeedbackListType,
    isFetchingFeedbackList?: boolean,
    sentFeedback?:FeedbackType,
}

const initialState:feedbackInitialState = {
	isFetchingFeedbackList:false,
}

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getFeedbackListThunk.pending, (state) => {
                state.isFetchingFeedbackList = true
            })
            .addCase(getFeedbackListThunk.rejected, (state) => {
                state.isFetchingFeedbackList = false
            })
            .addCase(getFeedbackListThunk.fulfilled, (state, action) => {
                state.feedbackList = action.payload
				// console.log(action.payload)
                state.isFetchingFeedbackList = false
            });
            builder.addCase(postFeedbackThunk.fulfilled,(state,action)=>{
                state.sentFeedback=action.payload
            })
    },
})

export const { actions: feedbackActions, reducer: feedbackReducer } = feedbackSlice
