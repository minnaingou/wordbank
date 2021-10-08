import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import Stack from "@mui/material/Stack";

import * as actionCreators from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import EnhancedTable from "../../components/UI/EnhancedTable/EnhancedTable";

const Statistics = (props) => {
  useEffect(() => {
    props.fetchStatistics(props.userId);
    // eslint-disable-next-line
  }, []);

  const headers = [
    {
      id: "word",
      numeric: false,
      disablePadding: false,
      label: "Word",
    },
    {
      id: "attempt",
      numeric: true,
      disablePadding: true,
      label: "Attempts",
    },
    {
      id: "correct",
      numeric: true,
      disablePadding: true,
      label: "Correct",
    },
    {
      id: "correctRate",
      numeric: true,
      disablePadding: true,
      label: "✓Rate",
    },
    {
      id: "incorrect",
      numeric: true,
      disablePadding: true,
      label: "Incorrect",
    },
    {
      id: "skipped",
      numeric: true,
      disablePadding: true,
      label: "Skipped",
    },
  ];

  let rows = [];
  if (!props.loading) {
    rows = props.stats.map((stat) => {
      const practiceData = stat.practice;
      return [
        stat.word,
        practiceData ? practiceData.attempt : 0,
        practiceData ? practiceData.positive : 0,
        practiceData
          ? Math.round((practiceData.positive * 100) / practiceData.attempt) +
            "%"
          : "0%",
        practiceData ? practiceData.negative : 0,
        practiceData ? practiceData.skip : 0,
      ];
    });
  }

  let table = null;
  if (!props.loading && rows.length > 0) {
    table = <EnhancedTable headers={headers} data={rows} />;
  } else if (props.loading) {
    table = <Spinner />;
  } else {
    table = (
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ height: "70vh" }}
      >
        <PetsIcon fontSize="large" />
        <span>Add few words to the list to view statistics</span>
      </Stack>
    );
  }

  return (
    <div>
      {!props.isAuthenticated && <Redirect to="/auth/login" />}
      {table}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    stats: state.statistics.rawStats,
    loading: state.statistics.loading,
    userId: state.auth.userId,
    isAuthenticated: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStatistics: (userId) =>
      dispatch(actionCreators.fetchStatistics(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
