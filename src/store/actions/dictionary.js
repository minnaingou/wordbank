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

const findSavedFavouriteByWord = (userId, word, token) => {
  return new Promise((resolve, reject) => {
    // check if already saved (firebase api restricts using multiple filter)
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    axiosFirebase
      .get("/dictionaries.json?auth=" + token + queryParams)
      .then((res) => {
        const favourite = Object.keys(res.data).find(
          (key) => res.data[key].word === word
        );
        resolve(favourite);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const postFavouriteToFirebase = (dictionary, token) => {
  return new Promise((resolve, reject) => {
    axiosFirebase
      .post("/dictionaries.json?auth=" + token, dictionary)
      .then((res) => {
        // Intentionally added some delay to show off loading
        setTimeout(() => {
          resolve(res.data);
        }, 600);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const updateFavouriteToFirebase = (key, dictionary, token) => {
  return new Promise((resolve, reject) => {
    axiosFirebase
      .put("/dictionaries/" + key + ".json?auth=" + token, dictionary)
      .then((res) => {
        // Intentionally added some delay to show off loading
        setTimeout(() => {
          resolve(res.data);
        }, 600);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const saveDictionary = (dictionary, editing, editKey, token) => {
  return (dispatch) => {
    if (editing) {
      dispatch(saveDictionaryStart());
      updateFavouriteToFirebase(editKey, dictionary, token)
        .then((res) => {
          dispatch(saveDictionarySuccess(res));
        })
        .catch((error) => {
          console.error(error);
          dispatch(saveDictionaryFail(error));
        });
    } else {
      findSavedFavouriteByWord(dictionary.userId, dictionary.word, token)
        .then((savedFav) => {
          if (savedFav) {
            dispatch(
              saveDictionaryFail({ message: "The record already exists" })
            );
          } else {
            dispatch(saveDictionaryStart());
            postFavouriteToFirebase(dictionary, token)
              .then((res) => {
                dispatch(saveDictionarySuccess(res));
              })
              .catch((error) => {
                console.error(error);
                dispatch(saveDictionaryFail(error));
              });
          }
        })
        .catch((error) => {
          console.error(error);
          dispatch(saveDictionaryFail(error));
        });
    }
  };
};

export const saveDictionaryCleanUp = () => {
  return {
    type: actionTypes.SAVE_DICTIONARY_CLEANUP,
  };
};

export const fetchDictionaryCleanUp = () => {
  return {
    type: actionTypes.FETCH_DICTIONARY_CLEANUP,
  };
};
