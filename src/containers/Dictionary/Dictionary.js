import React from "react";
import { connect } from "react-redux";
import PetsIcon from "@mui/icons-material/Pets";
import Box from "@mui/material/Box";

import SearchBar from "../../components/UI/SearchBar/SearchBar";
import * as actionCreators from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import DictionaryCard from "../../components/DictionaryCard/DictionaryCard";

const Dictionary = (props) => {
  const onSearchHandler = (keyword) => {
    props.onSearch(keyword);
  };

  let searchResult;
  if (props.loading) {
    searchResult = <Spinner />;
  } else if (props.definition) {
    console.log(props.definition);
    searchResult = (
      <div>
        {props.definition.map((def, i) => (
          <DictionaryCard
            key={i}
            word={props.word}
            partOfSpeech={props.partOfSpeech}
            definition={def.definition}
          />
        ))}
      </div>
    );
  } else {
    searchResult = (
      <Box display="flow" alignItems="center" justifyContent="center">
        <PetsIcon /> 
        Search or add a new word
      </Box>
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
    definition: state.dictionary.definition,
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
