import React from "react";
import { GuessState, SnowmanPart } from "../types";
import SnowmanPartImage from "./SnowmanPartImage";

interface CompletedSnowmanProps {
  currentState: GuessState;
  label?: string;
}

export default function CompletedSnowman(props: CompletedSnowmanProps) {
  const { currentState, label } = props;
  return (
    <div className="flex flex-col items-center space-y-0">
      {label && <p className="text-center mb-2">{label}</p>}
      {(Object.entries(currentState) as [[SnowmanPart, number]]).map(
        (item, index) => (
          <SnowmanPartImage key={index} index={item[1]} snowmanPart={item[0]} />
        ),
      )}
    </div>
  );
}
