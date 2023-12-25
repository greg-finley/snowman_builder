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

  return (
    <div>
      <p>Which {snowmanPart} was it?</p>
      <div className="flex flex-wrap gap-2">
        {_.shuffle(indexes).map((index) => (
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
