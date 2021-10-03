import * as actionTypes from "../actions/actionTypes";

const initialState = {
  dictionaries: null,
  error: null,
  loading: false,
  deleted: false,
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

const deleteFavouriteSuccess = (state, action) => {
  const deleteFiltered = Object.keys(state.dictionaries)
    .filter((key) => key !== action.removedItem)
    .reduce((obj, key) => {
      obj[key] = state.dictionaries[key];
      return obj;
    }, {});
  return {
    ...state,
    dictionaries: deleteFiltered,
    deleted: true,
  };
};

const deleteFavouriteFail = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DICTIONARY_LIST_START:
      return fetchDictionaryListStart(state);
    case actionTypes.FETCH_DICTIONARY_LIST_SUCCESS:
      return fetchDictionaryListSuccess(state, action);
    case actionTypes.FETCH_DICTIONARY_LIST_FAIL:
      return fetchDictionaryListFail(state, action);
    case actionTypes.DELETE_FAVOURITE_SUCCESS:
      return deleteFavouriteSuccess(state, action);
    case actionTypes.DELETE_FAVOURITE_FAIL:
      return deleteFavouriteFail(state, action);
    default:
      return state;
  }
};

export default reducer;
