import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  word: null,
  dictionaries: null,
  saveProgress: null,
  error: null
};

const fetchDictionaryStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchDictionarySuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    word: action.payload.word,
    dictionaries: action.payload.dictionaries,
  };
};

const fetchDictionaryFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const saveDictionaryStart = (state, action) => {
  return {
    ...state,
    saveProgress: "saving",
  };
};

const saveDictionarySuccess = (state, action) => {
  return {
    ...state,
    saveProgress: "saved",
  };
};

const saveDictionaryFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    saveProgress: "saved",
  };
};

const saveDictionaryCleanup = (state) => {
  return {
    saveProgress: null,
    error: null
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DICTIONARY_START:
      return fetchDictionaryStart(state);
    case actionTypes.FETCH_DICTIONARY_SUCCESS:
      return fetchDictionarySuccess(state, action);
    case actionTypes.FETCH_DICTIONARY_FAIL:
      return fetchDictionaryFail(state, action);
    case actionTypes.SAVE_DICTIONARY_START:
      return saveDictionaryStart(state, action);
    case actionTypes.SAVE_DICTIONARY_SUCCESS:
      return saveDictionarySuccess(state, action);
    case actionTypes.SAVE_DICTIONARY_FAIL:
      return saveDictionaryFail(state, action);
    case actionTypes.SAVE_DICTIONARY_CLEANUP:
      return saveDictionaryCleanup(state);
    default:
      return state;
  }
};

export default reducer;
