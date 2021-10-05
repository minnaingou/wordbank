import * as actionTypes from "../actions/actionTypes";

const initialState = {
  practiceList: [],
  practiceItem: null,
  currentIndex: 0,
  loading: true,
  error: null,
  showComplete: false,
};

const fetchPracticeListStart = (state) => {
  return {
    ...state,
    showComplete: false,
    loading: true,
  };
};

const fetchPracticeListSuccess = (state, action) => {
  const practiceList = Object.keys(action.practiceList).map((key) => {
    return {
      key,
      ...action.practiceList[key],
    };
  });
  return {
    ...state,
    loading: false,
    practiceList,
    currentIndex: 0,
    practiceItem: practiceList[0],
  };
};

const fetchPracticeListFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const getNextQuestion = (state) => {
  console.log("current", state.currentIndex);
  let nextIndex;
  let showComplete = false;
  if (state.practiceList.length - 1 === state.currentIndex) {
    showComplete = true;
    nextIndex = 0;
  } else {
    nextIndex = state.currentIndex + 1;
  }
  // const nextIndex =
  //   state.practiceList.length - 1 === state.currentIndex
  //     ? 0
  //     : state.currentIndex + 1;
  console.log("next", nextIndex);
  return {
    ...state,
    currentIndex: nextIndex,
    showComplete,
    practiceItem: state.practiceList[nextIndex],
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
