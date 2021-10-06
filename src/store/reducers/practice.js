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
  const practiceList = Object.keys(action.practiceList)
    .map((key) => {
      return {
        key,
        // for items that haven't been practiced
        practice: {
          attempt: 0,
          success: 0,
        },        
        ...action.practiceList[key],
        synced: true
      };
    })
    .sort((a, b) => {
      const compare =
        a.practice.success / a.practice.attempt -
        b.practice.success / b.practice.attempt;
      if (Number.isNaN(compare)) {
        return -1;
      } else {
        return compare;
      }
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
  const nextIndex = state.currentIndex + 1;
  const showComplete = state.practiceList.length - 1 === state.currentIndex;
  const practiceItem = showComplete
    ? state.practiceItem
    : state.practiceList[state.currentIndex + 1];

  return {
    ...state,
    currentIndex: nextIndex,
    showComplete,
    practiceItem,
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
    case actionTypes.GET_NEXT_QUESTION_READY:
      return getNextQuestion(state, action);
    default:
      return state;
  }
};

export default reducer;
