import * as actionTypes from "../actions/actionTypes";

const initialState = {
  rawStats: [],
  loading: true,
  error: null,
};

const fetchStatisticsStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchStatisticsSuccess = (state, action) => {
  const rawStats = Object.keys(action.dictionaries).map((key) => {
    const dict = action.dictionaries[key];
    return {
      word: dict.word,
      practice: dict.practice,
    };
  });
  return {
    ...state,
    loading: false,
    rawStats,
  };
};

const fetchStatisticsFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STATISTICS_START:
      return fetchStatisticsStart(state, action);
    case actionTypes.FETCH_STATISTICS_SUCCESS:
      return fetchStatisticsSuccess(state, action);
    case actionTypes.FETCH_STATISTICS_FAIL:
      return fetchStatisticsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
