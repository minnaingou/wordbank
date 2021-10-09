import React, { useState, useEffect, useMemo } from "react";
import { Link, withRouter } from "react-router-dom";
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

const MoreBottomNavigationAction = styled(BottomNavigationAction)(
  ({ theme }) => ({
    [`&.${bottomNavigationActionClasses.selected}`]: {
      color: "gray",
    },
  })
);

const BottomNavigator = (props) => {
  const [value, setValue] = useState(0);

  const pathMap = useMemo(() => {
    return ["/", "/favourites", "/practice"];
  }, []);

  const { pathname } = props.location;
  useEffect(() => {
    let path = pathname;
    const parentPath = pathname.substring(0, pathname.lastIndexOf("/"));
    console.log(parentPath.length);
    if (parentPath.length) {
      path = parentPath;
    }
    const index = pathMap.indexOf(path);
    setValue(index >= 0 ? index : 0);
  }, [pathname, pathMap]);

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
            onClick={() => props.clicked("/")}
          />
          <BottomNavigationAction
            component={Link}
            to="/favourites"
            label="Favorites"
            icon={<FavoriteIcon />}
            onClick={() => props.clicked("/favourites")}
          />
          <BottomNavigationAction
            component={Link}
            to="/practice"
            label="Practice"
            icon={<SportsEsportsIcon />}
            onClick={() => props.clicked("/practice")}
          />
          <MoreBottomNavigationAction
            label="More"
            icon={<MoreHorizIcon />}
            onClick={() =>
              props.clicked("more", (path) => {
                setValue(pathMap.indexOf(path));
              })
            }
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default withRouter(BottomNavigator);
