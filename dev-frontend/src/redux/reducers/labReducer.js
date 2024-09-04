import {
    LABS_LIST_REQUEST,
    LABS_LIST_SUCCESS,
    LABS_LIST_FAIL,
    LAB_SESSION_DETAILS_REQUEST,
    LAB_SESSION_DETAILS_SUCCESS,
    LAB_SESSION_DETAILS_FAIL,
    LAB_SESSION_DETAILS_RESET
} from "../../constant/labConstants";


export const labsListReducer = (state = {}, action) => {
    switch (action.type) {
        case LABS_LIST_REQUEST:
            return { ...state, loading: true }
        case LABS_LIST_SUCCESS:
            return { ...state, loading: false, success: true, labsData: action.payload }
        case LABS_LIST_FAIL:
            return { ...state, loading: false, success: false, error: action.payload }
        default:
            return state
    }
}


export const labDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case LAB_SESSION_DETAILS_REQUEST:
            return { ...state, loading: true }
        case LAB_SESSION_DETAILS_SUCCESS:
            return { ...state, loading: false, success: true, labInfo: action.payload }
        case LAB_SESSION_DETAILS_FAIL:
            return { ...state, loading: false, success: false, error: action.payload }
        case LAB_SESSION_DETAILS_RESET:
            return {}
        default:
            return state
    }
}
