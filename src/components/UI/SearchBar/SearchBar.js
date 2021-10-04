import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const SearchBar = (props) => {
  const [keyword, setKeyword] = useState("");
  const { changed } = props;

  const onChangeHandler = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    changed && changed(keyword);
  }, [changed, keyword]);

  const onKeypressHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      props.searched && props.searched(keyword);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ marginTop: 2, width: "100%", marginBottom: 2 }}
    >
      <TextField
        id="searchbox"
        autoFocus={props.focus}
        type="search"
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          width: "95%",
          "& .MuiOutlinedInput-notchedOutline": { borderRadius: "50px" },
        }}
        onChange={onChangeHandler}
        value={keyword}
        onKeyPress={onKeypressHandler}
      />
    </Box>
  );
};

export default SearchBar;
