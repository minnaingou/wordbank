import * as actionTypes from "./actionTypes";
import axios from "axios";
import axiosFirebase from "../../utils/firebase-axios";

const fetchDictionaryStart = () => {
  return {
    type: actionTypes.FETCH_DICTIONARY_START,
  };
};

const fetchDictionarySuccess = (payload) => {
  return {
    type: actionTypes.FETCH_DICTIONARY_SUCCESS,
    payload,
  };
};

const fetchDictionaryFail = (error) => {
  return {
    type: actionTypes.FETCH_DICTIONARY_FAIL,
    error,
  };
};

export const fetchDictionary = (keyword) => {
  return (dispatch) => {
    dispatch(fetchDictionaryStart());
    axios
      .get(" https://api.dictionaryapi.dev/api/v2/entries/en/" + keyword.trim())
      .then((res) => {
        const result = res.data[0];
        const dictionaries = [];
        result.meanings.forEach((m, mi) => {
          m.definitions.forEach((d, di) => {
            dictionaries.push({
              key: mi + ":" + di,
              partOfSpeech: m.partOfSpeech,
              definition: d.definition,
              example: d.example,
              synonyms: d.synonyms,
            });
          });
        });

        dispatch(
          fetchDictionarySuccess({
            word: result.word,
            dictionaries,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchDictionaryFail(err));
      });
  };
};

const saveDictionaryStart = () => {
  return {
    type: actionTypes.SAVE_DICTIONARY_START,
  }
}

const saveDictionarySuccess = (payload) => {
  return {
    type: actionTypes.SAVE_DICTIONARY_SUCCESS,
    payload,
  };
};

const saveDictionaryFail = (error) => {
  return {
    type: actionTypes.SAVE_DICTIONARY_FAIL,
    error,
  };
};

export const saveDictionary = (dictionary) => {
  return (dispatch) => {
    dispatch(saveDictionaryStart());
    axiosFirebase
      .post("/dictionaries.json", dictionary)
      .then((res) => {
        console.log(res.data);
        dispatch(saveDictionarySuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(saveDictionaryFail(err));
      });
  };
};

export const saveDictionaryCleanup = () => {
  return {
    type: actionTypes.SAVE_DICTIONARY_CLEANUP
  }
}