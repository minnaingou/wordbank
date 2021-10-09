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
import DialogBox from "../../../components/UI/DialogBox/DialogBox";

const WordInput = (props) => {
  const [form, setForm] = useState({
    word: {
      value: "",
      validation: {
        required: true,
      },
    },
    pos: {
      value: "noun",
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
  const [errorDialog, setErrorDialog] = useState(false);
  const [validForm, setValidForm] = useState(true);

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
    };
    // eslint-disable-next-line
  }, []);

  const { error } = props;

  useEffect(() => {
    if (error) {
      setErrorDialog(true);
    }
  }, [error]);

  useEffect(() => {
    let valid = true;
    Object.keys(form).forEach((key) => {
      if (form[key].validation.required && !form[key].value) {
        valid = false;
      }
    });
    setValidForm(valid);
  }, [form]);

  const onChangeHandler = (event, input) => {
    setForm({
      ...form,
      [input]: {
        ...form[input],
        value: event.target.value,
      },
    });
  };

  const onErrorConfirmHandler = () => {
    setErrorDialog(false);
  };

  const onFabHandler = () => {
    const dictionary = {
      userId: props.userId,
      word: form.word.value,
      meaning: {
        pos: form.pos.value,
        definition: form.meaning.value,
        example: form.example.value,
        note: form.note.value,
      },
    };
    // props.mode = [ add | edit ]
    props.onSave(dictionary, props.mode === "edit", props.location.state.key);
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
              <MenuItem value="abbreviation">Abbreviation</MenuItem>
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

      {props.error && (
        <DialogBox
          content={props.error.message}
          open={errorDialog}
          dismissLabel="OK"
          cancelled={onErrorConfirmHandler}
        />
      )}

      <FloatingActionButton
        clicked={onFabHandler}
        type="save"
        showProgress
        disabled={!validForm}
        progress={{
          loading: props.saving,
          success: !props.error && props.saved,
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    saving: state.dictionary.saveProgress === "saving" ? true : false,
    saved: state.dictionary.saveProgress === "saved" ? true : false,
    error: state.dictionary.error,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (dictionary, editing, key) =>
      dispatch(actionCreators.saveDictionary(dictionary, editing, key)),
    cleanup: () => dispatch(actionCreators.saveDictionaryCleanup()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordInput);
