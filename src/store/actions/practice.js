import * as actionTypes from "./actionTypes";
import axiosFirebase from "../../utils/firebase-axios";

const fetchPracticeListStart = () => {
  return {
    type: actionTypes.FETCH_PRACTICE_LIST_START,
  };
};

const fetchPracticeListSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_PRACTICE_LIST_SUCCESS,
    practiceList: payload,
  };
};

const fetchPracticeListFail = (error) => {
  return {
    type: actionTypes.FETCH_PRACTICE_LIST_FAIL,
    error,
  };
};

export const fetchPracticeList = () => {
  return (dispatch) => {
    dispatch(fetchPracticeListStart());
    axiosFirebase
      .get("/dictionaries.json")
      .then((res) => {
        // Intentionally added some delay to show off loading
        new Promise((resolve) => {
          setTimeout(() => {
            dispatch(fetchPracticeListSuccess(res.data));            
            resolve();
          }, 1000);
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchPracticeListFail(err));
      });
  };
};

export const getNextQuestion = () => {
  return {
    type: actionTypes.GET_NEXT_QUESTION,
  };
};
