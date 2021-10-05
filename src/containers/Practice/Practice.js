import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import FlipCard from "../../components/Practice/FlipCard/FlipCard";
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";
import RatingButtonGroup from "../../components/Practice/RatingButtonGroup/RatingButtonGroup";
import * as actionCreators from "../../store/actions";

const Practice = (props) => {
  const [isFlipped, setFlipped] = useState(false);

  useEffect(() => {
    props.fetchPracticeList();
    // eslint-disable-next-line
  }, []);

  const onRatingHandler = (type) => {
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
        console.error("Unknown rating handler");
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
          back={{ answer: "This is back of the card" }}
        />
        <ProgressBar />
        <RatingButtonGroup flipped={isFlipped} clicked={onRatingHandler} />
      </>
    );
  } else {
    flipCard = <span>Loading...</span>;
  }

  return <>{flipCard}</>;
};

const mapStateToProps = (state) => {
  return {
    practiceList: state.practice.practiceList,
    practiceItem: state.practice.practiceItem,
    loading: state.practice.loading,
    error: state.practice.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPracticeList: () => dispatch(actionCreators.fetchPracticeList()),
    getNextQuestion: () => dispatch(actionCreators.getNextQuestion()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Practice);
