export const snowmanParts = ["hat", "head", "body"] as const;
export type SnowmanPart = (typeof snowmanParts)[number];

export type CurrentState = {
  [key in SnowmanPart]: number;
};

export type GuessState = Partial<CurrentState>;
