import _ from "lodash";

const baseRandom = (assetName: string) =>
  _.sample([0, 1, 2, 3].map((i) => `/${assetName}${i}.png`)) as string;

export const randomHead = () => baseRandom("head");
export const randomBody = () => baseRandom("body");
export const randomHat = () => baseRandom("hat");
