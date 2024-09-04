import axios from "axios";
import { auth } from "../../utils/firebase"
import store from '../store/store'
import { user_logout } from "./userActions";

let retryCount = 0;

// const incrementRetryCount = () => {
//   retryCount += 1;
//   console.log('RC:', retryCount);
// }

// const resetRetryCount = () => {
//   retryCount = 0;
//   console.log('retry reset');
// }

axios.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const { dispatch, getState } = store;

    if (
      error.response.status == 401 &&
      error.response.data == "Invalid or expired token"
    ) {
      if (retryCount < 3) {
        try {
          const {
            userLogin: { userInfo },
          } = getState()

          let newInfo = userInfo

          const token = await auth.currentUser.getIdToken();
          newInfo.accessToken = token
          dispatch({ type: 'USER_LOGIN_SUCCESS', payload: newInfo })
          localStorage.setItem("userInfo", JSON.stringify(newInfo));
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.log("Token change failed", refreshError);
          // dispatch(user_logout())
          return Promise.reject(error);
        }
      } else {
        dispatch(user_logout())
      }
    }
  }
);
