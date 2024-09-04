import {
    LABS_LIST_REQUEST,
    LABS_LIST_SUCCESS,
    LABS_LIST_FAIL,

    LAB_SESSION_DETAILS_REQUEST,
    LAB_SESSION_DETAILS_FAIL,
    LAB_SESSION_DETAILS_SUCCESS
} from "../../constant/labConstants"


import { fetchLabList, fetchLabDetails } from '../../api'
import { user_logout } from './userActions'

export const getLabList = () => async (dispatch) => {
    try {

        dispatch({ type: LABS_LIST_REQUEST })
        const { data } = await fetchLabList();
        dispatch({ type: LABS_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        if (error.response && error.response.status === 401) {
            // Handle 401 Unauthorized
            dispatch({ type: LABS_LIST_FAIL, payload: 'Unauthorized. Please log in again.' });
            dispatch(user_logout()); // Dispatch logout action
        } else {
            dispatch({
                type: LABS_LIST_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    }
};

export const getLabDetails = (labId) => async (dispatch) => {
    try {
        dispatch({ type: LAB_SESSION_DETAILS_REQUEST });
        const { data } = await fetchLabDetails(labId);
        dispatch({ type: LAB_SESSION_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        const errorObject = {
            status: error.response?.status || 500,
            message: error.response?.data || 'An error occurred',
        };
        dispatch({ type: LAB_SESSION_DETAILS_FAIL, payload: errorObject });
    }
};
