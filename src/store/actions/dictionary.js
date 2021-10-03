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
  };
};

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
    // check if already saved (firebase api restricts using multiple filter)
    const queryParams = '?orderBy="userId"&equalTo="' + dictionary.userId + '"';
    axiosFirebase
      .get("/dictionaries.json" + queryParams)
      .then((res) => {
        let found = false;
        if (res.data) {
          if (
            Object.keys(res.data).filter(
              (key) => res.data[key].word === dictionary.word
            ).length > 0
          ) {
            found = true;
          }
        }
        if (found) {
          dispatch(
            saveDictionaryFail({ message: "The record already exists" })
          );
        } else {
          dispatch(saveDictionaryStart());
          axiosFirebase
            .post("/dictionaries.json", dictionary)
            .then((res) => {
              // Intentionally added some delay to show off loading
              new Promise((resolve) => {
                setTimeout(() => {
                  dispatch(saveDictionarySuccess(res.data));
                  resolve();
                }, 1000);
              });
            })
            .catch((error) => {
              console.log(error);
              dispatch(saveDictionaryFail(error));
            });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(saveDictionaryFail(error));
      });
  };
};

export const saveDictionaryCleanup = () => {
  return {
    type: actionTypes.SAVE_DICTIONARY_CLEANUP,
  };
};
