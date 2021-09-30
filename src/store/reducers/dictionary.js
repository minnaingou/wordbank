import * as actionTypes from "../actions/actionTypes";

const initialState = {
    definition: null,
    loading: false,
    partOfSpeech: null,
    word: null,
}

const fetchDictionaryStart = (state) => {
    return {
        ...state,
        loading: true
    }
}

const fetchDictionarySuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        definition: action.payload.definition,
        partOfSpeech: action.payload.partOfSpeech,
        word: action.payload.word
    }
}

const fetchDictionaryFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_DICTIONARY_START:
            return fetchDictionaryStart(state);
        case actionTypes.FETCH_DICTIONARY_SUCCESS:
            return fetchDictionarySuccess(state, action);
        case actionTypes.FETCH_DICTIONARY_FAIL:
            return fetchDictionaryFail(state, action);
        default: return state;
    }
}

export default reducer;