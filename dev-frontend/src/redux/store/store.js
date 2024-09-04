import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

import { userLoginReducer, userProfileReducer, userRegisterReducer } from '../reducers/userReducers'
import { labDetailsReducer, labsListReducer } from '../reducers/labReducer'

const reducers = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    labsList:labsListReducer,
    labDetails:labDetailsReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : []


const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: true

})

export default store