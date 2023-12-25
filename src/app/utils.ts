import _ from "lodash";

export type AssetType = "hat" | "head" | "body";

export const indexes = [0, 1, 2, 3];

export const randomAssetIndex = () => _.sample(indexes) as number;

export const toAssetFileName = (assetType: AssetType, index: number) =>
  `/${assetType}${index}.png`;
