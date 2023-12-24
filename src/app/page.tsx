"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { randomAssetIndex, toAssetFileName } from "./utils";
import Button from "./components/Button";

interface CurrentState {
  hat: number;
  head: number;
  body: number;
}

export default function Home() {
  const [currentState, setCurrentState] = useState<CurrentState | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [rebuildMode, setRebuildMode] = useState(false);

  useEffect(() => {
    setCurrentState({
      hat: randomAssetIndex(),
      head: randomAssetIndex(),
      body: randomAssetIndex(),
    });
  }, [refreshIndex]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full flex-col items-center font-mono text-sm lg:flex">
        <p className="mb-2 fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          😱 Billy&apos;s snowman just melted!
          <br />
          He snapped a picture before it happened.
          <br />
          Take a gander and then help him rebuild it!
        </p>
        {currentState &&
          (rebuildMode ? (
            <p>Haha just kidding!</p>
          ) : (
            Object.entries(currentState).map((item, index) => (
              <Image
                key={index}
                src={toAssetFileName(item[0], item[1])}
                alt=""
                width={100}
                height={24}
                priority
              />
            ))
          ))}
        {!rebuildMode ? (
          <div className="flex gap-4">
            <Button
              onClick={() => setRebuildMode(!rebuildMode)}
              buttonText="Let's Rebuild!"
            />
            <Button
              onClick={() => setRefreshIndex(refreshIndex + 1)}
              buttonText="Refresh"
            />
          </div>
        ) : (
          <Button
            onClick={() => setRebuildMode(!rebuildMode)}
            buttonText="Just Kidding!"
          />
        )}
      </div>
    </main>
  );
}
