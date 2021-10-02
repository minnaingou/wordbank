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
        console.log(res.data);
        dispatch(fetchDictionaryListSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchDictionaryListFail(err));
      });
  };
};

const deleteDictionarySuccess = () => {
  return {
    type: actionTypes.DELETE_DICTIONARY_SUCCESS,
  };
};

const deleteDictionaryFail = (error) => {
  return {
    type: actionTypes.DELETE_DICTIONARY_FAIL,
    error,
  };
};

export const deleteDictionary = (key) => {
  return (dispatch) => {
    axiosFirebase
      .delete("/dictionaries/" + key + ".json")
      .then(() => {
        dispatch(deleteDictionarySuccess());
        dispatch(fetchDictionaryList());
      })
      .catch((err) => {
        console.log(err);
        dispatch(deleteDictionaryFail(err));
      });
  };
};
