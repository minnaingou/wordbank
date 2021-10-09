import * as actionTypes from "./actionTypes";
import axios from "axios";

const API_KEY = "";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("lastUrl");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const autoLogout = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expiresIn * 1000);
  };
};

export const authenticate = ({ email, password }, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());

    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:${
      isSignup ? "signUp" : "signInWithPassword"
    }?key=${API_KEY}`;

    axios
      .post(url, authData)
      .then((response) => {
        const expirationTime = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        console.log("token expires @ " + expirationTime);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("expirationTime", expirationTime);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(autoLogout(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

// To preserve auth info on page reload
export const loginStatusCheck = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("[login status check] token exists");
      const expirationTime = new Date(localStorage.getItem("expirationTime"));
      if (expirationTime > new Date()) {
        console.log("[login status check] not expired yet");
        const localId = localStorage.getItem("userId");
        dispatch(authSuccess(token, localId));
        dispatch(
          autoLogout((expirationTime.getTime() - new Date().getTime()) / 1000)
        );
      } else {
        dispatch(authLogout());
      }
    }
  };
};

export const authCleanUp = () => {
  return {
    type: actionTypes.AUTH_CLEANUP,
  };
};
