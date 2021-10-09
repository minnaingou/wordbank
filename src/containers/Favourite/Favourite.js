import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import * as actionCreators from "../../store/actions";
import FavouriteItem from "../../components/Favourite/FavouriteItem/FavouriteItem";
import DialogBox from "../../components/UI/DialogBox/DialogBox";
import SearchBar from "../../components/UI/SearchBar/SearchBar";
import EmptyPage from "../../components/UI/EmptyPage/EmptyPage";

const Favourite = (props) => {
  const [dialog, setDialog] = useState({ show: false, key: null });
  const [itemExpanded, setItemExpanded] = useState(false);
  const [searchKey, setSearchKey] = useState(null);

  useEffect(() => {
    props.fetchDictionaries(props.userId, props.token);
    // eslint-disable-next-line
  }, []);

  const onEditHandler = (key) => {
    const dict = props.dictionaries[key];
    props.history.push("/favourites/edit-favourite", {
      key,
      word: dict.word,
      dictionary: {
        partOfSpeech: dict.meaning.pos,
        definition: dict.meaning.definition,
        example: dict.meaning.example,
        note: dict.meaning.note,
      },
    });
  };

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
    props.deleteFavourite(dialog.key, props.token);
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
          <Skeleton key={i} variant="text" animation="wave" />
        ))}
      </Stack>
    );
  } else if (props.dictionaries && Object.keys(props.dictionaries).length) {
    list = Object.keys(props.dictionaries)
      .sort((a, b) =>
        props.dictionaries[a].word.localeCompare(props.dictionaries[b].word)
      )
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
            note={dict.meaning.note}
            edited={() => onEditHandler(key)}
            deleted={() => onDeleteHandler(key)}
            expand={itemExpanded}
            expanded={onExpand}
          />
        );
      });
  } else {
    list = <EmptyPage message="Search or add a new word" />;
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
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDictionaries: (userId, token) =>
      dispatch(actionCreators.fetchDictionaryList(userId, token)),
    deleteFavourite: (key, token) =>
      dispatch(actionCreators.deleteFavourite(key, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
