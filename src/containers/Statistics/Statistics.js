import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import EnhancedTable from "../../components/UI/EnhancedTable/EnhancedTable";
import EmptyPage from "../../components/UI/EmptyPage/EmptyPage";

const Statistics = (props) => {
  useEffect(() => {
    props.fetchStatistics(props.userId, props.token);
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
      <EmptyPage sx={{ pt: 14 }} message="Your favourite list is empty." />
    );
  }

  return <div>{table}</div>;
};

const mapStateToProps = (state) => {
  return {
    stats: state.statistics.rawStats,
    loading: state.statistics.loading,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStatistics: (userId, token) =>
      dispatch(actionCreators.fetchStatistics(userId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
