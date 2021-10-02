import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";

const SearchBar = (props) => {
  const [keyword, setKeyword] = useState("");

  const onChangeHandler = (event) => {
    setKeyword(event.target.value);
  };

  const onKeypressHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      props.searched(keyword);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ marginTop: 2, width: "100%" }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <TextField
          id="searchbox"
          type="search"
          label="Search here"
          variant="outlined"
          size="small"
          sx={{ width: "87%" }}
          onChange={onChangeHandler}
          value={keyword}
          onKeyPress={onKeypressHandler}
        />
        <IconButton
          aria-label="search"
          color="primary"
          size="large"
          sx={{ padding: 0 }}
          onClick={() => {
            props.searched(keyword);
          }}
        >
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default SearchBar;
