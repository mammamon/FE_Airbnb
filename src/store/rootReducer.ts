import { combineReducers } from '@reduxjs/toolkit'
import { userManageReducer } from './UserStore'

export const rootReducer = combineReducers({
    userManage: userManageReducer,

})
