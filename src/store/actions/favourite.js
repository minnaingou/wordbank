import * as actionTypes from "./actionTypes";
import axiosFirebase from "../../utils/firebase-axios";

const fetchDictionaryListStart = () => {
  return {
    type: actionTypes.FETCH_DICTIONARY_LIST_START,
  };
};

const fetchDictionaryListSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_DICTIONARY_LIST_SUCCESS,
    dictionaries: payload,
  };
};

const fetchDictionaryListFail = (error) => {
  return {
    type: actionTypes.FETCH_DICTIONARY_LIST_FAIL,
    error,
  };
};

export const fetchDictionaryList = () => {
  return (dispatch) => {
    dispatch(fetchDictionaryListStart());
    axiosFirebase
      .get("/dictionaries.json")
      .then((res) => {

        // Intentionally added some delay to show off loading
        new Promise(resolve => {
          setTimeout(() => {
            dispatch(fetchDictionaryListSuccess(res.data));
            resolve();
          }, 1000);
        })
        
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchDictionaryListFail(err));
      });
  };
};

const deleteFavouriteSuccess = (removedItem) => {
  return {
    type: actionTypes.DELETE_FAVOURITE_SUCCESS,
    removedItem
  };
};

const deleteFavouriteFail = (error) => {
  return {
    type: actionTypes.DELETE_FAVOURITE_FAIL,
    error,
  };
};

export const deleteFavourite = (key) => {
  return (dispatch) => {
    axiosFirebase
      .delete("/dictionaries/" + key + ".json")
      .then(() => {
        dispatch(deleteFavouriteSuccess(key));
        // Filtering locally instead of fetching again to avoid loading
        // dispatch(fetchDictionaryList());
      })
      .catch((err) => {
        console.log(err);
        dispatch(deleteFavouriteFail(err));
      });
  };
};