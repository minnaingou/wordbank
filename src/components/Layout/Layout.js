import Container from "@mui/material/Container";

import BottomNavigator from "../UI/ButtomNavigation/BottomNavigation"
import TopBar from "../UI/TopBar/TopBar"

const Layout = (props) => {
  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }} disableGutters>
      <TopBar />
      <main>{props.children}</main>
      <BottomNavigator />
    </Container>
  );
};

export default Layout;
