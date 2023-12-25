import _ from "lodash";
import { SnowmanPart } from "./types";

export const indexes = [0, 1, 2, 3];

export const randomAssetIndex = () => _.sample(indexes) as number;

export const toAssetFileName = (snowmanPart: SnowmanPart, index: number) =>
  `/${snowmanPart}${index}.png`;
