import React from "react";
import { SnowmanPart } from "../types";
import { indexes } from "../utils";
import SnowmanPartImage from "./SnowmanPartImage";
import _ from "lodash";

interface SnowmanPartOptionsProps {
  snowmanPart: SnowmanPart;
  handleGuess: (snowmanPart: SnowmanPart, guess: number) => void;
}

export default function SnowmanPartOptions(props: SnowmanPartOptionsProps) {
  const { snowmanPart, handleGuess } = props;
  const shuffledIndexes = _.shuffle(indexes);
  // Assumes we always have exactly 4 items
  const firstRow = shuffledIndexes.slice(0, 2);
  const secondRow = shuffledIndexes.slice(2);

  return (
    <div className="flex flex-col gap-2">
      <p className="flex justify-center">Which {snowmanPart} was it?</p>
      <div className="flex justify-center gap-2">
        {firstRow.map((index) => (
          <div
            key={index + snowmanPart}
            className="cursor-pointer"
            onClick={() => handleGuess(snowmanPart, index)}
          >
            <SnowmanPartImage index={index} snowmanPart={snowmanPart} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {secondRow.map((index) => (
          <div
            key={index + snowmanPart}
            className="cursor-pointer"
            onClick={() => handleGuess(snowmanPart, index)}
          >
            <SnowmanPartImage index={index} snowmanPart={snowmanPart} />
          </div>
        ))}
      </div>
    </div>
  );
}
