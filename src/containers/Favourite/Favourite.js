import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PetsIcon from "@mui/icons-material/Pets";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import * as actionCreators from "../../store/actions";
import FavouriteItem from "../../components/Favourite/FavouriteItem/FavouriteItem";
import DialogBox from "../../components/UI/DialogBox/DialogBox";
import SearchBar from "../../components/UI/SearchBar/SearchBar";

const Favourite = (props) => {
  const [dialog, setDialog] = useState({ show: false, key: null });
  const [itemExpanded, setItemExpanded] = useState(false);
  const [searchKey, setSearchKey] = useState(null);

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
    props.deleteFavourite(dialog.key);
  };

  const onSearchChangeHandler = (keyword) => {
    setSearchKey(keyword);
  };

  const onExpand = (panel) => (event, isExpanded) => {
    setItemExpanded(isExpanded ? panel : false);
  };

  let list = null;
  if (props.loading) {
    list = (
      <Stack spacing={3} sx={{ minWidth: 275, margin: 2 }}>
        {[...Array(7)].map((_, i) => (
          <Skeleton key={i} variant="text" />
        ))}
      </Stack>
    );
  } else if (props.dictionaries) {
    list = Object.keys(props.dictionaries)
      .sort((a, b) => props.dictionaries[a].word.localeCompare(props.dictionaries[b].word))
      .filter((key) => {
        const dict = props.dictionaries[key];
        if (searchKey) {
          return dict.word.toLowerCase().includes(searchKey.toLowerCase());
        } else {
          return true;
        }
      })
      .map((key) => {
        const dict = props.dictionaries[key];
        return (
          <FavouriteItem
            key={key}
            word={dict.word}
            partOfSpeech={dict.meaning.pos}
            example={dict.meaning.example}
            definition={dict.meaning.definition}
            deleted={() => onDeleteHandler(key)}
            expand={itemExpanded}
            expanded={onExpand}
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
      <SearchBar changed={onSearchChangeHandler} />
      <div style={{ paddingBottom: 70 }}>{list}</div>
      <DialogBox
        content="Remove from favourite?"
        open={dialog.show}
        dismissLabel="Cancel"
        cancelled={onDeleteCancelHandler}
        confirmLabel="Remove"
        confirmed={onDeleteConfirmHandler}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dictionaries: state.favourite.dictionaries,
    loading: state.favourite.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDictionaries: () => dispatch(actionCreators.fetchDictionaryList()),
    deleteFavourite: (key) => dispatch(actionCreators.deleteFavourite(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
