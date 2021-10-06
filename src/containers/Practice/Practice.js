import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import FlipCard from "../../components/Practice/FlipCard/FlipCard";
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";
import VotingButtonGroup from "../../components/Practice/VotingButtonGroup/VotingButtonGroup";
import * as actionCreators from "../../store/actions";
import DialogBox from "../../components/UI/DialogBox/DialogBox";

const Practice = (props) => {
  const [isFlipped, setFlipped] = useState(false);

  useEffect(() => {
    props.fetchPracticeList();
    // eslint-disable-next-line
  }, []);

  const onVotingHandler = (type) => {
    setFlipped(!isFlipped);
    switch (type) {
      case "reveal": {
        console.log("handle reveal");
        break;
      }
      case "positive": {
        console.log("handle positive");
        props.getNextQuestion();
        break;
      }
      case "negative": {
        console.log("handle negative");
        props.getNextQuestion();
        break;
      }
      case "skip": {
        console.log("handle skip");
        props.getNextQuestion();
        break;
      }
      default:
        console.error("Unknown voting handler");
    }
  };

  let flipCard = null;
  if (!props.loading && props.practiceItem) {
    flipCard = (
      <>
        <FlipCard
          flip={isFlipped}
          front={{
            question: props.practiceItem.word,
          }}
          back={{
            word: props.practiceItem.word,
            partOfSpeech: props.practiceItem.meaning.pos,
            definition: props.practiceItem.meaning.definition,
            example: props.practiceItem.meaning.example,
            note: props.practiceItem.meaning.note,
          }}
        />
        <ProgressBar current={props.index} total={props.totalQuestions} />
        <VotingButtonGroup flipped={isFlipped} clicked={onVotingHandler} />
      </>
    );
  } else {
    flipCard = (
      <Stack sx={{ margin: 3 }} direction="column">
        <Skeleton sx={{ height: "46vh" }} variant="rectangular" />
        <div style={{ marginTop: 40 }}>
          <Skeleton sx={{ height: 20 }} variant="text" />
        </div>
      </Stack>
    );
  }

  return (
    <>
      {flipCard}
      <DialogBox
        content="Congratulations! Do you want to start over?"
        open={props.showComplete}
        dismissLabel="Yes"
        cancelled={() => {
          props.fetchPracticeList();
        }}
        confirmLabel="Show Statistics"
        confirmed={() => {
          props.history.push("/statistics");
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    practiceItem: state.practice.practiceItem,
    loading: state.practice.loading,
    error: state.practice.error,
    index: state.practice.currentIndex + 1,
    totalQuestions: state.practice.practiceList.length,
    showComplete: state.practice.showComplete,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPracticeList: () => dispatch(actionCreators.fetchPracticeList()),
    getNextQuestion: () => dispatch(actionCreators.getNextQuestion()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Practice);
