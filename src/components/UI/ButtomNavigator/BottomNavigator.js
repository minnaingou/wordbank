import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction, {
  bottomNavigationActionClasses,
} from "@mui/material/BottomNavigationAction";
import BookIcon from "@mui/icons-material/Book";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const MoreBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  [`&.${bottomNavigationActionClasses.selected}`]: {
    color: "gray",
  },
}));

const BottomNavigator = (props) => {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1300 }}
        elevation={10}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Dictionary"
            icon={<BookIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/saved"
            label="Favorites"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/practice"
            label="Practice"
            icon={<SportsEsportsIcon />}
          />
          <MoreBottomNavigationAction
            label="More"
            icon={<MoreHorizIcon />}
            onClick={props.clickedMore}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNavigator;
