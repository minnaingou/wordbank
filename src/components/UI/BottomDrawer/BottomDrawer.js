import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const BottomDrawer = (props) => {
  const list = () => (
    <Box sx={{ width: "auto", paddingBottom: 7 }} role="presentation">
      <List>
        {props.items.map((item, index) => (
          <ListItem key={index} button onClick={item.clicked}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="bottom" open={props.show}>
        {list()}
      </Drawer>
    </div>
  );
};

export default BottomDrawer;
