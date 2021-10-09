import * as actionTypes from "./actionTypes";
import axiosFirebase from "../../utils/firebase-axios";

const fetchStatisticsStart = () => {
  return {
    type: actionTypes.FETCH_STATISTICS_START,
  };
};

const fetchStatisticsSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_STATISTICS_SUCCESS,
    dictionaries: payload,
  };
};

const fetchStatisticsFail = (error) => {
  return {
    type: actionTypes.FETCH_STATISTICS_FAIL,
    error,
  };
};

export const fetchStatistics = (userId, token) => {
  return (dispatch) => {
    dispatch(fetchStatisticsStart());
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    axiosFirebase
      .get("/dictionaries.json?auth=" + token + queryParams)
      .then((res) => {
        dispatch(fetchStatisticsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchStatisticsFail(err));
      });
  };
};
