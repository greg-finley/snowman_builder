import React from "react";
import { CurrentState, SnowmanPart } from "../types";
import SnowmanPartImage from "./SnowmanPartImage";

interface CompletedSnowmanProps {
  currentState: CurrentState;
}

export default function CompletedSnowman(props: CompletedSnowmanProps) {
  const { currentState } = props;
  return (Object.entries(currentState) as [[SnowmanPart, number]]).map(
    (item, index) => (
      <SnowmanPartImage key={index} index={item[1]} snowmanPart={item[0]} />
    ),
  );
}
