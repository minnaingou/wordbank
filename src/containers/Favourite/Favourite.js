import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PetsIcon from "@mui/icons-material/Pets";
import Stack from "@mui/material/Stack";

import * as actionCreators from "../../store/actions";
import SavedDictionaryItem from "../../components/UI/SavedDictionaryItem/SavedDictionaryItem";
import DialogBox from "../../components/UI/DialogBox/DialogBox";
import SearchBar from "../../components/UI/SearchBar/SearchBar";

const Favourite = (props) => {
  const [dialog, setDialog] = useState({ show: false, key: null });

  useEffect(() => {
    props.fetchDictionaries();
    // eslint-disable-next-line
  }, []);

  const onDeleteHandler = (key) => {
    setDialog({
      show: true,
      key,
    });
  };

  const onDeleteCancelHandler = () => {
    setDialog({ show: false });
  };

  const onDeleteConfirmHandler = () => {
    setDialog({ show: false });
    props.deleteDictionary(dialog.key);
  };

  const onSearchHandler = (keyword) => {
    
  };

  let list = null;
  if (props.dictionaries) {
    list = Object.keys(props.dictionaries).map((key) => {
      const dict = props.dictionaries[key];
      return (
        <SavedDictionaryItem
          key={key}
          word={dict.word}
          partOfSpeech={dict.meaning.pos}
          example={dict.meaning.example}
          definition={dict.meaning.definition}
          deleted={() => onDeleteHandler(key)}
        />
      );
    });
  } else {
    list = (
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
      <SearchBar searched={onSearchHandler} />
      {list}
      <DialogBox
        open={dialog.show}
        cancelled={onDeleteCancelHandler}
        confirmed={onDeleteConfirmHandler}
        confirmLabel="Delete"
        content="Delete favourite?"
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dictionaries: state.favourite.dictionaries,
    showToast: state.favourite.deleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDictionaries: () => dispatch(actionCreators.fetchDictionaryList()),
    deleteDictionary: (key) => dispatch(actionCreators.deleteDictionary(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
