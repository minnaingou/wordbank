import * as actionTypes from "../actions/actionTypes";

const initialState = {
  dictionaries: null,
  error: null,
  loading: false,
  deleted: false
};

const fetchDictionaryListStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchDictionaryListSuccess = (state, action) => {
  return {
    ...state,
    dictionaries: action.dictionaries,
    loading: false,
  };
};

const fetchDictionaryListFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const deleteDictionarySuccess = (state) => {
  return {
    ...state,
    deleted: true
  }
}

const deleteDictionaryFail = (state, action) => {
  return {
    ...state,
    error: action.error
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DICTIONARY_LIST_START:
      return fetchDictionaryListStart(state);
    case actionTypes.FETCH_DICTIONARY_LIST_SUCCESS:
      return fetchDictionaryListSuccess(state, action);
    case actionTypes.FETCH_DICTIONARY_LIST_FAIL:
      return fetchDictionaryListFail(state, action);
    case actionTypes.DELETE_DICTIONARY_SUCCESS:
      return deleteDictionarySuccess(state);
    case actionTypes.DELETE_DICTIONARY_FAIL:
      return deleteDictionaryFail(state, action);
    default:
      return state;
  }
};

export default reducer;
