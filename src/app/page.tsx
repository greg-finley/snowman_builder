"use client";

import React, { useEffect, useState } from "react";

import { randomAssetIndex } from "./utils";
import Button from "./components/Button";
import { snowmanParts, CurrentState, GuessState, SnowmanPart } from "./types";
import CompletedSnowman from "./components/CompletedSnowman";
import SnowmanPartOptions from "./components/SnowmanPartOptions";
import _ from "lodash";

export default function Home() {
  const [refreshIndex, setRefreshIndex] = useState(0); // Just for the useEffect
  const [currentState, setCurrentState] = useState<CurrentState | null>(null);
  const [guessState, setGuessState] = useState<GuessState>({});
  const [guessMode, setGuessMode] = useState<SnowmanPart | "start" | "done">(
    "start",
  );
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [doneMessage, setDoneMessage] = useState("");

  useEffect(() => {
    setCurrentState({
      hat: randomAssetIndex(),
      head: randomAssetIndex(),
      body: randomAssetIndex(),
    });
  }, [refreshIndex]);

  useEffect(() => {
    if (guessMode === "done") {
      if (_.isEqual(currentState, guessState)) {
        setWins(wins + 1);
        setDoneMessage("Correct!");
      } else {
        setLosses(losses + 1);
        setDoneMessage("Wrong!");
      }
    }
  }, [guessMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBackToPhoto = () => {
    setGuessState({});
    setGuessMode("start");
  };

  const handleGuess = (guessMode: SnowmanPart, guess: number) => {
    setGuessState((prevState) => {
      if (prevState) {
        return { ...prevState, [guessMode]: guess };
      } else {
        return { [guessMode]: guess };
      }
    });
    const nextPart =
      snowmanParts[snowmanParts.indexOf(guessMode) + 1] ?? "done";
    setGuessMode(nextPart);
  };

  const handleStartOver = () => {
    setRefreshIndex(refreshIndex + 1);
    setGuessState({});
    setGuessMode("start");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full flex-col items-center font-mono text-sm lg:flex">
        <p className="mb-2 fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          😱 Billy&apos;s snowman just melted!
          <br />
          He snapped a picture before it happened.
          <br />
          Take a look and then help him rebuild it!
        </p>
        {currentState &&
          (guessMode === "start" ? (
            // Player is at the initial app screen
            <div>
              <CompletedSnowman
                currentState={currentState}
                label="Billy's snowman, before it melted"
              />
              <div className="flex gap-4">
                <Button
                  onClick={() => setGuessMode(snowmanParts[0])}
                  buttonText="Let's Rebuild!"
                />
                <Button
                  onClick={() => setRefreshIndex(refreshIndex + 1)}
                  buttonText="Change Snowman"
                  variant="dull"
                />
              </div>
            </div>
          ) : guessMode !== "done" ? (
            // Player is guessing the various parts of the snowman
            <div>
              <SnowmanPartOptions
                handleGuess={handleGuess}
                snowmanPart={guessMode}
              />
              <Button
                onClick={handleBackToPhoto}
                buttonText="Back to Photo"
                variant="dull"
              />
            </div>
          ) : (
            // Player is done guessing
            <div className="flex flex-col items-center space-y-4">
              <div className="flex space-x-6">
                <CompletedSnowman
                  currentState={currentState}
                  label="Billy's snowman"
                />
                <CompletedSnowman
                  currentState={guessState}
                  label="Your guess"
                />
              </div>
              <p>{doneMessage}</p>
              <Button onClick={handleStartOver} buttonText="New Snowman" />
            </div>
          ))}
        {(!!wins || !!losses) && (
          <div className="mt-4 flex flex-col items-center space-y-4">
            {wins} Win{wins !== 1 && "s"}
            <br />
            {losses} Loss{losses !== 1 && "es"}
          </div>
        )}
      </div>
    </main>
  );
}
