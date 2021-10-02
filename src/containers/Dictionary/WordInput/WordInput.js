import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";

import FloatingActionButton from "../../../components/UI/FloatingActionButton/FloatingActionButton";
import * as actionCreators from "../../../store/actions";

const WordInput = (props) => {
  const [form, setForm] = useState({
    word: {
      value: "",
      validation: {
        required: true,
      },
    },
    pos: {
      value: "",
      validation: {
        required: true,
      },
    },
    meaning: {
      value: "",
      validation: {
        required: true,
      },
    },
    example: {
      value: "",
      validation: {},
    },
    note: {
      value: "",
      validation: {},
    },
  });

  useEffect(() => {
    const dict = props.location.state;
    if (dict) {
      setForm({
        ...form,
        word: {
          ...form.word,
          value: dict.word,
        },
        pos: {
          ...form.pos,
          value: dict.dictionary.partOfSpeech,
        },
        meaning: {
          ...form.meaning,
          value: dict.dictionary.definition,
        },
        example: {
          ...form.example,
          value: dict.dictionary.example,
        },
      });
    }

    // clean up
    return () => {
      props.cleanup();
    }
    // eslint-disable-next-line
  }, []);

  const onChangeHandler = (event, input) => {
    setForm({
      ...form,
      [input]: {
        ...form[input],
        value: event.target.value,
      },
    });
  };

  const onFabHandler = () => {
    const dictionary = {
      userId: "dummy",
      word: form.word.value,
      meaning: {
        pos: form.pos.value,
        definition: form.meaning.value,
        example: form.example.value,
        note: form.note.value,
      },
    };

    props.onSave(dictionary);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
          textAlign: "left",
        }}
        noValidate
        autoComplete="off"
        m={3}
      >
        <Stack direction="row" spacing={3}>
          <TextField
            id="word"
            label="Word"
            value={form.word.value}
            onChange={(event) => onChangeHandler(event, "word")}
            sx={{ width: "65%" }}
            inputProps={{ style: { textTransform: "lowercase" } }}
          />
          <FormControl sx={{ width: "35%" }}>
            <InputLabel id="posl">Part of Speech</InputLabel>
            <Select
              //   variant="standard"
              labelId="posl"
              id="pos"
              value={form.pos.value ? form.pos.value : ""}
              onChange={(event) => onChangeHandler(event, "pos")}
              label="Part of Speech"
            >
              <MenuItem value="noun">Noun</MenuItem>
              <MenuItem value="adverb">Adverb</MenuItem>
              <MenuItem value="verb">Verb</MenuItem>
              <MenuItem value="adjective">Adjective</MenuItem>
              <MenuItem value="preposition">Preposition</MenuItem>
              <MenuItem value="conjunction">Conjunction</MenuItem>
              <MenuItem value="pronoun">Pronoun</MenuItem>
              <MenuItem value="interjection">Interjection</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <TextField
          id="meaning"
          label="Meaning"
          multiline
          rows={2}
          value={form.meaning.value}
          onChange={(event) => onChangeHandler(event, "meaning")}
        />
        <TextField
          id="example"
          label="Example usage"
          multiline
          rows={2}
          value={form.example.value}
          onChange={(event) => onChangeHandler(event, "example")}
        />
        <TextField
          id="note"
          label="Note"
          multiline
          rows={2}
          value={form.note.value}
          onChange={(event) => onChangeHandler(event, "note")}
        />
      </Box>
      <FloatingActionButton
        clicked={onFabHandler}
        type="save"
        showProgress
        progress={{ loading: props.saving, success: props.saved }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    saving: state.dictionary.saveProgress === 'saving' ? true : false,
    saved: state.dictionary.saveProgress === 'saved' ? true : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (dictionary) => dispatch(actionCreators.saveDictionary(dictionary)),
    cleanup: () => dispatch(actionCreators.saveDictionaryCleanup())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordInput);