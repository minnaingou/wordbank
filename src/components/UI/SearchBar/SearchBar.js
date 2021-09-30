import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";

const SearchBar = (props) => {

  const [keyword, setKeyword] = useState('');
  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <FormControl sx={{ margin: 2 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            id="searchbox"
            type="search"
            label="Search here"
            variant="outlined"
            size="small"
            sx={{ width: 300 }}
            onChange={handleChange}
            value={keyword}
          />
          <IconButton
            aria-label="search"
            color="primary"
            size="large"
            onClick={() => {props.searched(keyword)}}
          >
            <SearchIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </FormControl>
    </Box>
  );
};

export default SearchBar;
