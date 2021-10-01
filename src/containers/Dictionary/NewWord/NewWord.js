import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";

const NewWord = (props) => {
  const def = props.location.state;
  return (
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
          value={def.word}
          sx={{ width: "70%" }}
        />
        <FormControl sx={{ width: "30%" }}>
          <InputLabel id="posl">Part of Speech</InputLabel>
          <Select
            //   variant="standard"
            labelId="posl"
            id="pos"
            value={def.partOfSpeech}
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
        maxRows={5}
        value={def.definition}
      />
      <TextField
        id="example"
        label="Example usage"
        multiline
        rows={2}
        maxRows={5}
      />
      <TextField
        id="note"
        label="Note"
        multiline
        rows={2}
        maxRows={5}
      />
    </Box>
  );
};

export default NewWord;
