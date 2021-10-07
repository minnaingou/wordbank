import React, { useState } from "react";
import Container from "@mui/material/Container";
import BarChartIcon from "@mui/icons-material/BarChart";
import InfoIcon from "@mui/icons-material/Info";

import BottomNavigator from "../UI/ButtomNavigator/BottomNavigator";
import BottomDrawer from "../UI/BottomDrawer/BottomDrawer";
import TopBar from "../UI/TopBar/TopBar";

const Layout = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const drawerItems = [
    {
      label: "Statistics",
      icon: <BarChartIcon />,
      clicked: () => {
        setShowDrawer(false);
        console.log("stats clicked");
      },
    },
    {
      label: "About",
      icon: <InfoIcon />,
      clicked: () => {
        setShowDrawer(false);
        console.log("about clicked");
      },
    },
  ];

  const onToggleHandler = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }} disableGutters>
      <TopBar />
      <main>{props.children}</main>
      <BottomNavigator clickedMore={onToggleHandler} />
      <BottomDrawer show={showDrawer} items={drawerItems} />
    </Container>
  );
};

export default Layout;
