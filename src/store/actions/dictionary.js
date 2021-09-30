import * as actionTypes from "./actionTypes";
import axios from "axios";

const fetchDictionaryStart = () => {
  return {
    type: actionTypes.FETCH_DICTIONARY_START,
  };
};

const fetchDictionarySuccess = (payload) => {
  return {
    type: actionTypes.FETCH_DICTIONARY_SUCCESS,
    payload
  };
};

const fetchDictionaryFail = (error) => {
  return {
    type: actionTypes.FETCH_DICTIONARY_FAIL,
    error
  };
};

export const fetchDictionary = (keyword) => {
  return (dispatch) => {
    dispatch(fetchDictionaryStart());
    axios
      .get(" https://api.dictionaryapi.dev/api/v2/entries/en/" + keyword.trim())
      .then((res) => {
        const result = res.data[0];
        dispatch(fetchDictionarySuccess({
          word: result.word,
          partOfSpeech: result.meanings[0].partOfSpeech,
          definition: result.meanings[0].definitions
        }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchDictionaryFail(err));
      });
  };
};
