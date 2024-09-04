import { auth } from "../../utils/firebase";
import axios from "axios";
import {
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
  USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL
} from "../../constant/userConstants";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const registerUser = (firstName, lastName, email, password, companyName) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, { displayName: firstName });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCredential.user.accessToken}`,
      },
    };

    let { data } = await axios.post(`/api/auth/create-user`, {
      firstName,
      lastName,
      email,
      companyName,
    },
      config
    );

    // Adding access token to the data
    data.accessToken = userCredential.user.accessToken;

    dispatch({ type: USER_REGISTER_SUCCESS }); // Dispatching user registration success action
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data }); // Dispatching user login success action with user data

    localStorage.setItem("userInfo", JSON.stringify(data)); // Storing user information in localStorage
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message }); // Dispatching user registration failure action
  }
};

// Action to log in an existing user
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST }); // Dispatching user login request action

    // Signing in the user with Firebase authentication
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Configuration for axios request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCredential.user.accessToken}`,
      },
    };
    console.log(config)

    // Fetching user data from the backend
    let { data } = await axios.get("/api/auth/get-user-data", config);

    // Adding access token to the data
    data.accessToken = userCredential.user.accessToken;

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};


export const user_logout = () => (dispatch) => {
  try {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
