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

const sortQuestions = (a, b) => {
  // a<b=-1, a>b=1, 0
  if (!a.practice && b.practice) {
    return -1;
  } else if (a.practice && !b.practice) {
    return 1;
  } else if (!a.practice && !b.practice) {
    return 0;
  } else {
    const compare =
      a.practice.success / a.practice.attempt -
      b.practice.success / b.practice.attempt;
    if (compare < 0) {
      return -1;
    } else if (compare > 0) {
      return 1;
    } else {
      return 0;
    }
  }
};

const fetchPracticeListSuccess = (state, action) => {
  const practiceList = Object.keys(action.practiceList).map((key) => {
    return {
      key,
      practice: {
        attempt: 0,
        success: 0,
      },
      ...action.practiceList[key],
    };
  });
  console.log("the list", practiceList);

  const sortedPracticeList = practiceList.sort(sortQuestions);
  console.log("sorted list", sortedPracticeList);
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
