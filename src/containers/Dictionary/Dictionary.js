import React from "react";
import { connect } from "react-redux";
import PetsIcon from "@mui/icons-material/Pets";
import Stack from "@mui/material/Stack";

import SearchBar from "../../components/UI/SearchBar/SearchBar";
import * as actionCreators from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import DictionaryCard from "../../components/DictionaryCard/DictionaryCard";

const Dictionary = (props) => {

  const onSearchHandler = (keyword) => {
    props.onSearch(keyword);
  };

  const onAddNewWordHandler = (index) => {
    const selectedDef = props.definitions[index].definition;
    props.history.push('/new-word', {
      definition: selectedDef,
      partOfSpeech: props.partOfSpeech,
      word: props.word
    });
  }

  let searchResult;
  if (props.loading) {
    searchResult = <Spinner />;
  } else if (props.definitions) {
    searchResult = (
      <div>
        {props.definitions.map((def, i) => (
          <DictionaryCard
            key={i}
            word={props.word}
            partOfSpeech={props.partOfSpeech}
            definition={def.definition}
            saved={() => onAddNewWordHandler(i)}
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
        sx={{ height: "60vh" }}
      >
        <PetsIcon fontSize="large" />
        <span>Search or add a new word</span>
      </Stack>
    );
  }

  return (
    <>
      <SearchBar searched={onSearchHandler} />
      {searchResult}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    definitions: state.dictionary.definition,
    partOfSpeech: state.dictionary.partOfSpeech,
    word: state.dictionary.word,
    loading: state.dictionary.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (keyword) => dispatch(actionCreators.fetchDictionary(keyword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
