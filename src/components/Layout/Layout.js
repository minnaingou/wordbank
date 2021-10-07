import React, { useState } from "react";
import Container from "@mui/material/Container";

import BottomNavigator from "../UI/ButtomNavigator/BottomNavigator";
import BottomDrawer from "../UI/BottomDrawer/BottomDrawer";
import TopBar from "../UI/TopBar/TopBar";

const Layout = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const onToggleHandler = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }} disableGutters>
      <TopBar />
      <main>{props.children}</main>
      <BottomNavigator clickedMore={onToggleHandler} />
      <BottomDrawer show={showDrawer} />
    </Container>
  );
};

export default Layout;
