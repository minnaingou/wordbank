import * as actionTypes from "../actions/actionTypes";

const initialState = {
  practiceList: null,
  practiceItem: null,
  currentIndex: 0,
  loading: false,
  error: null,
};

const getNextQuestion = (state) => {
  return {
    ...state,
    //currentIndex: practiceList.length < state.currentIndex + 1 : 0,
    currentIndex: state.currentIndex + 1,
    practiceItem: state.practiceList[Object.keys(state.practiceList)[state.currentIndex + 1]]
  };
};

const fetchPracticeListStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchPracticeListSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    practiceList: action.practiceList,
    currentIndex: 0,
    practiceItem: action.practiceList[Object.keys(action.practiceList)[0]]
  };
};

const fetchPracticeListFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRACTICE_LIST_START:
      return fetchPracticeListStart(state, action);
    case actionTypes.FETCH_PRACTICE_LIST_SUCCESS:
      return fetchPracticeListSuccess(state, action);
    case actionTypes.FETCH_PRACTICE_LIST_FAIL:
      return fetchPracticeListFail(state, action);
    case actionTypes.GET_NEXT_QUESTION:
      return getNextQuestion(state, action);
    default:
      return state;
  }
};

export default reducer;
