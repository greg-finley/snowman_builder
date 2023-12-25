import React from "react";
import Image from "next/image";
import { toAssetFileName } from "../utils";
import { SnowmanPart } from "../types";

interface SnowmanPartImageProps {
  index: number;
  snowmanPart: SnowmanPart;
}

export default function SnowmanPartImage(props: SnowmanPartImageProps) {
  const { index, snowmanPart } = props;
  return (
    <Image
      key={index + snowmanPart}
      src={toAssetFileName(snowmanPart, index)}
      alt=""
      width={100}
      height={24}
      priority
    />
  );
}
