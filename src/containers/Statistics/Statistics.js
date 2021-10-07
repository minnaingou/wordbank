import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import EnhancedTable from "../../components/UI/EnhancedTable/EnhancedTable";

const Statistics = (props) => {
  useEffect(() => {
    props.fetchStatistics();
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

  return (
    <div>
      {!props.loading ? (
        <EnhancedTable headers={headers} data={rows} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    stats: state.statistics.rawStats,
    loading: state.statistics.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStatistics: () => dispatch(actionCreators.fetchStatistics()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
