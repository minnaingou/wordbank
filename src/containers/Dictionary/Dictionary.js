import React from "react";
import { connect } from "react-redux";
import PetsIcon from "@mui/icons-material/Pets";
import Stack from "@mui/material/Stack";

import SearchBar from "../../components/UI/SearchBar/SearchBar";
import * as actionCreators from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import DictionaryCard from "../../components/Dictionary/DictionaryCard/DictionaryCard";
import FloatingActionButton from "../../components/UI/FloatingActionButton/FloatingActionButton";

const Dictionary = (props) => {
  const onSearchHandler = (keyword) => {
    props.onSearch(keyword);
  };

  const onAddWordInputHandler = (index) => {
    props.history.push("/new-word", {
      word: props.word,
      dictionary: props.dictionaries[index],
    });
  };

  const onFabHandler = () => {
    props.history.push("/new-word");
  };

  let searchResult;
  if (props.loading) {
    searchResult = <Spinner />;
  } else if (props.dictionaries) {
    searchResult = (
      <div style={{ paddingBottom: 50 }}>
        {props.dictionaries.map((dict, i) => (
          <DictionaryCard
            key={dict.key}
            word={props.word}
            partOfSpeech={dict.partOfSpeech}
            definition={dict.definition}
            example={dict.example}
            saved={() => onAddWordInputHandler(i)}
          />
        ))}
      </div>
    );
  } else {
    searchResult = (
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ height: "50vh" }}
      >
        <PetsIcon fontSize="large" />
        <span>Search or add a new word</span>
      </Stack>
    );
  }

  return (
    <>
      <SearchBar searched={onSearchHandler} focus />
      {searchResult}
      <FloatingActionButton clicked={onFabHandler} type="add" />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.dictionary.loading,
    word: state.dictionary.word,
    dictionaries: state.dictionary.dictionaries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (keyword) => dispatch(actionCreators.fetchDictionary(keyword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
