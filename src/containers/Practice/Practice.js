import React, { useState } from "react";
import FlipCard from "../../components/Practice/FlipCard/FlipCard";
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";
import RatingButtonGroup from "../../components/Practice/RatingButtonGroup/RatingButtonGroup";

const Practice = () => {
  const [isFlipped, setFlipped] = useState(false);

  const onFabHandler = () => {
    setFlipped(!isFlipped);
  };

  return (
    <>
      <FlipCard
        flip={isFlipped}
        front={{ question: "This is front of the card" }}
        back={{ answer: "This is back of the card" }}
      />
      <ProgressBar />
      <RatingButtonGroup clicked={onFabHandler} flipped={isFlipped} />
    </>
  );
};

export default Practice;
