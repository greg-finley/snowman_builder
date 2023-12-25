"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { indexes, randomAssetIndex, toAssetFileName } from "./utils";
import Button from "./components/Button";
import { snowmanParts, CurrentState, GuessState, SnowmanPart } from "./types";
import { set } from "lodash";

export default function Home() {
  const [refreshIndex, setRefreshIndex] = useState(0); // Just for the useEffect
  const [currentState, setCurrentState] = useState<CurrentState | null>(null);
  const [guessState, setGuessState] = useState<GuessState | null>(null);
  const [guessMode, setGuessMode] = useState<SnowmanPart | null | "done">(null);

  useEffect(() => {
    setCurrentState({
      hat: randomAssetIndex(),
      head: randomAssetIndex(),
      body: randomAssetIndex(),
    });
  }, [refreshIndex]);

  const handleBackToPhoto = () => {
    setGuessState(null);
    setGuessMode(null);
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
          (guessMode && guessMode !== "done" ? (
            <div>
              <p>Which {guessMode} was it?</p>
              {indexes.map((index) => (
                <Image
                  key={index + guessMode}
                  src={toAssetFileName(guessMode, index)}
                  alt=""
                  width={100}
                  height={24}
                  onClick={() => handleGuess(guessMode, index)}
                  priority
                />
              ))}
            </div>
          ) : (
            (Object.entries(currentState) as [[SnowmanPart, number]]).map(
              (item, index) => (
                <Image
                  key={index}
                  src={toAssetFileName(item[0], item[1])}
                  alt=""
                  width={100}
                  height={24}
                  priority
                />
              ),
            )
          ))}
        {!guessMode ? (
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
        ) : (
          <Button
            onClick={handleBackToPhoto}
            buttonText="Back to Photo"
            variant="dull"
          />
        )}
      </div>
    </main>
  );
}
