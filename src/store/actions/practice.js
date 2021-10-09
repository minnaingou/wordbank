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

export const fetchPracticeList = (userId, token) => {
  return (dispatch) => {
    dispatch(fetchPracticeListStart());
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    axiosFirebase
      .get("/dictionaries.json?auth=" + token + queryParams)
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

const getNextQuestionReady = () => {
  return {
    type: actionTypes.GET_NEXT_QUESTION_READY,
  };
};

const votePracticeSuccess = (practiceData) => {
  return {
    type: actionTypes.VOTE_PRACTICE_SUCCESS,
    practice: practiceData,
  };
};

export const votePractice = (practiceItem, voted, token) => {
  return (dispatch) => {
    const practiceUpdated = {
      practice: {
        ...practiceItem.practice,
        attempt: practiceItem.practice.attempt + 1,
        [voted]: practiceItem.practice[voted] + 1,
      },
    };
    axiosFirebase
      .patch(
        "/dictionaries/" + practiceItem.key + ".json?auth=" + token,
        practiceUpdated
      )
      .then((res) => {
        dispatch(votePracticeSuccess(res.data));
        dispatch(getNextQuestionReady());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
