import React, { useState } from "react";
import { withRouter } from "react-router-dom";
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
        props.history.push("/statistics");
        setShowDrawer(false);
      },
    },
    {
      label: "About",
      icon: <InfoIcon />,
      clicked: () => {
        props.history.push("/about");
        setShowDrawer(false);
      },
    },
  ];

  const onToggleHandler = (to) => {
    if (to === "more") setShowDrawer(!showDrawer);
    else {
      localStorage.setItem("lastUrl", to);
      setShowDrawer(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }} disableGutters>
      <TopBar loggedIn={props.authenticated} />
      <main style={{ paddingTop: 60 }}>{props.children}</main>
      <BottomNavigator clicked={(to) => onToggleHandler(to)} />
      <BottomDrawer
        show={showDrawer}
        items={drawerItems}
        closed={onToggleHandler}
      />
    </Container>
  );
};

export default withRouter(Layout);
