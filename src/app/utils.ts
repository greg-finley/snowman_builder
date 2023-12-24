import _ from "lodash";

export const randomAssetIndex = () => _.sample([0, 1, 2, 3]) as number;

export const toAssetFileName = (assetName: string, index: number) =>
  `/${assetName}${index}.png`;
