import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import EmptyPage from "../../components/UI/EmptyPage/EmptyPage";
import FlipCard from "../../components/Practice/FlipCard/FlipCard";
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";
import VotingButtonGroup from "../../components/Practice/VotingButtonGroup/VotingButtonGroup";
import * as actionCreators from "../../store/actions";
import DialogBox from "../../components/UI/DialogBox/DialogBox";

const Practice = (props) => {
  const [isFlipped, setFlipped] = useState(false);

  useEffect(() => {
    props.fetchPracticeList(props.userId, props.token);
    // eslint-disable-next-line
  }, []);

  const onVotingHandler = (type) => {
    setFlipped(!isFlipped);
    switch (type) {
      case "reveal": {
        setFlipped(!isFlipped);
        break;
      }
      case "positive": {
        setFlipped(!isFlipped);
        props.votePractice(props.practiceItem, "positive", props.token);
        break;
      }
      case "negative": {
        setFlipped(!isFlipped);
        props.votePractice(props.practiceItem, "negative", props.token);
        break;
      }
      case "skip": {
        setFlipped(!isFlipped);
        props.votePractice(props.practiceItem, "skip", props.token);
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
  } else if (props.loading) {
    flipCard = (
      <Stack sx={{ margin: 3 }} direction="column">
        <Skeleton sx={{ height: "46vh" }} variant="rectangular" />
        <div style={{ marginTop: 40 }}>
          <Skeleton sx={{ height: 20 }} variant="text" />
        </div>
      </Stack>
    );
  } else {
    flipCard = (
      <EmptyPage
        sx={{ pt: 14 }}
        message="Add a few words to start practicing"
      />
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
          props.fetchPracticeList(props.userId, props.token);
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
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPracticeList: (userId, token) =>
      dispatch(actionCreators.fetchPracticeList(userId, token)),
    votePractice: (practiceItem, voted, token) =>
      dispatch(actionCreators.votePractice(practiceItem, voted, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Practice);
