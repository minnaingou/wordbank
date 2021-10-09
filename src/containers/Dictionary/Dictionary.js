import React from "react";
import { connect } from "react-redux";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import SearchBar from "../../components/UI/SearchBar/SearchBar";
import * as actionCreators from "../../store/actions";
import DictionaryCard from "../../components/Dictionary/DictionaryCard/DictionaryCard";
import FloatingActionButton from "../../components/UI/FloatingActionButton/FloatingActionButton";
import EmptyPage from "../../components/UI/EmptyPage/EmptyPage";

const Dictionary = (props) => {
  const onSearchHandler = (keyword) => {
    props.onSearch(keyword);
  };

  const onAddWordInputHandler = (index) => {
    props.history.push("/add-favourite", {
      word: props.word,
      dictionary: props.dictionaries[index],
    });
  };

  const onFabHandler = () => {
    props.history.push("/add-favourite");
  };

  let searchResult;
  if (props.loading) {
    searchResult = (
      <Stack
        sx={{ margin: 2 }}
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        {[...Array(2)].map((_, i) => (
          <Skeleton
            key={i}
            sx={{ height: "30vh", width: '100%' }}
            variant="rectangular"
          />
        ))}
      </Stack>
    );
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
      <EmptyPage message="Search or add a new word" />
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
