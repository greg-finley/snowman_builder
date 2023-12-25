import React from "react";
import { GuessState, SnowmanPart } from "../types";
import SnowmanPartImage from "./SnowmanPartImage";

interface CompletedSnowmanProps {
  currentState: GuessState;
}

export default function CompletedSnowman(props: CompletedSnowmanProps) {
  const { currentState } = props;
  return (Object.entries(currentState) as [[SnowmanPart, number]]).map(
    (item, index) => (
      <SnowmanPartImage key={index} index={item[1]} snowmanPart={item[0]} />
    ),
  );
}
