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
          positive: 0,
          negative: 0,
          skip: 0,
        },
        ...action.practiceList[key],
      };
    })
    .sort((a, b) => {
      const sortByAttempt = a.practice.attempt - b.practice.attempt;
      if (sortByAttempt) {
        return sortByAttempt;
      }
      const compare =
        a.practice.positive / a.practice.attempt -
        b.practice.positive / b.practice.attempt;
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

const getNextQuestionReady = (state) => {
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

const votePracticeSuccess = (state, action) => {
  const practiceList = [...state.practiceList];
  const practiceItem = practiceList[state.currentIndex];
  practiceList.splice(state.currentIndex, 1, {
    ...practiceItem,
    practice: { ...action.practice },
  });
  return {
    ...state,
    practiceList,
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
      return getNextQuestionReady(state, action);
    case actionTypes.VOTE_PRACTICE_SUCCESS:
      return votePracticeSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
