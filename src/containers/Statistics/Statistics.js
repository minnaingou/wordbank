import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell style={{ paddingRight: 0 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Word</TableCell>
                    <TableCell align="right">Correct Rate</TableCell>
                    <TableCell align="right">Answered</TableCell>
                    <TableCell align="right">Attempts</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.practiceList.map((practice, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {practice.word}
                      </TableCell>
                      <TableCell align="right">{"100%"}</TableCell>
                      <TableCell align="right">{practice.success}</TableCell>
                      <TableCell align="right">{practice.attempt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const rows = [
  {
    name: "Top [10] Correctly Answered",
    practiceList: [
      {
        word: "apple",
        attempt: 10,
        success: 5,
        failed: 3,
        skipped: 2,
      },
      {
        word: "mango",
        attempt: 20,
        success: 15,
        failed: 3,
        skipped: 2,
      },
    ],
  },
  {
    name: "Top [10] Incorrectly Answered",
    practiceList: [
      {
        word: "orange",
        attempt: 10,
        success: 5,
        failed: 3,
        skipped: 2,
      },
    ],
  },
];

const StatsTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;
